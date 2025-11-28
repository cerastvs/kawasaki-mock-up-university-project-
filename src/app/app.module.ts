import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './login/login.page';
import { AdminPage } from './admin/admin.page';
import { DataService } from './data';

// Factory function for the APP_INITIALIZER
export function initializeApp(dataService: DataService) {
  return () => dataService.loadInitialData();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    LoginPage,
    AdminPage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService, // Provide the DataService
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DataService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
