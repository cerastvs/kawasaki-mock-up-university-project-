import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-motorcycle-details-modal',
  templateUrl: './motorcycle-details-modal.component.html',
  styleUrls: ['./motorcycle-details-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MotorcycleDetailsModalComponent  implements OnInit {

  @Input() motorcycle: any;
  showFinanceCalculator: boolean = false;

  deposit: number = 0;
  monthsToPay: number = 6; // Default to minimum 6 months
  monthlyPayment: number | null = null;
  minDepositPercentage: number = 0.10; // 10%
  maxDepositPercentage: number = 0.80; // 80%

  minMonthsToPay: number = 6;
  maxMonthsToPay: number = 36;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.motorcycle && this.motorcycle.priceSRP) {
      this.deposit = this.motorcycle.priceSRP * this.minDepositPercentage;
      this.calculateMonthlyPayment(); // Calculate initial payment
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  toggleFinanceView() {
    this.showFinanceCalculator = !this.showFinanceCalculator;

    this.monthlyPayment = null;
    if (this.showFinanceCalculator && this.motorcycle && this.motorcycle.priceSRP) {
      this.deposit = this.motorcycle.priceSRP * this.minDepositPercentage;
      this.monthsToPay = this.minMonthsToPay; // Reset to min months
      this.calculateMonthlyPayment(); // Calculate initial payment for finance view
    }
  }

  calculateMonthlyPayment() {
    if (!this.motorcycle || !this.motorcycle.priceSRP) {
      this.monthlyPayment = null;
      return;
    }

    const price = this.motorcycle.priceSRP;
    const minDepositAmount = price * this.minDepositPercentage;
    const maxDepositAmount = price * this.maxDepositPercentage;

    // Ensure deposit is within valid range
    if (this.deposit < minDepositAmount) {
      this.deposit = minDepositAmount;
    } else if (this.deposit > maxDepositAmount) {
      this.deposit = maxDepositAmount;
    }

    // Ensure monthsToPay is within valid range
    if (this.monthsToPay < this.minMonthsToPay) {
      this.monthsToPay = this.minMonthsToPay;
    } else if (this.monthsToPay > this.maxMonthsToPay) {
      this.monthsToPay = this.maxMonthsToPay;
    }

    const principal = price - this.deposit;
    // 75% interest, so multiply by 1.75
    this.monthlyPayment = (principal / this.monthsToPay) * 1.75;
  }

}
