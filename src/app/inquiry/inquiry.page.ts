import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Removed HttpClient, HttpClientModule, firstValueFrom as they are no longer needed here

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // Removed HttpClientModule
})
export class InquiryPage implements OnInit {

  motorcycleName: string | null = null;
  motorcycle: any | null = null;
  availableColors: string[] = [];

  // Form fields
  fullName: string = '';
  phoneNumber: string = '';
  email: string = '';
  preferredColor: string = '';
  message: string = '';
  preferredBranch: string = '';
  bestTimeToContact: string = '';
  paymentPlan: string = '';
  budgetRange: string = '';

  // Dropdown options
  branches: string[] = [
    'Head Office',
    'Commonwealth',
    'Mabalacat',
    'Cebu',
    'Bacolod',
    'Tacloban',
    'Davao'
  ];
  contactTimes: string[] = ['Morning', 'Afternoon', 'Evening', 'Any time'];
  paymentPlans: string[] = ['Cash', 'Installment (In-House Financing)', 'Bank Loan'];

  constructor(private route: ActivatedRoute /* Removed private http: HttpClient */) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.motorcycleName = params.get('motorcycle');
      if (this.motorcycleName) {
        try {
          const motorcyclesData = JSON.parse(localStorage.getItem('motorcycles') || '[]');
          this.motorcycle = motorcyclesData.find((m: any) => m.modelName === this.motorcycleName);
          if (this.motorcycle && this.motorcycle.availableColors) {
            this.availableColors = this.motorcycle.availableColors;
            if (this.availableColors.length > 0) {
              this.preferredColor = this.availableColors[0]; // Set default preferred color
            }
          }
        } catch (error) {
          console.error('Error reading motorcycle data from localStorage:', error);
        }
      }
    });
  }

  submitInquiry() {
    const newInquiry = {
      motorcycle: this.motorcycleName,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      preferredColor: this.preferredColor,
      message: this.message,
      preferredBranch: this.preferredBranch,
      bestTimeToContact: this.bestTimeToContact,
      paymentPlan: this.paymentPlan,
      budgetRange: this.budgetRange,
      submittedAt: new Date().toISOString(),
      status: 'pending' // Add status field
    };

    try {
      // Get existing inquiries from localStorage
      const existingInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      // Add the new inquiry
      existingInquiries.push(newInquiry);
      // Save back to localStorage
      localStorage.setItem('inquiries', JSON.stringify(existingInquiries));

      console.log('Inquiry saved to localStorage:', newInquiry);
      alert('Inquiry submitted successfully and saved locally!');
    } catch (error) {
      console.error('Error saving inquiry to localStorage:', error);
      alert('There was an error submitting your inquiry.');
    }
  }

}
