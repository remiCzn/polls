import { Injectable } from '@angular/core';
import { Sondage, Tour, Data } from './input.model';
import PresidentiellesJson from './presidentielle.json';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class PollsProcessorService {

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
    return axios.get(PollsProcessorService.resultsLink).then((result) => {
      return result.data.filter((value: Sondage) => Date.parse(value.fin_enquete) <= Date.parse("2022-04-9"));
    });
  }

  public getCandidats() {
    return Object.values(PollsProcessorService.CANDIDATS);
  }

  public async getResults() {
    const data = await this.getData();
    const raw = data
      .sort((a, b) => {
      return Date.parse(b.fin_enquete) - Date.parse(a.fin_enquete);
    });
    return this.parseResultats(raw);
  }

  public async getResultsWithPagination(start: number, end: number) {
    const data = await this.getData();
    const raw = data
      .sort((a, b) => {
        return Date.parse(b.fin_enquete) - Date.parse(a.fin_enquete);
      })
      .slice(start, end + 1);
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
        i > 0
          ? result.push({
              date: date,
              resultats: PollsProcessorService.normalize(sum),
            })
          : null;
        date = sondage.date;
        sum = sondage.resultats;
        n = 1;
      } else {
        Object.values(PollsProcessorService.CANDIDATS).forEach((candidat) => {
          sum[candidat] =
            (sum[candidat] * n + sondage.resultats[candidat]) / (n + 1);
        });
        n++;
      }
    }
    result.push({ date: date, resultats: sum });
    return result;
  }

  private parseResultats(data: Data) {
    return data.map((sondage: Sondage) => {
      const a = sondage.tours.filter(
        (tour: Tour) => tour.tour === 'Premier tour'
      )[0];
      let rawResultat = a.hypotheses[0].candidats;
      let resultats: any = {};
      rawResultat.forEach((resultatCandidat) => {
        if (
          resultatCandidat.candidat != null &&
          Object.values(PollsProcessorService.CANDIDATS).includes(
            resultatCandidat.candidat
          )
        ) {
          resultats[resultatCandidat.candidat] = resultatCandidat.intentions;
        }
      });
      return {
        date: new Date(Date.parse(sondage.fin_enquete)),
        institut: sondage.nom_institut,
        lien: sondage.lien,
        resultats: resultats,
      };
    });
  }

  private static normalize(resultats: any) {
    const sum = Object.values(this.CANDIDATS).reduce(
      (previous, candidat) => previous + resultats[candidat],
      0
    );
    Object.values(this.CANDIDATS).forEach((candidat) => {
      resultats[candidat] *= 100 / sum;
    });
    return resultats;
  }
}
