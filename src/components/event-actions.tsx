'use client';

import type { Event } from '@/lib/events';
import { Button } from './ui/button';
import { CalendarPlus, Share2, Ticket, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSavedEvents } from '@/hooks/use-saved-events';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

interface EventActionsProps {
  event: Event;
}

export default function EventActions({ event }: EventActionsProps) {
  const { toast } = useToast();
  const { isEventSaved, toggleSaveEvent } = useSavedEvents();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Ensure window is defined (runs only on client)
    if (typeof window !== 'undefined') {
      const shareText = encodeURIComponent(
        `Check out this event: ${event.name} on Event Hopper! ${window.location.href}`
      );
      setShareUrl(`https://wa.me/?text=${shareText}`);
    }
  }, [event.name]);

  const handleAddToCalendar = () => {
    toast({
      title: 'Event Added to Calendar!',
      description: `(Simulated) "${event.name}" has been added to your calendar.`,
    });
  };

  return (
    <Card className="p-4 bg-secondary rounded-2xl">
      <div className="flex flex-col gap-4">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-full font-semibold">
          <Link href={event.bookingLink} target="_blank" rel="noopener noreferrer">
            <Ticket className="mr-2 h-5 w-5" />
            Book Now
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => toggleSaveEvent(event)}
          aria-label={isEventSaved(event.id) ? 'Unsave event' : 'Save event'}
          className="w-full rounded-full font-semibold"
        >
          <Heart className={cn("mr-2 h-5 w-5", isEventSaved(event.id) && 'fill-accent text-accent')} />
          {isEventSaved(event.id) ? 'Saved' : 'Save'}
        </Button>
        <Button size="lg" variant="outline" onClick={handleAddToCalendar} className="w-full rounded-full font-semibold">
          <CalendarPlus className="mr-2 h-5 w-5" />
          Add to Calendar
        </Button>
        <Button size="lg" variant="outline" asChild className="w-full rounded-full font-semibold">
          <Link href={shareUrl} target="_blank" rel="noopener noreferrer">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Link>
        </Button>
      </div>
    </Card>
  );
}
