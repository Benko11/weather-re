export interface Weather {
  city: string;
  country: string;
  state?: string;
  condition: string;
  icon: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  wind: {
    speed: number;
    direction: number;
  };
  visibility: number;
  time?: number;
}
