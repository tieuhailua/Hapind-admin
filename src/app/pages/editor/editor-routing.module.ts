import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor.component';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    data: {
      scrollDisabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {
}
