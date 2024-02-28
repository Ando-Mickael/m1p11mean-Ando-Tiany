import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-monthly-appointments-by-year',
  template: `
    <div>
      <label for="year">Année:</label>
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
export class ManagerMonthlyAppointmentsByYear implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Nombre de rendez-vous par mois',
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

  constructor(private configService: ConfigService) {
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
    fetch(
      `${this.apiUrl}/managers/monthly-appointments?year=${this.selectedYear}`
    )
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((data: any) => data.month);
        const dataPoints = data.map((data: any) => data.count);
        console.log(labels, dataPoints);

        this.lineChartData.datasets = [
          {
            data: dataPoints,
            label: 'Nombre de rendez-vous par mois',
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
          },
        ];
        this.lineChartData.labels = labels;

        if (this.chart) {
          this.chart.update();
        }
      });
  }
}
