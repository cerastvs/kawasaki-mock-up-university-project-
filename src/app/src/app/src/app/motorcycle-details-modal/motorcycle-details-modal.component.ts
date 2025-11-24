import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motorcycle-details-modal',
  templateUrl: './motorcycle-details-modal.component.html',
  styleUrls: ['./motorcycle-details-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MotorcycleDetailsModalComponent  implements OnInit {

  @Input() motorcycle: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
