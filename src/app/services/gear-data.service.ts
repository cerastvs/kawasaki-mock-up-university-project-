import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GearDataService {
  private gearsUrl = 'assets/gears.json';

  constructor(private http: HttpClient) { }

  getGears(): Observable<any[]> {
    return this.http.get<any[]>(this.gearsUrl);
  }
}
