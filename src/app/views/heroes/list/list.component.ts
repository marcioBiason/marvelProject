import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Hero } from '../model/heroes.model';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public favoriteHeroes;
  public deletedHeroes;
  public heroes: Hero[] = [];
  public offset: number = 0;
  public total: number = 0;
  public loading = false;
  public search: string = '';
  public searchSubject = new Subject<string>();

  constructor(private _heroesService: HeroesService,
    private router: Router) { }

  ngOnInit() {
    this.searchSubject
      .pipe(
        map(value => value.trim()),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => this.getHeroesSearch(value)),
      ).subscribe();

    this.favoriteHeroes = JSON.parse(localStorage.getItem('favorites'));
    this.deletedHeroes = JSON.parse(localStorage.getItem('deleted'));

    this.getListHeroes(this.offset)
  }

  getListHeroes(offset: number) {
    this.loading = true;
    this._heroesService.getHeroes({ offset: this.offset }).subscribe({
      next: hero => {
        this.heroes.push(...hero.data['results']);
        this.total = hero.data['total'];
        this.loading = false;
        this.heroes = this._heroesService.compareDiff(this.favoriteHeroes, this.heroes);
        this.heroes = this._heroesService.compareDiff(this.deletedHeroes, this.heroes);
      },
      error: () => {
        this.loading = false;
      }
    });
    this.offset = this.offset + 20;
  }

  async getHeroesSearch(heroeName: string) {
    this.loading = true;
    if (heroeName === "perguntas") {
      this.router.navigateByUrl('/questions');
    } else if (heroeName != '') {
      this._heroesService.getHeroeByName(heroeName).subscribe({
        next: hero => {
          this.heroes = hero.data['results'];
          this.total = hero.data['total'];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.heroes = [];
      this.offset = 0;
      this.getListHeroes(this.offset);
    }
  }

  public deleteHero(hero: Hero) {
    this.heroes = this._heroesService.deleteHeroGrid(hero, this.heroes);
    this._heroesService.deleteHeroStore(hero);
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}
