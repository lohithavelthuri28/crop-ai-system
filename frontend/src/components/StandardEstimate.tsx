import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sprout, CloudRain, Sun, MapPin, Loader2, ArrowLeft, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import districtsData from '../data/districts.json';
import { soilNPKMap, seasonMap, waterAvailabilityMultiplier } from '../data/mappings';
import { PredictionResult } from '../types/crop';
import { ResultsCard } from './ResultsCard';

export function StandardEstimate() {
    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);

    const [formData, setFormData] = useState({
        state: 'Telangana',
        district: '',
        city: '', // Still kept as basic input, or could be merged with District
        waterAvailability: '',
        season: ''
    });

    const districts = districtsData.filter(d => d.state === formData.state);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Get District Data
            const selectedDistrict = districtsData.find(d => d.district === formData.district);
            if (!selectedDistrict) throw new Error("District not found");

            // 2. Get Soil Properties
            const soilProps = soilNPKMap[selectedDistrict.soil_type];

            // 3. Get Weather Data from Season
            const weather = seasonMap[formData.season];

            // 4. Calculate Rainfall
            // Base rainfall from district * Multiplier from Water Availability
            const baseRainfall = selectedDistrict.avg_rainfall;
            const multiplier = waterAvailabilityMultiplier[formData.waterAvailability];
            const calculatedRainfall = baseRainfall * multiplier;

            // 5. Construct Payload
            const payload = {
                N: soilProps.N,
                P: soilProps.P,
                K: soilProps.K,
                ph: soilProps.ph,
                state: formData.state,
                city: formData.city || formData.district, // Fallback to district if city empty
                temperature: weather.temperature,
                humidity: weather.humidity,
                rainfall: calculatedRainfall
            };

            // 6. Call API
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Prediction failed');

            const data = await response.json();

            const sortedCrops = Object.entries(data.probabilities as Record<string, number>)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([crop, prob]) => ({
                    crop,
                    confidence: Math.round(prob * 100)
                }));

            setPrediction({
                crop: data.crop,
                confidence: Math.round(data.probabilities[data.crop] * 100),
                temperature: data.temperature,
                humidity: data.humidity,
                rainfall: data.rainfall,
                probabilities: data.probabilities,
                topCrops: sortedCrops
            });

        } catch (error) {
            console.error("Error:", error);
            // Handle error UI if needed
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-6">
                <Button
                    asChild
                    variant="outline"
                    className="gap-2 hover:bg-green-50 hover:border-green-600 hover:text-green-600 transition-colors"
                >
                    <Link to="/estimate">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Soil Test Estimate
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow h-fit">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border-b dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                            <Sprout className="h-5 w-5 text-orange-600" />
                            <CardTitle>Standard Estimate</CardTitle>
                        </div>
                        <CardDescription>
                            Estimate based on location and season without soil test data
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Location Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-1.5">
                                        <MapPin className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Location</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>State</Label>
                                        <Input value="Telangana" disabled className="bg-muted" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="district">District</Label>
                                        <Select
                                            value={formData.district}
                                            onValueChange={(v) => setFormData({ ...formData, district: v })}
                                            required
                                        >
                                            <SelectTrigger id="district">
                                                <SelectValue placeholder="Select District" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {districts.map(d => (
                                                    <SelectItem key={d.district} value={d.district}>{d.district}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">City / Village</Label>
                                    <Input
                                        id="city"
                                        placeholder="Enter city or village name"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Environment Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1.5">
                                        <CloudRain className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Environmental Factors</h3>
                                </div>

                                <div className="space-y-2">
                                    <Label>Water Availability</Label>
                                    <Select
                                        value={formData.waterAvailability}
                                        onValueChange={(v) => setFormData({ ...formData, waterAvailability: v })}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Water Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">Low: Scant/Drought, Medium: Normal, High: Abundant/Irrigated</p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Season</Label>
                                    <Select
                                        value={formData.season}
                                        onValueChange={(v) => setFormData({ ...formData, season: v })}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Season" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Monsoon">Monsoon (Kharif)</SelectItem>
                                            <SelectItem value="Winter">Winter (Rabi)</SelectItem>
                                            <SelectItem value="Summer">Summer (Zaid)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white shadow-md hover:shadow-lg transition-all"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sun className="h-5 w-5 mr-2" />
                                        Get Standard Estimate
                                    </>
                                )}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <ResultsCard prediction={prediction} isLoading={isLoading} />
            </div>
        </div>
    );
}
