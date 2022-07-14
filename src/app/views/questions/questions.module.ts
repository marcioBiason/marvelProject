import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ],
  exports: [
    QuestionsComponent
  ]
})
export class QuestionsModule { }
