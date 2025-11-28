import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.page.html',
  styleUrls: ['./inquiries-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InquiriesListPage implements OnInit {

  inquiries: any[] = [];
  statusOptions: string[] = ['pending', 'in progress', 'completed'];
  currentFilter: string | null = null; // Property to store the current filter

  constructor(private route: ActivatedRoute) { } // Inject ActivatedRoute

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentFilter = params.get('filter');
      this.loadInquiries(); // Reload inquiries when filter changes
    });
  }

  loadInquiries() {
    try {
      let allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      
      if (this.currentFilter && this.currentFilter !== 'null') { // Filter only if filter is provided and not 'null'
        this.inquiries = allInquiries.filter((inq: any) => inq.status === this.currentFilter);
      } else {
        this.inquiries = allInquiries; // Show all inquiries if no filter or 'null'
      }

      console.log('Loaded inquiries from localStorage (filtered by ' + (this.currentFilter || 'all') + '):', this.inquiries);
    } catch (error) {
      console.error('Error loading inquiries from localStorage:', error);
    }
  }

  updateInquiryStatus(inquiry: any, newStatus: string) {
    let allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const inquiryIndex = allInquiries.findIndex((inq: any) => inq.motorcycle === inquiry.motorcycle && inq.submittedAt === inquiry.submittedAt); // Find by unique properties
    
    if (inquiryIndex > -1) {
      allInquiries[inquiryIndex].status = newStatus;
      localStorage.setItem('inquiries', JSON.stringify(allInquiries));
      this.loadInquiries(); // Reload to apply filter and refresh display
      console.log('Inquiry status updated:', inquiry);
    }
  }

  deleteInquiry(inquiry: any) {
    if (confirm(`Are you sure you want to delete the inquiry for ${inquiry.motorcycle}?`)) {
      let allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      allInquiries = allInquiries.filter((inq: any) => !(inq.motorcycle === inquiry.motorcycle && inq.submittedAt === inquiry.submittedAt)); // Filter by unique properties
      localStorage.setItem('inquiries', JSON.stringify(allInquiries));
      this.loadInquiries(); // Reload to apply filter and refresh display
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
