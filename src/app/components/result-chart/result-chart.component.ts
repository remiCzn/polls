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

  constructor(private resultProcessor: ResultProcessorService) {}

  ngOnInit(): void {
    const candidat1 = CandidatList.findByName(
      ResultProcessorService.CANDIDATS.MELENCHON
    );
    const candidat2 = CandidatList.findByName(
      ResultProcessorService.CANDIDATS.ZEMMOUR
    );
    this.chartData = [
      candidat1.buildCandidatDataSet(),
      candidat2.buildCandidatDataSet(),
    ];
    this.chartLabels = [];
    this.resultProcessor
      .getResultsWithPagination(0, 100)
      .then((res: Array<{ date: Date; resultats: any }>) => {
        const raw = res.reverse();
        raw.forEach((sondage) => {
          this.chartLabels.push(sondage.date.toISOString().split('T')[0]);
          console.log(sondage.resultats);
          this.chartData[0].data?.push(sondage.resultats[candidat1.name]);
          this.chartData[1].data?.push(sondage.resultats[candidat2.name]);
          console.log(this.chartData);
          console.log(this.chartLabels);
        });
      });
  }
}
