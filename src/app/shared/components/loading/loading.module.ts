import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class LoadingModule {}
