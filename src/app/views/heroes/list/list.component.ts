import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Subject, switchMap } from 'rxjs';
import { Hero } from '../model/heroes.model';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private offset: number = 0;
  private deletedHeroes: Hero[] = [];
  public favoriteHeroes: Hero[] = [];
  public heroes: Hero[] = [];
  public total: number = 0;
  public loading: boolean = false;
  public showFavorites: boolean = false;
  public search: string = '';
  public searchSubject = new Subject<string>();

  constructor(private _heroesService: HeroesService,
    private router: Router) { }

  ngOnInit() {
    this.searchSubject
      .pipe(
        map(value => value.trim()),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => this.getHeroesSearch(value)),
      ).subscribe();

    this.verifyFavorites();
    this.verifyDeleted();
    this.getListHeroes()
  }

  public getListHeroes() {
    this.loading = true;
    this._heroesService.getHeroes({ offset: this.offset }).subscribe({
      next: hero => {
        this.heroes.push(...hero.data['results']);
        this.total = hero.data['total'];
        this.verifyFavorites();
        this.verifyDeleted();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    this.offset = this.offset + 20;
  }

  private searchHeroes(heroeName: string) {
    this.loading = true;
    this._heroesService.getHeroeByName({ name: heroeName, offset: this.offset }).subscribe({
      next: async hero => {
        this.heroes.push(...hero.data['results']);
        this.total = hero.data['total'];
        this.verifyFavorites();
        this.verifyDeleted();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    this.offset = this.offset + 20;
  }

  private async getHeroesSearch(heroeName: string) {
    this.resetHeroes();
    if (heroeName === "perguntas") {
      this.router.navigateByUrl('/questions');
    } else if (heroeName != '') {
      this.searchHeroes(heroeName);
    } else {
      this.getListHeroes();
    }
  }

  public getMoreHeroes() {
    if (this.search) {
      this.searchHeroes(this.search);
    } else {
      this.getListHeroes();
    }
  }

  private verifyFavorites() {
    this.favoriteHeroes = JSON.parse(localStorage.getItem('favorites'));
    if (this.favoriteHeroes) {
      if (this.favoriteHeroes.length > 0) { this.showFavorites = true }
      this.heroes = this._heroesService.compareDiff(this.favoriteHeroes, this.heroes);
    }
  }

  private verifyDeleted() {
    this.deletedHeroes = JSON.parse(localStorage.getItem('deleted'));
    this.heroes = this._heroesService.compareDiff(this.deletedHeroes, this.heroes);
  }

  private resetHeroes() {
    this.heroes = [];
    this.offset = 0;
  }

  public deleteHero(hero: Hero) {
    this.heroes = this._heroesService.deleteHeroGrid(hero, this.heroes);
    this._heroesService.deleteHeroStore(hero);
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}
