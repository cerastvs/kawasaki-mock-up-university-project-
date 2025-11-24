import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MotorcycleCardComponent } from 'src/app/src/app/motorcycle-card/motorcycle-card.component';
import { MotorcycleDetailsModalComponent } from 'src/app/src/app/src/app/motorcycle-details-modal/motorcycle-details-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, MotorcycleCardComponent, MotorcycleDetailsModalComponent]
})
export class UserPage implements OnInit {

  public user: any;
  public motorcycles: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController) { }

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      console.error('User ID not found in route');
      return;
    }

    try {
      // Fetch user data
      const userResponse = await fetch('/assets/users.json');
      if (!userResponse.ok) {
        throw new Error('Failed to load users.');
      }
      const users = await userResponse.json();
      this.user = users.find((u: any) => u.id === userId);

      // Fetch motorcycle data
      const motoResponse = await fetch('/assets/motorcycles.json');
      if (!motoResponse.ok) {
        throw new Error('Failed to load motorcycles.');
      }
      this.motorcycles = await motoResponse.json();

    } catch (error) {
      console.error('Error fetching data:', error);
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
      }
    });
    return await modal.present();
  }

}
