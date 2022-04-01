import { ChartDataSets } from 'chart.js';
import { ResultProcessorService } from './result-processor.service';

class Candidat {
  public readonly name: string;
  public readonly color: string;
  private image?: string;

  constructor(name: string, color: string, image?: string) {
    this.name = name;
    this.color = color;
    this.image = image;
  }

  public buildCandidatDataSet(): ChartDataSets {
    return {
      data: [],
      label: this.name,
      borderColor: this.color,
      backgroundColor: 'rgba(0,0,0,0)',
      pointRadius: 0,
    };
  }
}

export class CandidatList {
  public static LIST = [
    new Candidat(ResultProcessorService.CANDIDATS.ARTHAUD, '#bb0000'),
    new Candidat(ResultProcessorService.CANDIDATS.POUTOU, '#bb0000'),
    new Candidat(ResultProcessorService.CANDIDATS.ROUSSEL, '#dd0000'),
    new Candidat(ResultProcessorService.CANDIDATS.MELENCHON, '#cc2443'),
    new Candidat(ResultProcessorService.CANDIDATS.HIDALGO, '#ff8080'),
    new Candidat(ResultProcessorService.CANDIDATS.JADOT, '#00c000'),
    new Candidat(ResultProcessorService.CANDIDATS.MACRON, '#ffeb00'),
    new Candidat(ResultProcessorService.CANDIDATS.PECRESSE, '#0066cc'),
    new Candidat(ResultProcessorService.CANDIDATS.LASSALLE, '#26c4ec'),
    new Candidat(ResultProcessorService.CANDIDATS.DUPONT_AIGNAN, '#0082c4'),
    new Candidat(ResultProcessorService.CANDIDATS.LE_PEN, '#0d378a'),
    new Candidat(ResultProcessorService.CANDIDATS.ZEMMOUR, '#404040'),
  ];

  public static findByName(name: string): Candidat {
    return this.LIST.find((candidat) => candidat.name === name)!;
  }
}
