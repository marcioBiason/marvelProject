import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../model/heroes.model';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public loading: boolean = false;
  public failed: boolean = false;
  public hero: Hero;
  private result: boolean;

  constructor(private _heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        this._heroesService.getHeroeById(params.id.trim()).subscribe({
          next: hero => {
            this.hero = hero?.data['results'][0];
            this.loading = false;
            this.result = this._heroesService.isFavorite(this.hero);
          },
          error: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  public isFavorite() {
    if (this.result) {
      return 'Remover dos favoritos'
    } return 'Adicionar aos favoritos'
  }

  public addOrRemoveFavoriteHero(hero: Hero) {
    if (this.result) {
      this._heroesService.removeToFavorite(hero);
      this.backTogallery();
    } else {
      if (this._heroesService.addToFavorite(hero) === 'sucess') {
        this.backTogallery();
      } this.failed = true
    }
  }

  public backTogallery() {
    this.router.navigateByUrl('');
  }
}
