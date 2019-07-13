export interface Currently {
  time: number;
  summary: string;
  icon: string;
  nearestStormDistance: number;
  precipIntensity: number;
  precipProbability: number;
  precipType: string;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}
