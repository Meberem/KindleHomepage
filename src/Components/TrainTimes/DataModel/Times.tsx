import { Stop } from "./Stop";
import { Line } from "./Line";
import { Remark } from "./Remark";
export interface Times {
  tripId: string;
  stop: Stop;
  when: Date;
  direction: string;
  line: Line;
  remarks: Remark[];
  trip: number;
  delay: number;
  platform?: any;
}
