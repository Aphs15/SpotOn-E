'use client';

import { getEventById } from '@/lib/events';
import type { Event } from '@/lib/events';
import { notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, Armchair } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BookingPageProps {
  params: {
    id: string;
  };
}

const TICKET_PRICE = 175.00;

export default function BookingPage({ params }: BookingPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await getEventById(params.id);
      if (eventData) {
        setEvent(eventData);
      }
      setIsLoading(false);
    };
    fetchEvent();
  }, [params.id]);
  
  const seatRows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 12;
  const unavailableSeats = useMemo(() => ['A3', 'B5', 'B6', 'C10', 'E4'], []);
  
  const handleQuantityChange = (value: string) => {
    const quantity = parseInt(value, 10);
    setTicketQuantity(quantity);
    setSelectedSeats([]); // Reset seats when quantity changes
  };

  const handleSeatClick = (seatId: string) => {
    if (unavailableSeats.includes(seatId) || ticketQuantity === 0) return;

    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter(s => s !== seatId);
      } else {
        if (prevSelectedSeats.length < ticketQuantity) {
          return [...prevSelectedSeats, seatId];
        }
        return prevSelectedSeats;
      }
    });
  };

  const handleBooking = () => {
    if (!event || selectedSeats.length !== ticketQuantity || ticketQuantity === 0) {
      toast({
        title: 'Booking Incomplete',
        description: `Please select ${ticketQuantity} seat${ticketQuantity > 1 ? 's' : ''} to match your ticket quantity.`,
        variant: 'destructive'
      });
      return;
    }

    const bookingDetails = {
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date.toISOString(),
      eventImage: event.image,
      imageHint: `${event.category.toLowerCase()} event`,
      seats: selectedSeats,
      quantity: ticketQuantity,
      total: totalPrice,
    };
    
    // Simulate saving to a database by using local storage
    const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    localStorage.setItem('userBookings', JSON.stringify([...existingBookings, bookingDetails]));

    toast({
      title: 'Booking Successful!',
      description: `You have booked seats: ${selectedSeats.join(', ')} for ${event.name}.`,
    });

    router.push('/profile');
  };

  const totalPrice = (TICKET_PRICE * ticketQuantity).toFixed(2);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading event details...</div>;
  }

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="animate-fade-in-up">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center">
              <Ticket className="mr-3 text-primary" />
              Book Tickets for {event.name}
            </CardTitle>
            <CardDescription>
              Complete the steps below to secure your spot.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="ticket-quantity" className="text-lg font-semibold">1. Select Quantity</Label>
                <Select onValueChange={handleQuantityChange}>
                  <SelectTrigger id="ticket-quantity" className="mt-2">
                    <SelectValue placeholder="Select number of tickets" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(5)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1} Ticket{i > 0 && 's'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

               <div>
                <h3 className="text-lg font-semibold mb-2">2. Choose Your Seats</h3>
                 <p className="text-sm text-muted-foreground mb-2">
                    {ticketQuantity > 0 ? `Please select ${ticketQuantity - selectedSeats.length} more seat(s).` : 'Select ticket quantity to enable seat selection.'}
                </p>
                <div className="p-4 bg-secondary rounded-lg border">
                    <div className="mb-4 p-2 bg-primary/10 text-primary text-center rounded-md font-bold">STAGE</div>
                    <div className="space-y-2">
                    {seatRows.map(row => (
                        <div key={row} className="flex items-center justify-center gap-2">
                        <span className="w-4 text-sm font-semibold text-muted-foreground">{row}</span>
                        {Array.from({ length: seatsPerRow }, (_, i) => {
                            const seatId = `${row}${i + 1}`;
                            const isUnavailable = unavailableSeats.includes(seatId);
                            const isSelected = selectedSeats.includes(seatId);

                            return (
                            <Armchair
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                className={`
                                h-6 w-6 transition-colors
                                ${isUnavailable ? 'text-muted-foreground/30 cursor-not-allowed' : 'cursor-pointer'}
                                ${isSelected ? 'text-accent' : isUnavailable ? '' : 'text-foreground'}
                                ${!isUnavailable && !isSelected ? 'hover:text-primary' : ''}
                                `}
                            />
                            );
                        })}
                        </div>
                    ))}
                    </div>
                </div>
               </div>

                <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Price</span>
                        <span>R {totalPrice}</span>
                    </div>
                    <Button size="lg" className="w-full" onClick={handleBooking} disabled={ticketQuantity === 0 || selectedSeats.length !== ticketQuantity}>
                      Proceed to Payment
                    </Button>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Booking Summary</h3>
                <div className="p-4 bg-secondary rounded-lg border space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Event:</span>
                        <span className="font-semibold text-right">{event.name}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-semibold text-right">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-semibold text-right">{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tickets:</span>
                        <span className="font-semibold">{ticketQuantity || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats:</span>
                        <span className="font-semibold">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
