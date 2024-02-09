import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'manager-total-monthly-appointments',
  template: `
    <div>
      <label for="year">Year:</label>
      <select id="year" [(ngModel)]="selectedYear" (change)="fetchData()">
        <option *ngFor="let year of years" [value]="year">{{ year }}</option>
      </select>

      <label for="month">Month:</label>
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
export class TotalMonthlyAppointments implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Total Appointments',
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

  constructor() {}

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
      `http://localhost:3000/managers/total-monthly-appointments?year=${this.selectedYear}&month=${this.selectedMonth}`
    )
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((data: any) => data.day);
        const dataPoints = data.map((data: any) => data.count);
        console.log(labels, dataPoints);

        this.lineChartData.datasets = [
          {
            data: dataPoints,
            label: 'Total Appointments',
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
