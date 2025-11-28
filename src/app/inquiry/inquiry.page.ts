import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class InquiryPage implements OnInit {

  motorcycleName: string | null = null;
  motorcycle: any | null = null;
  availableColors: string[] = [];

  fullName: string = '';
  phoneNumber: string = '';
  email: string = '';
  preferredColor: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.motorcycleName = params.get('motorcycle');
      if (this.motorcycleName) {
        // Fetch full motorcycle data
        try {
          const motorcyclesData: any = await firstValueFrom(this.http.get('/assets/motorcycles.json'));
          this.motorcycle = motorcyclesData.find((m: any) => m.modelName === this.motorcycleName);
          if (this.motorcycle && this.motorcycle.availableColors) {
            this.availableColors = this.motorcycle.availableColors;
            if (this.availableColors.length > 0) {
              this.preferredColor = this.availableColors[0]; // Set default preferred color
            }
          }
        } catch (error) {
          console.error('Error fetching motorcycle data:', error);
        }
      }
    });
  }

  submitInquiry() {
    console.log('Inquiry Submitted!', {
      motorcycle: this.motorcycleName,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      preferredColor: this.preferredColor,
      message: this.message
    });
    // Here you would typically send this data to a backend service
    alert('Inquiry submitted successfully!');
  }

}
