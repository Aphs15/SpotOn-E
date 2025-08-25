'use client';

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
import { Calendar, Heart, MapPin } from 'lucide-react';
import { useSavedEvents } from '@/hooks/use-saved-events';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const CategoryIcon = categoryIcons[event.category];
  const { isEventSaved, toggleSaveEvent } = useSavedEvents();
  
  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    toggleSaveEvent(event);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 border-transparent bg-secondary group">
      <Link href={`/events/${event.id}`} className="block">
        <CardHeader className="p-0 relative">
          <div className="aspect-[16/10] overflow-hidden rounded-t-lg">
            <Image
              src={event.image}
              alt={event.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              data-ai-hint={`${event.category.toLowerCase()} event`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="outline" className="mb-2 font-semibold text-primary border-primary/50">
            <CategoryIcon className="mr-1.5 h-3 w-3" />
            {event.category}
          </Badge>
          <h3 className="text-lg font-bold font-headline leading-tight text-card-foreground">
            {event.name}
          </h3>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex flex-col items-start gap-1.5">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{event.date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.city}</span>
          </div>
        </CardFooter>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 rounded-full h-9 w-9 bg-background/70 hover:bg-background backdrop-blur-sm transition-all scale-100 group-hover:scale-110"
        onClick={handleSaveClick}
        aria-label={isEventSaved(event.id) ? 'Unsave event' : 'Save event'}
      >
        <Heart className={cn("h-5 w-5 transition-colors", isEventSaved(event.id) ? 'fill-red-500 text-red-500' : 'text-primary/80 hover:text-primary')} />
      </Button>
    </Card>
  );
}
