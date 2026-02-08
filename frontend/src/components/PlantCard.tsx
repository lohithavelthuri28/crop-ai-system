import { Plant } from '../types/plant';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Droplets, Sun, TrendingUp, Maximize2, Check, X } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  matchPercentage: number;
  onLearnMore: (plant: Plant) => void;
}

export function PlantCard({ plant, matchPercentage, onLearnMore }: PlantCardProps) {
  const getLightIcon = () => {
    switch (plant.light) {
      case 'low': return '🌙';
      case 'medium': return '⛅';
      case 'bright': return '☀️';
    }
  };

  const getWaterIcon = () => {
    switch (plant.water) {
      case 'low': return '💧';
      case 'medium': return '💧💧';
      case 'high': return '💧💧💧';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-green-600 text-white">
            {matchPercentage}% Match
          </Badge>
        </div>
        {plant.petSafe && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Pet Safe
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{plant.name}</CardTitle>
        <CardDescription className="italic">{plant.scientificName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {plant.description.slice(0, 100)}...
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <span className="capitalize">{plant.light} light</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="capitalize">{plant.water} water</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="capitalize">{plant.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4 text-purple-500" />
            <span className="capitalize">{plant.size} size</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {plant.benefits.slice(0, 2).map((benefit, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {benefit}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onLearnMore(plant)} className="w-full" variant="default">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
