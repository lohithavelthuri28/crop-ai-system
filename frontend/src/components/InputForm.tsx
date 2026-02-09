import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CropInputData } from '../types/crop';
import { FlaskConical, Droplets, Wind, MapPin, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InputFormProps {
  onPredict: (data: CropInputData) => void;
  isLoading: boolean;
}

export function InputForm({ onPredict, isLoading }: InputFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CropInputData>({
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    soilPH: 6.5,
    state: '',
    city: ''
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.state && formData.city) {
      onPredict(formData);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-b dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-green-600" />
            <CardTitle>{t('inputForm.title')}</CardTitle>
          </div>
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
            <a href="/standard-estimate">{t('inputForm.standardEstimate')}</a>
          </Button>
        </div>
        <CardDescription>
          {t('inputForm.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Soil Nutrients Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1.5">
                <FlaskConical className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">{t('inputForm.soilNutrients')}</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nitrogen">
                {t('inputForm.nitrogen')}
                <span className="text-xs text-muted-foreground ml-2">{t('inputForm.nitrogenRec')}</span>
              </Label>
              <Input
                id="nitrogen"
                type="number"
                value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: Number(e.target.value) })}
                placeholder="e.g., 50"
                min="0"
                max="140"
                required
                className="border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-muted-foreground">{t('inputForm.nitrogenDesc')}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus">
                {t('inputForm.phosphorus')}
                <span className="text-xs text-muted-foreground ml-2">{t('inputForm.phosphorusRec')}</span>
              </Label>
              <Input
                id="phosphorus"
                type="number"
                value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: Number(e.target.value) })}
                placeholder="e.g., 30"
                min="0"
                max="145"
                required
                className="border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-muted-foreground">{t('inputForm.phosphorusDesc')}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium">
                {t('inputForm.potassium')}
                <span className="text-xs text-muted-foreground ml-2">{t('inputForm.potassiumRec')}</span>
              </Label>
              <Input
                id="potassium"
                type="number"
                value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: Number(e.target.value) })}
                placeholder="e.g., 40"
                min="0"
                max="205"
                required
                className="border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-muted-foreground">{t('inputForm.potassiumDesc')}</p>
            </div>
          </div>

          {/* Soil pH Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1.5">
                <Droplets className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">{t('inputForm.soilProperties')}</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilPH">
                {t('inputForm.phLevel')}
                <span className="text-xs text-muted-foreground ml-2">{t('inputForm.phRange')}</span>
              </Label>
              <Input
                id="soilPH"
                type="number"
                step="0.1"
                value={formData.soilPH}
                onChange={(e) => setFormData({ ...formData, soilPH: Number(e.target.value) })}
                placeholder="e.g., 6.5"
                min="3.5"
                max="9.5"
                required
                className="border-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-muted-foreground">{t('inputForm.phDesc')}</p>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-1.5">
                <MapPin className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">{t('inputForm.locationDetails')}</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">{t('inputForm.state')}</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({ ...formData, state: value })}
                required
              >
                <SelectTrigger id="state" className="border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder={t('inputForm.selectState')} />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{t('inputForm.stateDesc')}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t('inputForm.city')}</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t('inputForm.cityPlaceholder')}
                required
                className="border-purple-200 focus:border-purple-400"
              />
              <p className="text-xs text-muted-foreground">{t('inputForm.cityDesc')}</p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
            size="lg"
            disabled={isLoading || !formData.state || !formData.city}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                {t('inputForm.analyzing')}
              </>
            ) : (
              <>
                <Wind className="h-5 w-5 mr-2" />
                {t('inputForm.predictBtn')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
