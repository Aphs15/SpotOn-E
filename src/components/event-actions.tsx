'use client';

import type { Event } from '@/lib/events';
import { Button } from './ui/button';
import { CalendarPlus, Share2, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface EventActionsProps {
  event: Event;
}

export default function EventActions({ event }: EventActionsProps) {
  const { toast } = useToast();
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
    <div className="flex flex-wrap gap-4">
      <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <Link href={event.bookingLink} target="_blank" rel="noopener noreferrer">
          <Ticket className="mr-2 h-5 w-5" />
          Book Now
        </Link>
      </Button>
      <Button size="lg" variant="outline" onClick={handleAddToCalendar}>
        <CalendarPlus className="mr-2 h-5 w-5" />
        Add to Calendar
      </Button>
      <Button size="lg" variant="outline" asChild>
        <Link href={shareUrl} target="_blank" rel="noopener noreferrer">
          <Share2 className="mr-2 h-5 w-5" />
          Share to WhatsApp
        </Link>
      </Button>
    </div>
  );
}
