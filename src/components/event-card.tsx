import type { Event } from '@/lib/events';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { categoryIcons } from '@/lib/events';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const CategoryIcon = categoryIcons[event.category];

  return (
    <Link href={`/events/${event.id}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <div className="aspect-[16/10] overflow-hidden">
            <Image
              src={event.image}
              alt={event.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={`${event.category.toLowerCase()} event`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">
            <CategoryIcon className="mr-1 h-3 w-3" />
            {event.category}
          </Badge>
          <h3 className="text-lg font-bold font-headline leading-tight">
            {event.name}
          </h3>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex flex-col items-start gap-1">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.city}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
