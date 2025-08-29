
'use client';

import { getEventById } from '@/lib/events';
import type { Event } from '@/lib/events';
import { notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, Armchair, PlusCircle, MinusCircle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface BookingPageProps {
  params: {
    id: string;
  };
}

const ticketTiers = [
    { name: 'Standard Admission', price: 175.00, description: 'General access to the event.' },
    { name: 'VIP Access', price: 450.00, description: 'Includes priority entry and exclusive lounge access.' },
];

export default function BookingPage({ params: { id } }: BookingPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({
      'Standard Admission': 0,
      'VIP Access': 0,
  });
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await getEventById(id);
      if (eventData) {
        setEvent(eventData);
      }
      setIsLoading(false);
    };
    fetchEvent();
  }, [id]);
  
  const totalTickets = useMemo(() => Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0), [ticketQuantities]);

  const seatRows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 12;
  const unavailableSeats = useMemo(() => ['A3', 'B5', 'B6', 'C10', 'E4'], []);
  
  const handleQuantityChange = (tierName: string, amount: number) => {
    setTicketQuantities(prev => {
        const newQuantity = Math.max(0, (prev[tierName] || 0) + amount);
        const currentTotal = Object.values(prev).reduce((sum, qty) => sum + qty, 0) - (prev[tierName] || 0);
        
        if (currentTotal + newQuantity > 5) { // Max 5 tickets total
             toast({
                title: 'Ticket limit reached',
                description: 'You can select a maximum of 5 tickets in total.',
                variant: 'destructive'
            });
            return prev;
        }
        
        return { ...prev, [tierName]: newQuantity };
    });
    setSelectedSeats([]); // Reset seats when quantity changes
  };

  const handleSeatClick = (seatId: string) => {
    if (unavailableSeats.includes(seatId) || totalTickets === 0) return;

    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter(s => s !== seatId);
      } else {
        if (prevSelectedSeats.length < totalTickets) {
          return [...prevSelectedSeats, seatId];
        }
        return prevSelectedSeats;
      }
    });
  };

  const handleBooking = () => {
    if (!event || selectedSeats.length !== totalTickets || totalTickets === 0) {
      toast({
        title: 'Booking Incomplete',
        description: `Please select ${totalTickets} seat${totalTickets > 1 ? 's' : ''} to match your ticket quantity.`,
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
      quantity: totalTickets,
      total: totalPrice,
      tickets: ticketQuantities,
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

  const totalPrice = useMemo(() => {
    return ticketTiers.reduce((total, tier) => {
        return total + (ticketQuantities[tier.name] || 0) * tier.price;
    }, 0).toFixed(2);
  }, [ticketQuantities]);

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
                <Label className="text-lg font-semibold">1. Select Tickets</Label>
                <div className="space-y-4 mt-2 p-4 border rounded-lg bg-secondary">
                    {ticketTiers.map(tier => (
                        <div key={tier.name}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{tier.name}</p>
                                    <p className="text-sm text-muted-foreground">R {tier.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button size="icon" variant="outline" className="h-7 w-7 rounded-full" onClick={() => handleQuantityChange(tier.name, -1)}>
                                        <MinusCircle className="h-4 w-4" />
                                    </Button>
                                    <span className="font-bold text-lg w-4 text-center">{ticketQuantities[tier.name] || 0}</span>
                                    <Button size="icon" variant="outline" className="h-7 w-7 rounded-full" onClick={() => handleQuantityChange(tier.name, 1)}>
                                        <PlusCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{tier.description}</p>
                        </div>
                    ))}
                </div>
              </div>

               <div>
                <h3 className="text-lg font-semibold mb-2">2. Choose Your Seats</h3>
                 <p className="text-sm text-muted-foreground mb-2">
                    {totalTickets > 0 ? `Please select ${totalTickets - selectedSeats.length} more seat(s).` : 'Select ticket quantity to enable seat selection.'}
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
                     <Separator />
                     {Object.entries(ticketQuantities).filter(([, qty]) => qty > 0).map(([name, qty]) => (
                        <div key={name} className="flex justify-between">
                            <span className="text-muted-foreground">{name} (x{qty})</span>
                            <span className="font-semibold">R {(ticketTiers.find(t => t.name === name)!.price * qty).toFixed(2)}</span>
                        </div>
                     ))}
                     {totalTickets > 0 && <Separator />}
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats:</span>
                        <span className="font-semibold">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Price</span>
                        <span>R {totalPrice}</span>
                    </div>
                </div>
                 <Button size="lg" className="w-full mt-4" onClick={handleBooking} disabled={totalTickets === 0 || selectedSeats.length !== totalTickets}>
                      Proceed to Payment
                 </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
