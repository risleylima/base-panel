import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NbContextMenuModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbUserModule,
    NbMenuModule,
    NbContextMenuModule
  ]
})
export class LayoutModule { }
