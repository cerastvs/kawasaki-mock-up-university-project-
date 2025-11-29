import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleDataService {
  private motorcyclesUrl = 'assets/motorcycles.json';

  constructor(private http: HttpClient) { }

  getMotorcycles(): Observable<any[]> {
    return this.http.get<any[]>(this.motorcyclesUrl);
  }
}
