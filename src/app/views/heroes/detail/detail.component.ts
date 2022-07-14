import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../model/heroes.model';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public loading: boolean = false;
  public hero: Hero;
  private result: boolean;

  constructor(private _heroesService: HeroesService,
    private route: ActivatedRoute) { }

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

  isFavorite() {
    if (this.result) {
      return 'Remover dos favoritos'
    } return 'Adicionar aos favoritos'
  }

  addOrRemoveFavoriteHero(hero: Hero) {
    if (this.result) {
      this._heroesService.removeToFavorite(hero);
    } this._heroesService.addToFavorite(hero);
  }
}
