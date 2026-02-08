import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { UserPreferences } from '../types/plant';
import { Leaf, Droplets, GraduationCap, Maximize2, PawPrint } from 'lucide-react';

interface QuestionnaireProps {
  onComplete: (preferences: UserPreferences) => void;
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({});

  const questions = [
    {
      id: 'light',
      title: 'How much light does your space get?',
      description: 'Consider the natural light in the area where you plan to place your plant',
      icon: Leaf,
      options: [
        { value: 'low', label: 'Low Light', description: 'Minimal natural light, north-facing window, or interior rooms' },
        { value: 'medium', label: 'Medium Light', description: 'Indirect light, east or west-facing window' },
        { value: 'bright', label: 'Bright Light', description: 'Lots of indirect light or some direct sun, south-facing window' }
      ]
    },
    {
      id: 'water',
      title: 'How often can you water?',
      description: 'Be honest about your schedule and availability',
      icon: Droplets,
      options: [
        { value: 'low', label: 'Rarely', description: 'Every 2-3 weeks or less' },
        { value: 'medium', label: 'Regularly', description: 'About once a week' },
        { value: 'high', label: 'Frequently', description: 'Multiple times per week' }
      ]
    },
    {
      id: 'experience',
      title: "What's your plant care experience?",
      description: 'Choose the level that best describes your comfort with houseplants',
      icon: GraduationCap,
      options: [
        { value: 'beginner', label: 'Beginner', description: 'New to houseplants or want something easy' },
        { value: 'intermediate', label: 'Intermediate', description: 'Some experience with basic plant care' },
        { value: 'advanced', label: 'Advanced', description: 'Experienced and ready for a challenge' }
      ]
    },
    {
      id: 'size',
      title: 'How much space do you have?',
      description: 'Consider the area available for your new plant',
      icon: Maximize2,
      options: [
        { value: 'small', label: 'Small', description: 'Desk, shelf, or windowsill' },
        { value: 'medium', label: 'Medium', description: 'Table, stand, or small floor space' },
        { value: 'large', label: 'Large', description: 'Floor space for a statement plant' }
      ]
    },
    {
      id: 'petSafe',
      title: 'Do you have pets?',
      description: 'Some plants can be toxic to cats and dogs',
      icon: PawPrint,
      options: [
        { value: 'true', label: 'Yes, I have pets', description: 'Show me only pet-safe plants' },
        { value: 'false', label: 'No pets', description: 'Show me all plants' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion.icon;

  const handleSelect = (value: string) => {
    const updatedPreferences = {
      ...preferences,
      [currentQuestion.id]: currentQuestion.id === 'petSafe' ? value === 'true' : value
    };
    setPreferences(updatedPreferences);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(updatedPreferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <Icon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <CardTitle>{currentQuestion.title}</CardTitle>
        <CardDescription>{currentQuestion.description}</CardDescription>
        <div className="flex justify-center gap-2 mt-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-green-600'
                  : index < currentStep
                  ? 'w-2 bg-green-400'
                  : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={handleSelect} value={preferences[currentQuestion.id as keyof UserPreferences]?.toString()}>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSelect(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="cursor-pointer">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>

        {currentStep > 0 && (
          <div className="mt-6">
            <Button variant="outline" onClick={handleBack} className="w-full">
              Back
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
