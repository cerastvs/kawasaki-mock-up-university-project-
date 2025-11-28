import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.page.html',
  styleUrls: ['./inquiries-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class InquiriesListPage implements OnInit {

  inquiries: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadInquiries();
  }

  loadInquiries() {
    try {
      this.inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      console.log('Loaded inquiries from localStorage:', this.inquiries);
    } catch (error) {
      console.error('Error loading inquiries from localStorage:', error);
    }
  }

  // Optional: Add a method to clear all inquiries
  clearInquiries() {
    if (confirm('Are you sure you want to clear all inquiries? This action cannot be undone.')) {
      localStorage.removeItem('inquiries');
      this.inquiries = [];
      console.log('All inquiries cleared from localStorage.');
    }
  }

}
