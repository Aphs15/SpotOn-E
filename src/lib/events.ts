
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
    date: new Date(new Date().getFullYear() + 1, 2, 21, 19, 0, 0),
    location: 'CTICC',
    description:
      'The Cape Town International Jazz Festival is the largest music event in sub-Saharan Africa. The festival is annually held in Cape Town, South Africa at the Cape Town International Convention Centre.',
    image: 'https://www.carnifest.com/wp-content/uploads/2020/02/cape_town_international_jazz_festival-Photo-www.capetownjazzfest.com_.jpg',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '2',
    name: 'Soweto Derby: Kaizer Chiefs vs Orlando Pirates',
    city: 'Soweto',
    category: 'Sports',
    date: new Date(new Date().getFullYear() + 1, 4, 10, 15, 30, 0),
    location: 'FNB Stadium',
    description:
      "Experience the thrill of South Africa's most iconic football match. The Soweto Derby is a rivalry between two of the country's most successful clubs.",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzJA4t9Af-BuM7xAtxCk5WTY3MZp3nZohf6WGgD0whLw6XpVqollz8P3LcVZlRcPljY8U&usqp=CAU',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '3',
    name: 'The Lion King',
    city: 'Johannesburg',
    category: 'Theatre',
    date: new Date(new Date().getFullYear() + 1, 5, 15, 20, 0, 0),
    location: 'The Teatro at Montecasino',
    description:
      "Disney's spectacular musical, The Lion King, returns to Johannesburg. A dazzling production with glorious colours, stunning effects and enchanting music.",
    image: 'https://content.webtickets.co.za/artscape/panel_Web%20_20241209_210621.jpg',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '4',
    name: 'Gugs Unplugged Sessions',
    city: 'Cape Town',
    category: 'Township Gigs',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15, 18, 0, 0),
    location: 'Guga S’thebe, Langa',
    description:
      'An intimate acoustic music session featuring local artists from Gugulethu and surrounding areas. A true taste of local talent and culture.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUeWloeZVm6Pl7CYjX3ktJV3xQgSqbr0RSjzMZhN4o9GcKVN4OMmXF3m31-DzqYSOljU&usqp=CAU',
    bookingLink: 'https://www.ozow.com',
  },
  {
    id: '5',
    name: 'Durban July Handicap',
    city: 'Durban',
    category: 'Sports',
    date: new Date(new Date().getFullYear() + 1, 6, 5, 11, 0, 0),
    location: 'Greyville Racecourse',
    description:
      "Africa's greatest horse racing event. A day of fashion, entertainment, and thrilling thoroughbred racing.",
    image: 'https://i.ytimg.com/vi/pl6BFuKofFI/maxresdefault.jpg',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '6',
    name: 'Rocking the Daisies',
    city: 'Cape Town',
    category: 'Music',
    date: new Date(new Date().getFullYear() + 1, 9, 3, 12, 0, 0),
    location: 'Cloof Wine Estate, Darling',
    description:
      "South Africa's biggest outdoor music festival. A weekend of top international and local music acts, art, and camping.",
    image: 'https://images.quicket.co.za/0582364_0.jpeg',
    bookingLink: 'https://www.quicket.co.za',
  },
   {
    id: '7',
    name: 'The Fugard Theatre Tribute',
    city: 'Cape Town',
    category: 'Theatre',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 5, 19, 30, 0),
    location: 'Artscape Theatre Centre',
    description:
      'A special tribute performance celebrating the legacy of the iconic Fugard Theatre, featuring excerpts from its most beloved productions.',
    image: 'https://static1.squarespace.com/static/595003098419c2c56722b521/t/609c3f2e8bf2d71a3c54c88d/1620852530668/61e9Q7YQIAL._AC_UL600_SR381%252C600_.jpg',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '9',
    name: 'Bloemfontein Rose Festival',
    city: 'Bloemfontein',
    category: 'Music',
    date: new Date(new Date().getFullYear() + 1, 9, 17, 10, 0, 0),
    location: 'Loch Logan Waterfront',
    description: 'Celebrate the City of Roses with a festival of music, food, and flowers.',
    image: 'https://mangaungrosefestival.co.za/wp-content/uploads/2019/04/or_20171020113139150.jpeg',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '10',
    name: 'Jacaranda Music Festival',
    city: 'Pretoria',
    category: 'Music',
    date: new Date(new Date().getFullYear() + 1, 9, 4, 12, 0, 0),
    location: 'Loftus Versfeld Stadium',
    description: 'A massive music festival featuring top South African artists under the purple jacaranda trees.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcUzZvbZ7zHrPTR0p-6m8Dg313Sh6gorf5QMAEEArIu-_wMcI3nX9H3qnfat4OEGuixcE&usqp=CAU',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '11',
    name: 'Art in the Park',
    city: 'Pietermaritzburg',
    category: 'Theatre',
    date: new Date(new Date().getFullYear() + 1, 3, 25, 9, 0, 0),
    location: 'KwaZulu-Natal National Botanical Garden',
    description: 'One of the largest outdoor art exhibitions in the country.',
    image: 'https://images.quicket.co.za/0565067_0.jpeg',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '12',
    name: 'The Iron Man African Championship',
    city: 'Port Elizabeth',
    category: 'Sports',
    date: new Date(new Date().getFullYear() + 1, 3, 6, 7, 0, 0),
    location: 'Hobie Beach',
    description: 'Watch athletes compete in this grueling triathlon.',
    image: 'https://proseries.ironman.com/sites/default/files/styles/coh_x_large/public/2024-12/IM22_IRONMAN_African_Championship_Logo_Isuzu_2023_Pos.png?itok=AK-gp-Sw',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '13',
    name: 'East London Beach Festival',
    city: 'East London',
    category: 'Music',
    date: new Date(new Date().getFullYear(), 11, 20, 11, 0, 0),
    location: 'Eastern Beach',
    description: 'A summer festival with live music, beach sports, and family fun.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD74atXPCDclsOKUU505zwR4qGjRglYyUDlmdbD6nE30hekb_MJ4CSOZlmZ7EKSQSTTI0&usqp=CAU',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '14',
    name: 'Kimberley Diamond Cup',
    city: 'Kimberley',
    category: 'Sports',
    date: new Date(new Date().getFullYear() + 1, 8, 27, 10, 0, 0),
    location: 'Kumba Skate Plaza',
    description: 'An international skateboarding competition attracting pros from around the world.',
    image: 'https://oscar.ofm.co.za//media/1/1/10/22/3b50081a-4e5b-44f8-9176-b88c3eb94fa9.jpg',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '15',
    name: 'Innibos Kunstefees',
    city: 'Mbombela',
    category: 'Music',
    date: new Date(new Date().getFullYear() + 1, 5, 25, 9, 0, 0),
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
    date: new Date(new Date().getFullYear(), 11, 7, 12, 0, 0),
    location: 'Polokwane Cricket Club',
    description: 'A cultural festival celebrating the heritage of Limpopo with music, dance, and poetry.',
    image: 'https://computicket-boxoffice-media.s3.af-south-1.amazonaws.com/media-library/22132/conversions/3I04hXiRPiaKNTTYjEo0tRQO5C9MkA-metaZDMwYmNlOWQtY2E3Yy00MzVmLWE0MmQtNWZjOWMxNzliZDc1LkpQRw%3D%3D--detail.jpg',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '17',
    name: 'Mahika Mahikeng Cultural Festival',
    city: 'Mahikeng',
    category: 'Music',
    date: new Date(new Date().getFullYear(), 11, 13, 14, 0, 0),
    location: 'Mmabatho Stadium',
    description: 'A multi-disciplinary arts festival showcasing the best of the North West province.',
    image: 'https://computicket-boxoffice-media.s3.af-south-1.amazonaws.com/media-library/38999/conversions/Cwc0rZu6otNPfLVAPVVUwSBGSaplNd-metaQ29tcHV0aWNrZXQgQmFubmVyIFlvdXRoLnBuZw%3D%3D--detail.jpg',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '18',
    name: 'Newcastle Winter Festival',
    city: 'Newcastle',
    category: 'Music',
    date: new Date(new Date().getFullYear() + 1, 4, 1, 10, 0, 0),
    location: 'Show Grounds',
    description: 'An annual family-friendly festival with live music, rides, and exhibitions.',
    image: 'https://winterfestival.co.za/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-27-at-21.40.38_7def4691-1024x577.jpg',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '19',
    name: 'AfricaCom',
    city: 'Cape Town',
    category: 'Conventions',
    date: new Date(new Date().getFullYear(), 10, 12, 9, 0, 0),
    location: 'CTICC',
    description: 'The largest African telecommunications, media, and technology event.',
    image: 'https://www.cerillion.com/media/w1fgiemg/africacom2023.png',
    bookingLink: 'https://www.quicket.co.za',
  },
  {
    id: '20',
    name: 'Cape Town Cycle Tour',
    city: 'Cape Town',
    category: 'Charity',
    date: new Date(new Date().getFullYear() + 1, 2, 9, 6, 0, 0),
    location: 'Grand Parade',
    description: "The world's largest timed cycling event, raising money for various charities.",
    image: 'https://www.capetourism.com/wp-content/uploads/2024/02/Cape-Argus.jpg',
    bookingLink: 'https://www.computicket.com',
  },
  {
    id: '21',
    name: 'Comrades Marathon',
    city: 'Durban',
    category: 'Competitions',
    date: new Date(new Date().getFullYear() + 1, 5, 8, 5, 30, 0),
    location: 'Durban to Pietermaritzburg',
    description: 'The ultimate human race, a grueling ultramarathon between Durban and Pietermaritzburg.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNwECbQkXbCmsej4-YEJ5fHUyEVfcqS167w&s',
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
