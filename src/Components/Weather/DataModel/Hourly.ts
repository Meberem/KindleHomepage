import { Datum } from "./Datum";
export interface Hourly {
  summary: string;
  icon: string;
  data: Datum[];
}
