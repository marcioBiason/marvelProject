import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from 'src/environments/environment';
import { DataHero, Hero, ParamsHero } from '../model/heroes.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  private readonly MARVELAPI = environment.marvelApi;
  private readonly MARVELPUBLICKEY = environment.marvelPublicKey;
  private readonly MARVELPRIVATEKEY = environment.marvelPrivateKey;
  private ts = new Date().getTime();
  private hash = Md5.hashStr(this.ts + this.MARVELPRIVATEKEY + this.MARVELPUBLICKEY);

  public getHeroes(params?: ParamsHero): Observable<DataHero> {
    return this.http.get<DataHero>(`${this.MARVELAPI}/characters?offset=${params.offset}&apikey=${this.MARVELPUBLICKEY}&ts=${this.ts}&hash=${this.hash}`).pipe(take(1));
  }

  public getHeroeById(heroId: number): Observable<DataHero> {
    return this.http.get<DataHero>(`${this.MARVELAPI}/characters/${heroId}?apikey=${this.MARVELPUBLICKEY}&ts=${this.ts}&hash=${this.hash}`).pipe(take(1));
  }

  public getHeroeByName(params?: ParamsHero): Observable<DataHero> {
    return this.http.get<DataHero>(`${this.MARVELAPI}/characters?nameStartsWith=${params.name}&offset=${params.offset}&apikey=${this.MARVELPUBLICKEY}&ts=${this.ts}&hash=${this.hash}`).pipe(take(1));
  }

  public addToFavorite(hero: Hero): string {
    let store = [];
    if (!localStorage['favorites']) store = [];
    else store = JSON.parse(localStorage.getItem('favorites'));
    if (this.verifyQuantityOfFavoriteHeroes(store.length)) {
      store.push(hero);
      localStorage.setItem('favorites', JSON.stringify(store));
      return 'sucess';
    } else return 'failed';
  }

  public verifyQuantityOfFavoriteHeroes(quantityOfFavoriteHeroes: number): boolean {
    if (quantityOfFavoriteHeroes < 5) return true
    return false
  }

  public isFavorite(hero: Hero): boolean {
    if (localStorage.getItem('favorites')) {
      let store = [];
      store = JSON.parse(localStorage.getItem('favorites'));
      if (store.find(item => item.id === hero.id)) {
        return true
      } return false
    } return false
  }

  public removeToFavorite(hero: Hero) {
    let store = [];
    store = JSON.parse(localStorage.getItem('favorites'));
    store = store.filter(item => item.id !== hero.id);
    localStorage.removeItem('favorites');
    localStorage.setItem('favorites', JSON.stringify(store));
  }

  public deleteHeroStore(hero: Hero) {
    let store = [];
    if (!localStorage['deleted']) store = [];
    else store = JSON.parse(localStorage.getItem('deleted'));
    store.push(hero);
    localStorage.setItem('deleted', JSON.stringify(store));
  }

  public deleteHeroGrid(hero: Hero, heroes: Hero[]): Hero[] {
    return heroes.filter(item => item.id !== hero.id);
  }

  public compareDiff(heroes1: Hero[], heroes2: Hero[]): Hero[] {
    if (heroes1) {
      let favOrDelArray = new Set(heroes1.map((el) => el.id));
      let originalArray = heroes2.filter((el) => !favOrDelArray.has(el.id));
      return originalArray;
    } return heroes2;
  }
}
