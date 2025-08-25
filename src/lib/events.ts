import type { LucideIcon } from 'lucide-react';
import { Drama, Futbol, Music, Users } from 'lucide-react';

export type EventCategory = 'Music' | 'Sports' | 'Theatre' | 'Township Gigs';

export interface Event {
  id: string;
  name: string;
  city: string;
  category: EventCategory;
  date: Date;
  location: string;
  description: string;
  image: string;
  bookingLink: string;
}

export const categoryIcons: Record<EventCategory, LucideIcon> = {
  Music: Music,
  Sports: Futbol,
  Theatre: Drama,
  'Township Gigs': Users,
};

const events: Event[] = [
  {
    id: '1',
    name: 'Cape Town International Jazz Festival',
    city: 'Cape Town',
    category: 'Music',
    date: new Date('2024-10-26T19:00:00'),
    location: 'CTICC',
    description:
      'The Cape Town International Jazz Festival is the largest music event in sub-Saharan Africa. The festival is annually held in Cape Town, South Africa at the Cape Town International Convention Centre.',
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '2',
    name: 'Soweto Derby: Kaizer Chiefs vs Orlando Pirates',
    city: 'Johannesburg',
    category: 'Sports',
    date: new Date('2024-11-09T15:30:00'),
    location: 'FNB Stadium',
    description:
      "Experience the thrill of South Africa's most iconic football match. The Soweto Derby is a rivalry between two of the country's most successful clubs.",
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '3',
    name: 'The Lion King',
    city: 'Johannesburg',
    category: 'Theatre',
    date: new Date('2024-12-15T20:00:00'),
    location: 'The Teatro at Montecasino',
    description:
      "Disney's spectacular musical, The Lion King, returns to Johannesburg. A dazzling production with glorious colours, stunning effects and enchanting music.",
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '4',
    name: 'Gugs Unplugged Sessions',
    city: 'Cape Town',
    category: 'Township Gigs',
    date: new Date('2024-10-25T18:00:00'),
    location: 'Guga S’thebe, Langa',
    description:
      'An intimate acoustic music session featuring local artists from Gugulethu and surrounding areas. A true taste of local talent and culture.',
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.ozow.com',
  },
  {
    id: '5',
    name: 'Durban July Handicap',
    city: 'Durban',
    category: 'Sports',
    date: new Date('2025-07-05T11:00:00'),
    location: 'Greyville Racecourse',
    description:
      "Africa's greatest horse racing event. A day of fashion, entertainment, and thrilling thoroughbred racing.",
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '6',
    name: 'Rocking the Daisies',
    city: 'Cape Town',
    category: 'Music',
    date: new Date('2024-10-04T12:00:00'),
    location: 'Cloof Wine Estate, Darling',
    description:
      "South Africa's biggest outdoor music festival. A weekend of top international and local music acts, art, and camping.",
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.quicket.co.za',
  },
   {
    id: '7',
    name: 'The Fugard Theatre Tribute',
    city: 'Cape Town',
    category: 'Theatre',
    date: new Date('2024-11-22T19:30:00'),
    location: 'Artscape Theatre Centre',
    description:
      'A special tribute performance celebrating the legacy of the iconic Fugard Theatre, featuring excerpts from its most beloved productions.',
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '8',
    name: 'Vaal Meats & Beats Festival',
    city: 'Vereeniging',
    category: 'Township Gigs',
    date: new Date('2024-11-30T14:00:00'),
    location: 'Vaal Cricket Ground',
    description:
      'A vibrant celebration of food and music, featuring local DJs, live bands, and the best braai masters in the Vaal Triangle.',
    image: 'https://placehold.co/600x400.png',
    bookingLink: 'https://www.payfast.io',
  },
];

export const getEvents = async (): Promise<Event[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return events;
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
    // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return events.find(event => event.id === id);
};

export const getCities = async (): Promise<string[]> => {
    const cities = new Set(events.map(event => event.city));
    return Array.from(cities).sort();
}

export const getCategories = async (): Promise<string[]> => {
    return Array.from(Object.keys(categoryIcons)) as EventCategory[];
}
