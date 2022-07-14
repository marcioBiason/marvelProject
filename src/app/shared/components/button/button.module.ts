import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ButtonModule {}
