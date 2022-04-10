import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore/lite';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ForecastChartComponent } from './components/forecast-chart/forecast-chart.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastHistoryComponent } from './components/forecast-history/forecast-history.component';
import { HeaderComponent } from './components/header/header.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HistoryComponent } from './pages/history/history.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './pages/index/index.component';
import { MaterialModule } from 'material.module';
import { NgModule } from '@angular/core';
import { SearchFormComponent } from './components/searchform/search-form.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SearchFormComponent,
    ForecastComponent,
    ForecastChartComponent,
    HistoryComponent,
    ForecastHistoryComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'arbnco-test-24469',
        apiKey: environment.firebase.apiKey,
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
