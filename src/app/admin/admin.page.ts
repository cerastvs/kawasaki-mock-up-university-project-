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

  latestInquiries: any[] = []; // Only keep latestInquiries for display

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadInquiriesAndStats(); // New method to load both latest inquiries and stats
  }

  loadInquiriesAndStats() {
    try {
      const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      
      // Calculate stats directly from inquiries
      this.totalInquiries = inquiries.length;
      this.pendingInquiries = inquiries.filter((inq: any) => inq.status === 'pending').length;
      this.completedInquiries = inquiries.filter((inq: any) => inq.status === 'completed').length;

      // Populate latestInquiries
      this.latestInquiries = inquiries
                               .sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                               .slice(0, 3);
    } catch (error) {
      console.error('Error loading inquiries and stats from localStorage:', error);
    }
  }

  navigateToFilteredInquiries(filterStatus: string | null) {
    if (filterStatus) {
      this.router.navigate(['/inquiries-list', { filter: filterStatus }]);
    } else {
      this.router.navigate(['/inquiries-list']);
    }
  }


}
