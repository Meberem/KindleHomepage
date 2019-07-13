import { Currently } from "./Currently";
import { Hourly } from "./Hourly";
import { Daily } from "./Daily";
import { Flags } from "./Flags";

export interface Weather {
  latitude: number;
  longitude: number;
  timezone: string;
  currently: Currently;
  hourly: Hourly;
  daily: Daily;
  flags: Flags;
  offset: number;
}
