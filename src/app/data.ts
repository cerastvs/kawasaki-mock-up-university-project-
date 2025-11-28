import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  async loadInitialData(): Promise<void> {
    try {
      if (!localStorage.getItem('users') || !localStorage.getItem('motorcycles')) {
        const users$ = this.http.get('/assets/users.json');
        const motorcycles$ = this.http.get('/assets/motorcycles.json');

        const [users, motorcycles] = await Promise.all([
          firstValueFrom(users$),
          firstValueFrom(motorcycles$)
        ]);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('motorcycles', JSON.stringify(motorcycles));
      }

      if (!localStorage.getItem('inquiries')) {
        localStorage.setItem('inquiries', JSON.stringify([]));
      }

    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }
}
