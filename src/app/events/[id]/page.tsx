import { getEventById } from '@/lib/events';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import EventActions from '@/components/event-actions';
import { Badge } from '@/components/ui/badge';
import { categoryIcons } from '@/lib/events';
import EventMap from '@/components/event-map';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const CategoryIcon = categoryIcons[event.category];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={event.image}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint={`${event.category.toLowerCase()} event`}
          />
        </div>
        <div className="p-6 md:p-8">
          <Badge variant="secondary" className="mb-2">
            <CategoryIcon className="mr-1 h-3 w-3" />
            {event.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">
            {event.name}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                {event.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                at {event.date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}, {event.city}</span>
            </div>
          </div>
          <p className="text-base md:text-lg leading-relaxed mb-8">
            {event.description}
          </p>

          <div className="my-8">
             <h2 className="text-2xl font-bold font-headline text-primary mb-4">Location</h2>
             <EventMap location={`${event.location}, ${event.city}`} />
           </div>

          <EventActions event={event} />
        </div>
      </div>
    </div>
  );
}
