
import { getEventById } from '@/lib/events';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import EventActions from '@/components/event-actions';
import { Badge } from '@/components/ui/badge';
import { categoryIcons } from '@/lib/events';
import EventMap from '@/components/event-map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const CategoryIcon = categoryIcons[event.category];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="animate-fade-in-up">
        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 mb-8">
          <Image
            src={event.image}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint={`${event.category.toLowerCase()} event`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-8 md-left-8 text-white">
              <Badge variant="secondary" className="mb-2 bg-white/20 text-white backdrop-blur-md border-0">
                <CategoryIcon className="mr-1 h-3 w-3" />
                {event.category}
              </Badge>
            <h1 className="text-3xl md:text-5xl font-bold font-headline">
              {event.name}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              <Card className="animate-fade-in-up animation-delay-200">
                <CardContent className="p-6 flex flex-wrap gap-x-6 gap-y-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
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
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span>{event.location}, {event.city}</span>
                  </div>
                </CardContent>
              </Card>

            <Card className="animate-fade-in-up animation-delay-400">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline text-primary">About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                      {event.description}
                  </p>
                </CardContent>
            </Card>

            <Card className="animate-fade-in-up animation-delay-400">
                <CardHeader>
                   <CardTitle className="text-2xl font-bold font-headline text-primary">Location</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="rounded-lg overflow-hidden border">
                     <EventMap location={`${event.location}, ${event.city}`} />
                   </div>
                </CardContent>
            </Card>

          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 animate-fade-in-up animation-delay-400">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold font-headline text-primary">Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <EventActions event={event} />
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
