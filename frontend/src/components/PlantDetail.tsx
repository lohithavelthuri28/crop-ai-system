import { Plant } from '../types/plant';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Sun, Droplets, Thermometer, Cloud, CheckCircle2, XCircle } from 'lucide-react';

interface PlantDetailProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlantDetail({ plant, isOpen, onClose }: PlantDetailProps) {
  if (!plant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{plant.name}</DialogTitle>
          <DialogDescription className="italic text-base">
            {plant.scientificName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div>
            <h3 className="font-semibold mb-2">About This Plant</h3>
            <p className="text-muted-foreground">{plant.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {plant.difficulty} Level
            </Badge>
            <Badge variant="outline" className="capitalize">
              {plant.size} Size
            </Badge>
            {plant.petSafe ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Pet Safe
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <XCircle className="h-3 w-3 mr-1" />
                Not Pet Safe
              </Badge>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Benefits</h3>
            <ul className="space-y-2">
              {plant.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Care Instructions</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="rounded-full bg-blue-100 p-2 h-fit">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Watering</h4>
                  <p className="text-sm text-muted-foreground">{plant.careInstructions.watering}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-yellow-100 p-2 h-fit">
                  <Sun className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Light</h4>
                  <p className="text-sm text-muted-foreground">{plant.careInstructions.light}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-cyan-100 p-2 h-fit">
                  <Cloud className="h-5 w-5 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Humidity</h4>
                  <p className="text-sm text-muted-foreground">{plant.careInstructions.humidity}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-orange-100 p-2 h-fit">
                  <Thermometer className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Temperature</h4>
                  <p className="text-sm text-muted-foreground">{plant.careInstructions.temperature}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
