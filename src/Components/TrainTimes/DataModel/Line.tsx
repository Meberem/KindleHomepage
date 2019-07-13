import { Operator } from "./Operator";
export interface Line {
  type: string;
  id: string;
  fahrtNr: string;
  name: string;
  public: boolean;
  class: number;
  productCode: number;
  mode: string;
  product: string;
  operator: Operator;
  symbol: string;
  nr: number;
  metro: boolean;
  express: boolean;
  night: boolean;
}
