import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '@/components/event-card';
import { getEvents } from '@/lib/events';
import type { Event } from '@/lib/events';

export default async function SavedEventsPage() {
  // In a real application, this would fetch events saved by the logged-in user.
  // For now, we'll show a sample of all events.
  const allEvents: Event[] = await getEvents();
  const savedEvents = allEvents.slice(0, 3); // Simulate having 3 saved events

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Your Saved Events</CardTitle>
          <CardDescription>
            Here are the events you've saved for later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">You have no saved events.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse events and save them to see them here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
