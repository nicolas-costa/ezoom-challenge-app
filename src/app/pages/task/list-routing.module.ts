import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { ShowPage } from "./show/show.page";
import { CreatePage } from "./create/create.page";
import { EditPage } from "./edit/edit.page";

const routes: Routes = [
  {
    path: '',
    component: ListPage
  },
  {
    path: 'show/:id',
    component: ShowPage
  },
  {
    path: 'create',
    component: CreatePage
  },
  {
    path: 'edit/:id',
    component: EditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
