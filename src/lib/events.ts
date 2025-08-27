
import type { LucideIcon } from 'lucide-react';
import { Drama, Dribbble, Music, Users, Briefcase, Heart, Trophy } from 'lucide-react';

export type EventCategory = 'Music' | 'Sports' | 'Theatre' | 'Township Gigs' | 'Conventions' | 'Charity' | 'Competitions';

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
  Sports: Dribbble,
  Theatre: Drama,
  'Township Gigs': Users,
  Conventions: Briefcase,
  Charity: Heart,
  Competitions: Trophy,
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
    image: 'https://picsum.photos/600/400?random=1',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '2',
    name: 'Soweto Derby: Kaizer Chiefs vs Orlando Pirates',
    city: 'Soweto',
    category: 'Sports',
    date: new Date('2024-11-09T15:30:00'),
    location: 'FNB Stadium',
    description:
      "Experience the thrill of South Africa's most iconic football match. The Soweto Derby is a rivalry between two of the country's most successful clubs.",
    image: 'https://picsum.photos/600/400?random=2',
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
    image: 'https://picsum.photos/600/400?random=3',
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
    image: 'https://picsum.photos/600/400?random=4',
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
    image: 'https://picsum.photos/600/400?random=5',
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
    image: 'https://picsum.photos/600/400?random=6',
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
    image: 'https://picsum.photos/600/400?random=7',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '9',
    name: 'Bloemfontein Rose Festival',
    city: 'Bloemfontein',
    category: 'Music',
    date: new Date('2024-10-18T10:00:00'),
    location: 'Loch Logan Waterfront',
    description: 'Celebrate the City of Roses with a festival of music, food, and flowers.',
    image: 'https://picsum.photos/600/400?random=9',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '10',
    name: 'Jacaranda Music Festival',
    city: 'Pretoria',
    category: 'Music',
    date: new Date('2024-10-05T12:00:00'),
    location: 'Loftus Versfeld Stadium',
    description: 'A massive music festival featuring top South African artists under the purple jacaranda trees.',
    image: 'https://picsum.photos/600/400?random=10',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '11',
    name: 'Art in the Park',
    city: 'Pietermaritzburg',
    category: 'Theatre',
    date: new Date('2025-04-25T09:00:00'),
    location: 'KwaZulu-Natal National Botanical Garden',
    description: 'One of the largest outdoor art exhibitions in the country.',
    image: 'https://picsum.photos/600/400?random=11',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '12',
    name: 'The Iron Man African Championship',
    city: 'Port Elizabeth',
    category: 'Sports',
    date: new Date('2025-04-02T07:00:00'),
    location: 'Hobie Beach',
    description: 'Watch athletes compete in this grueling triathlon.',
    image: 'https://picsum.photos/600/400?random=12',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '13',
    name: 'East London Beach Festival',
    city: 'East London',
    category: 'Music',
    date: new Date('2024-12-16T11:00:00'),
    location: 'Eastern Beach',
    description: 'A summer festival with live music, beach sports, and family fun.',
    image: 'https://picsum.photos/600/400?random=13',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '14',
    name: 'Kimberley Diamond Cup',
    city: 'Kimberley',
    category: 'Sports',
    date: new Date('2024-09-28T10:00:00'),
    location: 'Kumba Skate Plaza',
    description: 'An international skateboarding competition attracting pros from around the world.',
    image: 'https://picsum.photos/600/400?random=14',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '15',
    name: 'Innibos Kunstefees',
    city: 'Mbombela',
    category: 'Music',
    date: new Date('2025-06-25T09:00:00'),
    location: 'Mbombela Stadium',
    description: 'One of the biggest arts festivals in South Africa, featuring music, theatre, and visual arts.',
    image: 'https://picsum.photos/600/400?random=15',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '16',
    name: 'Mapungubwe Arts Festival',
    city: 'Polokwane',
    category: 'Music',
    date: new Date('2024-12-07T12:00:00'),
    location: 'Polokwane Cricket Club',
    description: 'A cultural festival celebrating the heritage of Limpopo with music, dance, and poetry.',
    image: 'https://picsum.photos/600/400?random=16',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '17',
    name: 'Mahika Mahikeng Cultural Festival',
    city: 'Mahikeng',
    category: 'Music',
    date: new Date('2024-12-13T14:00:00'),
    location: 'Mmabatho Stadium',
    description: 'A multi-disciplinary arts festival showcasing the best of the North West province.',
    image: 'https://picsum.photos/600/400?random=17',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '18',
    name: 'Newcastle Winter Festival',
    city: 'Newcastle',
    category: 'Music',
    date: new Date('2025-05-01T10:00:00'),
    location: 'Show Grounds',
    description: 'An annual family-friendly festival with live music, rides, and exhibitions.',
    image: 'https://picsum.photos/600/400?random=18',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '19',
    name: 'AfricaCom',
    city: 'Cape Town',
    category: 'Conventions',
    date: new Date('2024-11-12T09:00:00'),
    location: 'CTICC',
    description: 'The largest African telecommunications, media, and technology event.',
    image: 'https://picsum.photos/600/400?random=19',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '20',
    name: 'Cape Town Cycle Tour',
    city: 'Cape Town',
    category: 'Charity',
    date: new Date('2025-03-09T06:00:00'),
    location: 'Grand Parade',
    description: 'The world\'s largest timed cycling event, raising money for various charities.',
    image: 'https://picsum.photos/600/400?random=20',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '21',
    name: 'Comrades Marathon',
    city: 'Durban',
    category: 'Competitions',
    date: new Date('2025-06-08T05:30:00'),
    location: 'Durban to Pietermaritzburg',
    description: 'The ultimate human race, a grueling ultramarathon between Durban and Pietermaritzburg.',
    image: 'https://picsum.photos/600/400?random=21',
    bookingLink: 'https://www.quicket.co.za',
  }
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
