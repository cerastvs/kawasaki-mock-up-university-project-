import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule, FormsModule } from '@angular/common';

@Component({
  selector: 'app-motorcycle-details-modal',
  templateUrl: './motorcycle-details-modal.component.html',
  styleUrls: ['./motorcycle-details-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MotorcycleDetailsModalComponent  implements OnInit {

  @Input() motorcycle: any;
  showFinanceCalculator: boolean = false;

  deposit: number = 0;
  monthsToPay: number = 12; // Default to 12 months
  monthlyPayment: number | null = null;
  minDepositPercentage: number = 0.10; // 10%

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.motorcycle && this.motorcycle.priceSRP) {
      this.deposit = this.motorcycle.priceSRP * this.minDepositPercentage;
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  toggleFinanceView() {
    this.showFinanceCalculator = !this.showFinanceCalculator;
    // Reset payment when switching views
    this.monthlyPayment = null;
    if (this.showFinanceCalculator && this.motorcycle && this.motorcycle.priceSRP) {
      this.deposit = this.motorcycle.priceSRP * this.minDepositPercentage;
      this.monthsToPay = 12;
    }
  }

  calculateMonthlyPayment() {
    if (!this.motorcycle || !this.motorcycle.priceSRP) {
      this.monthlyPayment = null;
      return;
    }

    const price = this.motorcycle.priceSRP;
    const minDeposit = price * this.minDepositPercentage;

    if (this.deposit < minDeposit) {
      console.error(`Deposit must be at least ${this.minDepositPercentage * 100}% of the price ($${minDeposit.toFixed(2)})`);
      this.monthlyPayment = null;
      return;
    }

    if (this.monthsToPay <= 0) {
      console.error('Months of payment must be a positive number.');
      this.monthlyPayment = null;
      return;
    }

    const principal = price - this.deposit;
    // 75% interest, so multiply by 1.75
    this.monthlyPayment = (principal / this.monthsToPay) * 1.75;
  }

}
