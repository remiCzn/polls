import { ChartDataSets } from 'chart.js';
import { PollsProcessorService } from './polls-processor.service';

class Candidat {
  public readonly name: string;
  public readonly color: string;
  private image?: string;
  private readonly finalResult: number;

  constructor(name: string, color: string, finalResult: number, image?: string) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.finalResult = finalResult;
  }

  public buildCandidatDataSet(stacked: boolean): ChartDataSets {
    return {
      data: [],
      label: this.name,
      borderColor: stacked ? 'rgba(0,0,0,0)' : this.color,
      backgroundColor: stacked ? this.color : 'rgba(0,0,0,0)',
      pointRadius: stacked ? 0 : 3,
      pointBorderColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: this.color,
      pointHoverBorderColor: this.color,
    };
  }
}

export class CandidatList {
  public static LIST = [
    new Candidat(PollsProcessorService.CANDIDATS.ARTHAUD, '#bb0000', 0.56),
    new Candidat(PollsProcessorService.CANDIDATS.POUTOU, '#dd0000', 0.77),
    new Candidat(PollsProcessorService.CANDIDATS.ROUSSEL, '#ee0000', 2.28),
    new Candidat(PollsProcessorService.CANDIDATS.MELENCHON, '#cc2443', 21.95),
    new Candidat(PollsProcessorService.CANDIDATS.HIDALGO, '#ff8080', 1.75),
    new Candidat(PollsProcessorService.CANDIDATS.JADOT, '#00c000', 4.63),
    new Candidat(PollsProcessorService.CANDIDATS.MACRON, '#ffeb00', 27.85),
    new Candidat(PollsProcessorService.CANDIDATS.PECRESSE, '#0066cc', 4.78),
    new Candidat(PollsProcessorService.CANDIDATS.LASSALLE, '#26c4ec', 3.13),
    new Candidat(PollsProcessorService.CANDIDATS.DUPONT_AIGNAN, '#0082c4', 2.06),
    new Candidat(PollsProcessorService.CANDIDATS.LE_PEN, '#0d378a', 23.15),
    new Candidat(PollsProcessorService.CANDIDATS.ZEMMOUR, '#404040', 7.07),
  ];

  public static findByName(name: string): Candidat {
    return this.LIST.find((candidat) => candidat.name === name)!;
  }
}
