import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminPage implements OnInit {

  totalInquiries: number = 0;
  pendingInquiries: number = 0;
  completedInquiries: number = 0;

  constructor() { }

  ngOnInit() {
    this.loadInquiryStats();
  }

  loadInquiryStats() {
    try {
      const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      this.totalInquiries = inquiries.length;
      this.pendingInquiries = inquiries.filter((inq: any) => inq.status === 'pending').length;
      this.completedInquiries = inquiries.filter((inq: any) => inq.status === 'completed').length;
    } catch (error) {
      console.error('Error loading inquiry stats from localStorage:', error);
    }
  }

}
