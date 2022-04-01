import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResultProcessorService } from 'src/app/services/result-processor.service';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit {
  constructor(private resultProcessor: ResultProcessorService) {
    this.initPaginatorConfig = {
      pageSize: 10,
      length: 400,
    };
  }

  resultats: Array<{ date: Date; resultats: any[] }> = [];
  columns = ['date'].concat(this.getCandidats());
  initPaginatorConfig: { pageSize: number; length: number };

  ngOnInit(): void {
    this.getResultats();
    this.getResultsLength();
  }

  getCandidats(): Array<any> {
    return this.resultProcessor.getCandidats();
  }

  async getResultats() {
    this.resultats = await this.resultProcessor.getResultsWithPagination(
      0,
      this.initPaginatorConfig.pageSize - 1
    );
  }

  async fetchResults(event: PageEvent) {
    this.resultats = await this.resultProcessor.getResultsWithPagination(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize - 1
    );
  }

  async getResultsLength() {
    this.initPaginatorConfig.length = (
      await this.resultProcessor.getResults()
    ).length;
  }
}
