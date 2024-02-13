import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-monthly-revenue',
  template: `
    <div>
      <h1>Bénéfices par mois</h1>
      <label for="year">Year:</label>
      <select id="year" [(ngModel)]="selectedYear" (change)="fetchData()">
        <option *ngFor="let year of years" [value]="year">{{ year }}</option>
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
export class ManagerMonthlyRevenueComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Total Revenue',
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
  selectedYear: number = new Date().getFullYear();

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
      .get<any[]>(`${this.apiUrl}/sales/revenue/${this.selectedYear}`)
      .subscribe(
        (data) => {
          // Initialize an array for all months with default revenue of 0
          const monthlyRevenue = new Array(12).fill(0);
          // Update the array with the fetched data
          data.forEach((item) => {
            if (item.month >= 1 && item.month <= 12) {
              monthlyRevenue[item.month - 1] = item.totalRevenue;
            }
          });

          // Update the chart data
          this.lineChartData.datasets[0].data = monthlyRevenue;
          this.lineChartData.labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];

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
