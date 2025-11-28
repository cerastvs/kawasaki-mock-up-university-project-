import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MotorcycleCardComponent } from 'src/app/src/app/motorcycle-card/motorcycle-card.component';
import { MotorcycleDetailsModalComponent } from 'src/app/src/app/src/app/motorcycle-details-modal/motorcycle-details-modal.component';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, MotorcycleCardComponent, MotorcycleDetailsModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserPage implements OnInit, AfterViewInit {

  public user: any;
  public motorcycles: any[] = [];
  public activeMotorcycle: any;
  
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      this.user = users.find((u: any) => u.id === userId);

      this.motorcycles = JSON.parse(localStorage.getItem('motorcycles') || '[]');

      if (this.motorcycles.length > 0) {
        this.activeMotorcycle = this.motorcycles[0];
      }
      this.initSwiper(); // Call initSwiper after motorcycles are loaded
    } catch (error) {
      console.error('Error reading data from localStorage:', error);
    }
  }

  ngAfterViewInit() {
    // initSwiper is now called from ngOnInit
  }

  private initSwiper() {
    if (!this.swiperContainer) {
      setTimeout(() => this.initSwiper(), 100);
      return;
    }

    const swiperEl = this.swiperContainer.nativeElement;
    
    swiperEl.slidesPerView = 1;
    swiperEl.speed = 500;
    swiperEl.loop = false;
    swiperEl.autoplay = true; 
    
    swiperEl.initialize();
  }

  handleSwiperInit(event: any) {
    const swiper = event.target.swiper;
    if (this.motorcycles && this.motorcycles.length > 0 && swiper) {
      this.activeMotorcycle = this.motorcycles[swiper.realIndex];
      this.cd.detectChanges();
    }
  }

  handleSwiperSlideChange(event: any) {
    const swiper = event.target.swiper;
    if (this.motorcycles && this.motorcycles.length > 0 && swiper) {
      this.activeMotorcycle = this.motorcycles[swiper.realIndex];
      this.cd.detectChanges();
    }
  }

  async handleViewDetails(motorcycleId: string) {
    const motorcycle = this.motorcycles.find(m => m.id === motorcycleId);
    if (!motorcycle) {
      console.error('Motorcycle not found!');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: MotorcycleDetailsModalComponent,
      componentProps: {
        motorcycle: motorcycle
      },
      cssClass: 'modal-corners'
    });
    return await modal.present();
  }
}