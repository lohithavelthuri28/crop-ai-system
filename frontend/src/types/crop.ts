export interface CropInputData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  soilPH: number;
  state: string;
  city: string;
}

export interface PredictionResult {
  crop: string;
  confidence: number;
  temperature: number;
  humidity: number;
  rainfall: number;

  probabilities?: Record<string, number>;
  topCrops?: { crop: string; confidence: number }[];
}
