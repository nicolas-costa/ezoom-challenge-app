import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ListPage } from './list.page';
import { ListPageRoutingModule } from './list-routing.module';
import { CreatePage } from "./create/create.page";
import { EditPage } from "./edit/edit.page";
import { ShowPage } from "./show/show.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule
  ],
  declarations: [ListPage, CreatePage, EditPage, ShowPage]
})
export class ListPageModule {}
