import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { GearDataService } from 'src/app/services/gear-data.service'; // Import GearDataService
import { GearDetailsModalComponent } from 'src/app/src/app/src/app/gear-details-modal/gear-details-modal.component'; // Import GearDetailsModalComponent

@Component({
  selector: 'app-gear-catalog',
  templateUrl: './gear-catalog.component.html',
  styleUrls: ['./gear-catalog.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class GearCatalogComponent implements OnInit {

  gears: any[] = [];
  filteredGears: any[] = [];
  searchTerm: string = '';
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private modalCtrl: ModalController, private gearDataService: GearDataService) { } // Inject GearDataService

  ngOnInit() {
    this.gearDataService.getGears().subscribe(data => {
      this.gears = data;
      this.filteredGears = data; // Initialize filtered list
      this.categories = [...new Set(data.map(g => g.category))]; // Get unique categories
    });
  }

  filterGears() {
    let tempGears = this.gears;

    // Filter by category
    if (this.selectedCategory) {
      tempGears = tempGears.filter(gear => gear.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm) {
      tempGears = tempGears.filter(gear =>
        gear.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        gear.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredGears = tempGears;
  }

  async handleViewDetails(gear: any) {
    console.log('View Gear Details:', gear);
    const modal = await this.modalCtrl.create({
      component: GearDetailsModalComponent, // Use the new GearDetailsModalComponent
      componentProps: {
        gear: gear
      },
      cssClass: 'modal-corners'
    });
    return await modal.present();
  }

}


