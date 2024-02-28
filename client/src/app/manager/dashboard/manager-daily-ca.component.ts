import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-daily-ca',
  template: `
    <div>
      <h2>Chiffres d'affaire par jours</h2>
      <label for="year">Année:</label>
      <select id="year" [(ngModel)]="selectedYear" (change)="fetchData()">
        <option *ngFor="let year of years" [value]="year">{{ year }}</option>
      </select>

      <label for="month">Mois:</label>
      <select id="month" [(ngModel)]="selectedMonth" (change)="fetchData()">
        <option *ngFor="let month of months" [value]="month">
          {{ month }}
        </option>
      </select>
    </div>

    <div style="display: block;">
      <canvas
        baseChart
        #chart
        [data]="lineChartData"
        [options]="lineChartOptions"
        [type]="lineChartType"
      >
      </canvas>
    </div>
  `,
  styles: [],
})
export class ManagerDailyCaComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: "Total Chiffre d'affaire",
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
    labels: [],
  };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  lineChartType: ChartType = 'line';

  years: number[] = [];
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;

  apiUrl: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.populateYears();
    this.fetchData();
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from(
      { length: 10 },
      (_, i) => currentYear - i
    ).reverse();
  }

  fetchData() {
    this.http
      .get<any[]>(
        `${this.apiUrl}/sales/income/${this.selectedYear}/${this.selectedMonth}`
      )
      .subscribe(
        (data) => {
          // Determine the number of days in the selected month
          const daysInMonth = new Date(
            this.selectedYear,
            this.selectedMonth,
            0
          ).getDate();

          // Initialize an array with 0 for each day of the month
          const dailyIncome = Array.from({ length: daysInMonth }, () => 0);
          const labels = Array.from(
            { length: daysInMonth },
            (_, i) => `${i + 1}`
          );

          // Update the array with fetched data
          data.forEach((item) => {
            if (item.day >= 1 && item.day <= daysInMonth) {
              dailyIncome[item.day - 1] = item.totalIncome;
            }
          });

          // Update the chart data
          this.lineChartData.datasets[0].data = dailyIncome;
          this.lineChartData.labels = labels;

          // Force chart update
          if (this.chart) {
            this.chart.update();
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
