export const soilNPKMap: Record<string, { N: number; P: number; K: number; ph: number }> = {
    "Black": { "N": 55, "P": 45, "K": 60, "ph": 7.2 },
    "Red": { "N": 40, "P": 35, "K": 40, "ph": 6.5 },
    "Alluvial": { "N": 50, "P": 50, "K": 50, "ph": 6.8 },
    "Laterite": { "N": 35, "P": 30, "K": 35, "ph": 6.0 }
};

export const seasonMap: Record<string, { temperature: number; humidity: number }> = {
    "Monsoon": { "temperature": 28, "humidity": 80 },
    "Winter": { "temperature": 22, "humidity": 60 },
    "Summer": { "temperature": 35, "humidity": 45 }
};

export const waterAvailabilityMultiplier: Record<string, number> = {
    "Low": 0.8,
    "Medium": 1.0,
    "High": 1.2
};
