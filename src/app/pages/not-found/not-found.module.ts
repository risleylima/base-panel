import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbButtonModule } from '@nebular/theme';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    FontAwesomeModule,
    NbButtonModule
  ]
})
export class NotFoundModule { }
