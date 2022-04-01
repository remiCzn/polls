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
