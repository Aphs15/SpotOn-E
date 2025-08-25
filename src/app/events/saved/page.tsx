'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '@/components/event-card';
import { getEvents } from '@/lib/events';
import type { Event } from '@/lib/events';
import { useSavedEvents } from '@/hooks/use-saved-events';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function SavedEventsPage() {
  const { savedEventIds } = useSavedEvents();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const events = await getEvents();
      setAllEvents(events);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  const savedEvents = allEvents.filter(event => savedEventIds.includes(event.id));

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
          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="space-y-2">
                   <Skeleton className="h-[200px] w-full" />
                   <Skeleton className="h-6 w-3/4" />
                   <Skeleton className="h-4 w-1/2" />
                 </div>
               ))}
             </div>
          ) : savedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">You have no saved events.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse events and click the heart icon to save them here.
              </p>
               <Button asChild className="mt-4">
                <Link href="/">Browse Events</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
