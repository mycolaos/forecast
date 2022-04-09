import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ForecastChartComponent } from './components/forecast-chart/forecast-chart.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './pages/index/index.component';
import { MaterialModule } from 'material.module';
import { NgModule } from '@angular/core';
import { SearchFormComponent } from './components/searchform/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SearchFormComponent,
    ForecastComponent,
    ForecastChartComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
