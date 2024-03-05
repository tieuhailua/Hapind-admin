import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericNameTableCreateUpdateComponent } from './generic-name-table-create-update.component';

const routes: Routes = [
  {
  path: '',
  component: GenericNameTableCreateUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericNameTableCreateUpdateRoutingModule { }
