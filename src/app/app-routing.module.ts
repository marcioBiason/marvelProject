import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/views/heroes/heroes.module').then(m => m.HeroesModule)
  },
  {
    path: 'questions',
    loadChildren: () => import('../app/views/questions/questions.module').then(m => m.QuestionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
