import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderModule } from './shared/components/header/header.module';
import { LoadingModule } from './shared/components/loading/loading.module';
import { HeroesModule } from './views/heroes/heroes.module';
import { QuestionsModule } from './views/questions/questions.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    LoadingModule,
    HeroesModule,
    QuestionsModule
  ],
  exports: [
    LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
