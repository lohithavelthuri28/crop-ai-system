import { Plant } from '../types/plant';
import { UserPreferences } from '../types/plant';

export interface PlantMatch {
  plant: Plant;
  matchPercentage: number;
}

export function matchPlants(plants: Plant[], preferences: UserPreferences): PlantMatch[] {
  const matches = plants.map(plant => {
    let score = 0;
    let totalCriteria = 0;

    // Light preference (important)
    if (preferences.light) {
      totalCriteria += 2;
      if (plant.light === preferences.light) {
        score += 2;
      } else if (
        (preferences.light === 'medium' && (plant.light === 'low' || plant.light === 'bright')) ||
        (preferences.light === 'low' && plant.light === 'medium') ||
        (preferences.light === 'bright' && plant.light === 'medium')
      ) {
        score += 1; // Partial match for adjacent levels
      }
    }

    // Water preference (important)
    if (preferences.water) {
      totalCriteria += 2;
      if (plant.water === preferences.water) {
        score += 2;
      } else if (
        (preferences.water === 'medium' && (plant.water === 'low' || plant.water === 'high')) ||
        (preferences.water === 'low' && plant.water === 'medium') ||
        (preferences.water === 'high' && plant.water === 'medium')
      ) {
        score += 1; // Partial match for adjacent levels
      }
    }

    // Experience level (very important)
    if (preferences.experience) {
      totalCriteria += 2;
      if (plant.difficulty === preferences.experience) {
        score += 2;
      } else if (
        preferences.experience === 'beginner' && plant.difficulty === 'intermediate'
      ) {
        score += 0.5; // Beginner can handle some intermediate plants
      } else if (
        preferences.experience === 'intermediate' && plant.difficulty === 'beginner'
      ) {
        score += 1.5; // Intermediate can easily handle beginner plants
      } else if (
        preferences.experience === 'advanced'
      ) {
        score += 1.5; // Advanced can handle any difficulty
      }
    }

    // Size preference
    if (preferences.size) {
      totalCriteria += 1;
      if (plant.size === preferences.size) {
        score += 1;
      } else if (
        (preferences.size === 'medium' && (plant.size === 'small' || plant.size === 'large')) ||
        (preferences.size === 'large' && plant.size === 'medium')
      ) {
        score += 0.5; // Partial match for size flexibility
      }
    }

    // Pet safety (critical if they have pets)
    if (preferences.petSafe !== undefined) {
      totalCriteria += 2;
      if (preferences.petSafe && plant.petSafe) {
        score += 2; // Perfect match for pet safe
      } else if (!preferences.petSafe) {
        score += 2; // They don't have pets, so all plants are fine
      }
      // If they have pets and plant is not pet safe, score += 0 (no points)
    }

    const matchPercentage = totalCriteria > 0 ? Math.round((score / totalCriteria) * 100) : 0;
    
    return {
      plant,
      matchPercentage
    };
  });

  // Filter out plants that don't meet critical criteria
  const filteredMatches = matches.filter(match => {
    // If user has pets, exclude non-pet-safe plants
    if (preferences.petSafe && !match.plant.petSafe) {
      return false;
    }
    // Only show plants with at least 40% match
    return match.matchPercentage >= 40;
  });

  // Sort by match percentage (highest first)
  return filteredMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
