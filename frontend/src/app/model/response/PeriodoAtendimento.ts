import {DiaDaSemana} from "./DiaDaSemana";

export interface PeriodoAtendimento {
  id: string;
  diaDaSemana: DiaDaSemana;
  horaInicio: string;
  horaFim: string;
}
