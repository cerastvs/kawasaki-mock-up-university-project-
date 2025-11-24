import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-motorcycle-card',
  templateUrl: './motorcycle-card.component.html',
  styleUrls: ['./motorcycle-card.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MotorcycleCardComponent  implements OnInit {

  @Input() id: string = '';
  @Input() modelName: string = '';
  @Input() priceSRP: number = 0;
  @Input() mainImage: string = '';

  @Output() viewDetails = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onViewDetails() {
    this.viewDetails.emit(this.id);
  }

}
