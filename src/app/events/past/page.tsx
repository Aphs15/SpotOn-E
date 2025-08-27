import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '@/components/event-card';
import { getEvents } from '@/lib/events';
import type { Event } from '@/lib/events';
import { History } from 'lucide-react';

export default async function PastEventsPage() {
  const allEvents = await getEvents();
  const pastEvents = allEvents
    .filter(event => event.date < new Date())
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by most recent first

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <History className="mr-3 text-primary" />
            Past Events
          </CardTitle>
          <CardDescription>
            A look back at the amazing events that have already taken place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pastEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No past events to show yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Check back later to see an archive of completed events.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
