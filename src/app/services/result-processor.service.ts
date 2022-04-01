import { Injectable } from '@angular/core';
import { Sondage, Tour } from './input.model';
import PresidentiellesJson from './presidentielle.json';
import { Data } from './input.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ResultProcessorService {
  constructor() {}

  public static CANDIDATS = {
    ARTHAUD: 'Nathalie Arthaud',
    POUTOU: 'Philippe Poutou',
    ROUSSEL: 'Fabien Roussel',
    MELENCHON: 'Jean-Luc Mélenchon',
    JADOT: 'Yannick Jadot',
    HIDALGO: 'Anne Hidalgo',
    MACRON: 'Emmanuel Macron',
    LASSALLE: 'Jean Lassalle',
    PECRESSE: 'Valérie Pécresse',
    DUPONT_AIGNAN: 'Nicolas Dupont-Aignan',
    LE_PEN: 'Marine Le Pen',
    ZEMMOUR: 'Eric Zemmour',
  };

  private static results: Data = PresidentiellesJson;
  private static resultsLink =
    'https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json';

  private getData(): Promise<Data> {
    // return Promise.resolve(ResultProcessorService.results);
    return axios.get(ResultProcessorService.resultsLink).then((result) => {
      return result.data;
    });
  }

  public getCandidats() {
    return Object.values(ResultProcessorService.CANDIDATS);
  }

  public async getResults() {
    const data = await this.getData();
    const raw = data.sort((a, b) => {
      return Date.parse(b.fin_enquete) - Date.parse(a.fin_enquete);
    });
    console.log(raw);
    return this.parseResultats(raw);
  }

  public async getResultsWithPagination(start: number, end: number) {
    const data = await this.getData();
    const raw = data
      .sort((a, b) => {
        return Date.parse(b.fin_enquete) - Date.parse(a.fin_enquete);
      })
      .slice(start, end + 1);
    console.log(raw);
    return this.parseResultats(raw);
  }

  public async getResultsGroupByDate() {
    const raw = await this.getResults();
    let result = [];
    let date: Date = new Date();
    let sum: any = {};
    let n: number = 0;
    for (let i = 1; i < raw.length; i++) {
      const sondage = raw[i];
      if (sondage.date.getTime() != date.getTime()) {
        i > 0 ? result.push({ date: date, resultats: sum }) : null;
        date = sondage.date;
        sum = sondage.resultats;
        n = 1;
      } else {
        Object.values(ResultProcessorService.CANDIDATS).forEach((candidat) => {
          sum[candidat] =
            (sum[candidat] * n + sondage.resultats[candidat]) / (n + 1);
        });
        n++;
      }
    }
    result.push({ date: date, resultats: sum });
    console.log(result);
    return result;
  }

  private parseResultats(data: Data) {
    return data.map((sondage: Sondage) => {
      let rawResultat = sondage.tours.filter(
        (tour: Tour) => tour.tour === 'Premier tour'
      )[0].hypotheses[0].candidats;
      let resultats: any = {};
      rawResultat.forEach((resultatCandidat) => {
        if (
          resultatCandidat.candidat != null &&
          Object.values(ResultProcessorService.CANDIDATS).includes(
            resultatCandidat.candidat
          )
        ) {
          resultats[resultatCandidat.candidat] = resultatCandidat.intentions;
        }
      });
      return {
        date: new Date(Date.parse(sondage.fin_enquete)),
        resultats: resultats,
      };
    });
  }
}
