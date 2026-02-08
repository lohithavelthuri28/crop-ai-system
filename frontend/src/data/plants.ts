import { Plant } from '../types/plant';

export const plantsDatabase: Plant[] = [
  {
    id: '1',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    description: 'A resilient and low-maintenance plant perfect for beginners. Known for its air-purifying qualities and ability to thrive on neglect.',
    imageUrl: 'https://images.unsplash.com/photo-1668426231244-1827c29ef8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBzbmFrZSUyMHBsYW50JTIwaW5kb29yfGVufDF8fHx8MTc3MDUzMDc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'low',
    water: 'low',
    difficulty: 'beginner',
    size: 'medium',
    petSafe: false,
    benefits: ['Air purifying', 'Low maintenance', 'Drought tolerant'],
    careInstructions: {
      watering: 'Water every 2-3 weeks, allowing soil to dry completely between waterings',
      light: 'Tolerates low light but prefers indirect bright light',
      humidity: 'Average home humidity is fine',
      temperature: '60-85°F (15-29°C)'
    }
  },
  {
    id: '2',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    description: 'A stunning tropical plant with iconic split leaves. Makes a bold statement and grows vigorously with proper care.',
    imageUrl: 'https://images.unsplash.com/photo-1653404809389-f370ea4310dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMGRlbGljaW9zYSUyMHBsYW50fGVufDF8fHx8MTc3MDUwNzcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'medium',
    water: 'medium',
    difficulty: 'intermediate',
    size: 'large',
    petSafe: false,
    benefits: ['Aesthetic appeal', 'Fast growing', 'Air purifying'],
    careInstructions: {
      watering: 'Water when top 2 inches of soil are dry, typically once a week',
      light: 'Bright, indirect light. Avoid direct sunlight',
      humidity: 'Prefers 60% or higher humidity',
      temperature: '65-85°F (18-29°C)'
    }
  },
  {
    id: '3',
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    description: 'One of the easiest houseplants to grow. Features heart-shaped leaves with golden variegation and trailing vines.',
    imageUrl: 'https://images.unsplash.com/photo-1696457848618-876c47b30cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBnb2xkZW4lMjBwbGFudHxlbnwxfHx8fDE3NzA1MzA3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'low',
    water: 'medium',
    difficulty: 'beginner',
    size: 'medium',
    petSafe: false,
    benefits: ['Air purifying', 'Easy to propagate', 'Versatile placement'],
    careInstructions: {
      watering: 'Water when top inch of soil is dry, about once a week',
      light: 'Tolerates low to bright indirect light',
      humidity: 'Average home humidity is sufficient',
      temperature: '65-85°F (18-29°C)'
    }
  },
  {
    id: '4',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    description: 'A classic houseplant with arching leaves and baby plantlets. Extremely forgiving and great for hanging baskets.',
    imageUrl: 'https://images.unsplash.com/photo-1763038922944-c6199c299f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBwbGFudCUyMGhhbmdpbmd8ZW58MXx8fHwxNzcwNTMwNzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'medium',
    water: 'medium',
    difficulty: 'beginner',
    size: 'small',
    petSafe: true,
    benefits: ['Pet safe', 'Air purifying', 'Easy to propagate'],
    careInstructions: {
      watering: 'Water regularly, keeping soil lightly moist but not soggy',
      light: 'Bright, indirect light for best growth',
      humidity: 'Prefers moderate humidity but adapts well',
      temperature: '60-75°F (15-24°C)'
    }
  },
  {
    id: '5',
    name: 'Succulent Varieties',
    scientificName: 'Various species',
    description: 'A collection of drought-tolerant plants with thick, fleshy leaves. Perfect for sunny windowsills and minimal care.',
    imageUrl: 'https://images.unsplash.com/photo-1761502583547-0de6676a06a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBjb2xsZWN0aW9uJTIwaW5kb29yfGVufDF8fHx8MTc3MDUzMDc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'bright',
    water: 'low',
    difficulty: 'beginner',
    size: 'small',
    petSafe: true,
    benefits: ['Low water needs', 'Compact size', 'Variety of shapes'],
    careInstructions: {
      watering: 'Water sparingly, every 2-3 weeks. Overwatering is the main cause of death',
      light: 'Bright, direct sunlight for several hours daily',
      humidity: 'Low humidity preferred',
      temperature: '60-80°F (15-27°C)'
    }
  },
  {
    id: '6',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    description: 'Elegant plant with glossy leaves and white flowers. Excellent at removing toxins from the air.',
    imageUrl: 'https://images.unsplash.com/photo-1701835427833-fc45547b8cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZSUyMGxpbHklMjBmbG93ZXIlMjB3aGl0ZXxlbnwxfHx8fDE3NzA1MzA3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'low',
    water: 'medium',
    difficulty: 'beginner',
    size: 'medium',
    petSafe: false,
    benefits: ['Air purifying', 'Flowers indoors', 'Low light tolerant'],
    careInstructions: {
      watering: 'Water when top inch is dry. Leaves will droop when thirsty',
      light: 'Low to medium indirect light',
      humidity: 'Prefers higher humidity, mist occasionally',
      temperature: '65-85°F (18-29°C)'
    }
  },
  {
    id: '7',
    name: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    description: 'A bold plant with large, glossy leaves. Can grow into an impressive indoor tree with proper care.',
    imageUrl: 'https://images.unsplash.com/photo-1623032693199-e9abd35e0a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydWJiZXIlMjBwbGFudCUyMGZpY3VzfGVufDF8fHx8MTc3MDQ2NzMwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'bright',
    water: 'medium',
    difficulty: 'intermediate',
    size: 'large',
    petSafe: false,
    benefits: ['Air purifying', 'Statement piece', 'Grows tall'],
    careInstructions: {
      watering: 'Water when top 2 inches of soil are dry',
      light: 'Bright, indirect light. Some direct morning sun is okay',
      humidity: 'Moderate humidity, wipe leaves occasionally',
      temperature: '60-75°F (15-24°C)'
    }
  },
  {
    id: '8',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    description: 'Nearly indestructible plant with glossy, waxy leaves. Perfect for offices and low-light spaces.',
    imageUrl: 'https://images.unsplash.com/photo-1547414924-b71ebb598495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6eiUyMHBsYW50JTIwemFtaW9jdWxjYXN8ZW58MXx8fHwxNzcwNDY3MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'low',
    water: 'low',
    difficulty: 'beginner',
    size: 'medium',
    petSafe: false,
    benefits: ['Extremely low maintenance', 'Drought tolerant', 'Air purifying'],
    careInstructions: {
      watering: 'Water every 2-3 weeks, less in winter',
      light: 'Tolerates very low light to bright indirect light',
      humidity: 'Average home humidity is fine',
      temperature: '60-75°F (15-24°C)'
    }
  },
  {
    id: '9',
    name: 'Boston Fern',
    scientificName: 'Nephrolepis exaltata',
    description: 'A lush, feathery fern that adds a soft texture to any space. Loves humidity and regular watering.',
    imageUrl: 'https://images.unsplash.com/photo-1625259527735-1e273e7d43eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3N0b24lMjBmZXJuJTIwaGFuZ2luZ3xlbnwxfHx8fDE3NzA0NjczMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'medium',
    water: 'high',
    difficulty: 'intermediate',
    size: 'medium',
    petSafe: true,
    benefits: ['Pet safe', 'Humidity loving', 'Beautiful texture'],
    careInstructions: {
      watering: 'Keep soil consistently moist, water frequently',
      light: 'Bright, indirect light. Avoid direct sun',
      humidity: 'High humidity required. Mist daily or use humidifier',
      temperature: '60-75°F (15-24°C)'
    }
  },
  {
    id: '10',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    description: 'A medicinal succulent with healing gel inside its leaves. Easy to care for and useful for minor burns.',
    imageUrl: 'https://images.unsplash.com/photo-1643717101835-ea24088aef16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHN1Y2N1bGVudHxlbnwxfHx8fDE3NzA1MzA3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'bright',
    water: 'low',
    difficulty: 'beginner',
    size: 'small',
    petSafe: false,
    benefits: ['Medicinal properties', 'Low maintenance', 'Easy to propagate'],
    careInstructions: {
      watering: 'Water deeply but infrequently, every 2-3 weeks',
      light: 'Bright, indirect to direct sunlight',
      humidity: 'Low humidity preferred',
      temperature: '55-80°F (13-27°C)'
    }
  },
  {
    id: '11',
    name: 'Chinese Money Plant',
    scientificName: 'Pilea peperomioides',
    description: 'Trendy plant with round, coin-like leaves. Easy to care for and propagate, making it great for sharing.',
    imageUrl: 'https://images.unsplash.com/photo-1714674119508-6676b71d3bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwbW9uZXklMjBwbGFudCUyMHBpbGVhfGVufDF8fHx8MTc3MDUzMDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'medium',
    water: 'medium',
    difficulty: 'beginner',
    size: 'small',
    petSafe: true,
    benefits: ['Pet safe', 'Unique appearance', 'Easy to propagate'],
    careInstructions: {
      watering: 'Water when top inch of soil is dry, about once a week',
      light: 'Bright, indirect light. Rotate regularly for even growth',
      humidity: 'Average home humidity is fine',
      temperature: '60-75°F (15-24°C)'
    }
  },
  {
    id: '12',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    description: 'A dramatic statement plant with large, violin-shaped leaves. Requires consistent care but rewards with impressive growth.',
    imageUrl: 'https://images.unsplash.com/photo-1673297352939-e308a901b5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3NzA0NDIwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    light: 'bright',
    water: 'medium',
    difficulty: 'advanced',
    size: 'large',
    petSafe: false,
    benefits: ['Statement piece', 'Architectural beauty', 'Air purifying'],
    careInstructions: {
      watering: 'Water when top 2 inches are dry. Consistent schedule is key',
      light: 'Bright, indirect light. Avoid moving frequently',
      humidity: 'Moderate humidity. Wipe leaves to keep clean',
      temperature: '65-75°F (18-24°C), avoid drafts'
    }
  }
];
