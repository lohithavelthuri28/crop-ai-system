export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  light: 'low' | 'medium' | 'bright';
  water: 'low' | 'medium' | 'high';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  size: 'small' | 'medium' | 'large';
  petSafe: boolean;
  benefits: string[];
  careInstructions: {
    watering: string;
    light: string;
    humidity: string;
    temperature: string;
  };
}

export interface UserPreferences {
  light?: 'low' | 'medium' | 'bright';
  water?: 'low' | 'medium' | 'high';
  experience?: 'beginner' | 'intermediate' | 'advanced';
  size?: 'small' | 'medium' | 'large';
  petSafe?: boolean;
}
