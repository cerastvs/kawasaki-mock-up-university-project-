import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth'; // Import AuthService

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

  constructor(private router: Router, private cd: ChangeDetectorRef, private authService: AuthService) { } // Inject AuthService

  ngOnInit() {
  }

  async login() {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.username === this.username && u.password === this.password);
      if (user) {
        this.authService.login(user); // Store user in AuthService and localStorage
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user', user.userId]);
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