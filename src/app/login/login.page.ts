import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  async login() {
    try {
      const response = await fetch('assets/users.json');
      if (!response.ok) {
        throw new Error('Failed to load users.');
      }
      const users = await response.json();
      const user = users.find((u: any) => u.username === this.username && u.password === this.password);
      if (user) {
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user', user.id]);
        }
      } else {
        this.errorMessage = 'Invalid username or password.';
        this.cd.detectChanges();
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'An error occurred. Please try again.';
      this.cd.detectChanges();
    }
  }

}