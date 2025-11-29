import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gear-details-modal',
  templateUrl: './gear-details-modal.component.html',
  styleUrls: ['./gear-details-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GearDetailsModalComponent implements OnInit {

  @Input() gear: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // Initialization logic if needed
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
