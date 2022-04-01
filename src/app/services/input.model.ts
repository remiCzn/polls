export type Data = Array<Sondage>;

export interface Sondage {
  id: string;
  nom_institut: string;
  debut_enquete: string;
  fin_enquete: string;
  rolling: boolean;
  media: boolean;
  commanditaire: string | null;
  lien: string | null;
  echantillon: number;
  population: string;
  tours: Array<Tour>;
}

export interface Tour {
  tour: string;
  hypotheses: Array<Hypothese>;
}

export interface Hypothese {
  hypothese: string | null;
  sous_echantillon: number;
  candidats: Array<Candidat>;
}

export interface Candidat {
  candidat: string | null;
  parti: Array<string>;
  intentions: number;
  erreur_sup: number;
  erreur_inf: number;
}
