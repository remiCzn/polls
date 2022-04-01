import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.scss'],
})
export class ResultChartComponent implements OnInit {
  chartData: ChartDataSets[] = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A',
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B',
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C',
    },
  ];

  chartLabels: Label[] = ['January', 'February', 'March', 'April'];

  chartOptions: ChartOptions = {
    responsive: true,
  };

  constructor() {}

  ngOnInit(): void {}
}
