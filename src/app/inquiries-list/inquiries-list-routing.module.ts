import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquiriesListPage } from './inquiries-list.page';

const routes: Routes = [
  {
    path: '',
    component: InquiriesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiriesListPageRoutingModule {}
