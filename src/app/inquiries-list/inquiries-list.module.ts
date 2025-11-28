import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquiriesListPageRoutingModule } from './inquiries-list-routing.module';

import { InquiriesListPage } from './inquiries-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquiriesListPageRoutingModule,
    InquiriesListPage // Import the standalone component
  ],
  declarations: [] // Remove from declarations
})
export class InquiriesListPageModule {}
