import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CandidatList } from 'src/app/services/candidats.data';
import { ResultProcessorService } from 'src/app/services/result-processor.service';

@Component({
  selector: 'app-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.scss'],
})
export class ResultChartComponent implements OnInit {
  chartData: ChartDataSets[] = [];

  chartLabels: Label[] = [];

  stacked: boolean = true;

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          stacked: this.stacked,
        },
      ],
    },
    animation: {
      duration: 800,
    },
  };

  constructor(private resultProcessor: ResultProcessorService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            stacked: this.stacked,
          },
        ],
      },
      animation: {
        duration: 0,
      },
    };
    this.chartData = [];
    CandidatList.LIST.forEach((candidat) => {
      this.chartData.push(candidat.buildCandidatDataSet(this.stacked));
    });
    this.chartLabels = [];
    this.resultProcessor
      .getResultsGroupByDate()
      .then((res: Array<{ date: Date; resultats: any }>) => {
        const raw = res
          .reverse()
          .filter(
            (sondage) => sondage.date.getTime() > new Date(2022, 1, 1).getTime()
          );
        raw.forEach((sondage) => {
          this.chartLabels.push(sondage.date.toISOString().split('T')[0]);
          CandidatList.LIST.forEach((candidat, index) => {
            this.chartData[index].data?.push(sondage.resultats[candidat.name]);
          });
        });
      });
    this.resultProcessor.getResultsGroupByDate();
  }
}
