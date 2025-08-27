
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '@/components/event-card';
import { getEvents } from '@/lib/events';
import type { Event } from '@/lib/events';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function CreatedEventsPage() {
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const events = await getEvents();
      // Simulate fetching events created by the current user
      setCreatedEvents(events.slice(0, 2));
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-headline">Your Created Events</CardTitle>
            <CardDescription>
              Here are the events you've created and are managing.
            </CardDescription>
          </div>
           <Button asChild>
                <Link href={user ? "/events/create" : "/login"}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Event
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...Array(2)].map((_, i) => (
                 <div key={i} className="space-y-2">
                   <Skeleton className="h-[200px] w-full" />
                   <Skeleton className="h-6 w-3/4" />
                   <Skeleton className="h-4 w-1/2" />
                 </div>
               ))}
             </div>
          ) : createdEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">You haven't created any events yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Click the button above to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
