import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { HeroesService } from './services/heroes.service';
import { HeroesRoutingModule } from './heroes-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HeroesRoutingModule,
    LoadingModule
  ],
  exports: [
    ListComponent,
    DetailComponent
  ],
  providers: [
    HeroesService
  ]
})
export class HeroesModule { }
