import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule, HttpClientModule]
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.http.get<any[]>('assets/users.json').subscribe(users => {
      const user = users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        this.errorMessage = 'Invalid username or password.';
      }
    }, error => {
      console.error(error);
      this.errorMessage = 'An error occurred. Please try again.';
    });
  }

}