import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.page.html',
  styleUrls: ['./inquiries-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // Add FormsModule
})
export class InquiriesListPage implements OnInit {

  inquiries: any[] = [];
  statusOptions: string[] = ['pending', 'in progress', 'completed']; // Add status options

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

  updateInquiryStatus(inquiry: any, newStatus: string) {
    const inquiryIndex = this.inquiries.findIndex(inq => inq === inquiry); // Find by reference
    if (inquiryIndex > -1) {
      this.inquiries[inquiryIndex].status = newStatus;
      localStorage.setItem('inquiries', JSON.stringify(this.inquiries));
      console.log('Inquiry status updated:', inquiry);
    }
  }

  deleteInquiry(inquiry: any) {
    if (confirm(`Are you sure you want to delete the inquiry for ${inquiry.motorcycle}?`)) {
      this.inquiries = this.inquiries.filter(inq => inq !== inquiry); // Filter by reference
      localStorage.setItem('inquiries', JSON.stringify(this.inquiries));
      console.log('Inquiry deleted:', inquiry);
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
