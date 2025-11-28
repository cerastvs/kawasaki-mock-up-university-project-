import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.checkLoginStatus(); // Initialize user from localStorage on service creation
  }

  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(user: any) { // Accept the user object directly, as login logic will be in LoginPage
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.currentUserSubject.value.role === 'admin';
  }
}