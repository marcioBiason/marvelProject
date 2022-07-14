/**
* @author Marc
* @since 2022
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataHero, Hero, ParamsHero } from '../model/heroes.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  private readonly marvelApi = environment.marvelApi;
  private readonly marvelPublicKey = environment.marvelPublicKey;
  private readonly marvelPrivateKey = environment.marvelPrivateKey;
  private ts = new Date().getTime();
  private hash = Md5.hashStr(this.ts + this.marvelPrivateKey + this.marvelPublicKey);

  public getHeroes(params?: ParamsHero): Observable<DataHero> {
    console.log(params.offset)
    return this.http.get<DataHero>(`${this.marvelApi}/characters?offset=${params.offset}&apikey=${this.marvelPublicKey}&ts=${this.ts}&hash=${this.hash}`).pipe(take(1));
  }

  public getHeroeById(heroId: number): Observable<DataHero> {
    return this.http.get<DataHero>(`${this.marvelApi}/characters/${heroId}?apikey=${this.marvelPublicKey}&ts=${this.ts}&hash=${this.hash}`).pipe(take(1));
  }

  public getHeroeByName(heroName: string): Observable<DataHero> {
    return this.http.get<DataHero>(`${this.marvelApi}/characters?nameStartsWith=${heroName}&offset=0&apikey=${this.marvelPublicKey}&ts=${this.ts}&hash=${this.hash}`).pipe(take(1));
  }

  //public addToFavorite(hero: Hero) {
  //let heroArr = JSON.parse(localStorage.getItem('favorites')) || [];
  //heroArr.push(hero);
  //localStorage.setItem('favorites', JSON.stringify(heroArr));
  //localStorage.setItem('favorites', JSON.stringify(hero));
  //}

  public addToFavorite(hero: Hero) {
    let store = [];
    if (!localStorage['favorites']) store = [];
    else store = JSON.parse(localStorage.getItem('favorites'));
    if (this.verifyQuantityOfFavoriteHeroes(store.length)) {
      store.push(hero);
      localStorage.setItem('favorites', JSON.stringify(store));
    } else console.log('false')
  }

  private verifyQuantityOfFavoriteHeroes(quantityOfFavoriteHeroes: number) {
    if (quantityOfFavoriteHeroes < 5) return true
    return false
  }

  public isFavorite(hero: Hero) {
    if (localStorage.getItem('favorites')) {
      let store = [];
      store = JSON.parse(localStorage.getItem('favorites'));
      console.log(hero);
      console.log(store);
      if (store.find(item => item.id === hero.id)) {
        return true
      } return false
    } return false
  }

  public removeToFavorite(hero: Hero) {
    let store = [];
    store = JSON.parse(localStorage.getItem('favorites'));
    //let heroIndex = store.findIndex(item => item.id === hero.id);
    store = store.filter(item => item.id !== hero.id);
    //store = store.splice(heroIndex, 1);
    localStorage.setItem('favorites', JSON.stringify(store));
  }

  public deleteHeroStore(hero: Hero) {
    let store = [];
    if (!localStorage['deleted']) store = [];
    else store = JSON.parse(localStorage.getItem('deleted'));
    store.push(hero);
    localStorage.setItem('deleted', JSON.stringify(store));
  }

  public deleteHeroGrid(hero: Hero, heroes: Hero[]) {
    return heroes.filter(item => item.id !== hero.id);
  }

  public compareDiff(heroes1: Hero[], heroes2: Hero[]) {
    if (heroes1) {
      let favOrDelArray = new Set(heroes1.map((el) => el.id));
      let originalArray = heroes2.filter((el) => !favOrDelArray.has(el.id));
      return originalArray;
    } return heroes2;
  }
}
