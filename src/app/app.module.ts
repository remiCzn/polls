import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ResultChartComponent } from './components/result-chart/result-chart.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { CdkColumnDef } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, ResultChartComponent, ResultTableComponent],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTabsModule,
    FormsModule,
  ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent],
})
export class AppModule {}
