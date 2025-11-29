import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { MotorcycleDataService } from 'src/app/services/motorcycle-data.service';
import { MotorcycleCardComponent } from 'src/app/src/app/motorcycle-card/motorcycle-card.component';
import { MotorcycleDetailsModalComponent } from 'src/app/src/app/src/app/motorcycle-details-modal/motorcycle-details-modal.component';

@Component({
  selector: 'app-motorcycle-catalog',
  templateUrl: './motorcycle-catalog.component.html',
  styleUrls: ['./motorcycle-catalog.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, MotorcycleCardComponent, FormsModule]
})
export class MotorcycleCatalogComponent implements OnInit {

  motorcycles: any[] = [];
  filteredMotorcycles: any[] = [];
  searchTerm: string = '';
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private motorcycleDataService: MotorcycleDataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.motorcycleDataService.getMotorcycles().subscribe(data => {
      this.motorcycles = data;
      this.filteredMotorcycles = data; // Initialize filtered list
      this.categories = [...new Set(data.map(m => m.category))]; // Get unique categories
    });
  }

  filterMotorcycles() {
    let tempMotorcycles = this.motorcycles;

    // Filter by category
    if (this.selectedCategory) {
      tempMotorcycles = tempMotorcycles.filter(motorcycle => motorcycle.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm) {
      tempMotorcycles = tempMotorcycles.filter(motorcycle =>
        motorcycle.modelName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredMotorcycles = tempMotorcycles;
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


