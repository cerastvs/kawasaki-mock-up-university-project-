import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AdminPage implements OnInit {

  totalInquiries: number = 0;
  pendingInquiries: number = 0;
  completedInquiries: number = 0;

  allInquiries: any[] = [];
  latestInquiries: any[] = []; // New property for latest inquiries
  statusOptions: string[] = ['pending', 'in progress', 'completed'];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadAllInquiries(); // Load all inquiries on init
  }

  loadAllInquiries() {
    try {
      this.allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      // Sort inquiries by submittedAt in descending order and take the top 3
      this.latestInquiries = this.allInquiries
                               .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                               .slice(0, 3);
      this.loadInquiryStats(); // Recalculate stats after loading all inquiries
    } catch (error) {
      console.error('Error loading all inquiries from localStorage:', error);
    }
  }

  loadInquiryStats() {
    this.totalInquiries = this.allInquiries.length;
    this.pendingInquiries = this.allInquiries.filter((inq: any) => inq.status === 'pending').length;
    this.completedInquiries = this.allInquiries.filter((inq: any) => inq.status === 'completed').length;
  }

  updateInquiryStatus(inquiry: any, newStatus: string) {
    const inquiryIndex = this.allInquiries.findIndex(inq => inq === inquiry);
    if (inquiryIndex > -1) {
      this.allInquiries[inquiryIndex].status = newStatus;
      localStorage.setItem('inquiries', JSON.stringify(this.allInquiries));
      this.loadAllInquiries(); // Reload all to update latest and stats
    }
  }

  deleteInquiry(inquiry: any) {
    if (confirm(`Are you sure you want to delete the inquiry for ${inquiry.motorcycle}?`)) {
      this.allInquiries = this.allInquiries.filter(inq => inq !== inquiry);
      localStorage.setItem('inquiries', JSON.stringify(this.allInquiries));
      this.loadAllInquiries(); // Reload all to update latest and stats
    }
  }

  navigateToInquiriesList() {
    this.router.navigate(['/inquiries-list']);
  }

}
