import { getEventById } from '@/lib/events';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, Armchair } from 'lucide-react';

interface BookingPageProps {
  params: {
    id: string;
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const seatRows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 12;
  const unavailableSeats = ['A3', 'B5', 'B6', 'C10', 'E4'];


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
                <Select>
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
                <div className="p-4 bg-secondary rounded-lg border">
                    <div className="mb-4 p-2 bg-primary/10 text-primary text-center rounded-md font-bold">STAGE</div>
                    <div className="space-y-2">
                    {seatRows.map(row => (
                        <div key={row} className="flex items-center justify-center gap-2">
                        <span className="w-4 text-sm font-semibold text-muted-foreground">{row}</span>
                        {Array.from({ length: seatsPerRow }, (_, i) => {
                            const seatId = `${row}${i + 1}`;
                            const isUnavailable = unavailableSeats.includes(seatId);
                            const isSelected = seatId === 'C4' || seatId === 'C5'; // Simulate selection

                            return (
                            <Armchair
                                key={seatId}
                                className={`
                                h-6 w-6 cursor-pointer
                                ${isUnavailable ? 'text-muted-foreground/50' : 'text-foreground'}
                                ${isSelected ? 'text-accent' : ''}
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
                        <span>R 350.00</span>
                    </div>
                    <Button size="lg" className="w-full">Proceed to Payment</Button>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Booking Summary</h3>
                <div className="p-4 bg-secondary rounded-lg border space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Event:</span>
                        <span className="font-semibold">{event.name}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-semibold">{event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-semibold">{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tickets:</span>
                        <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats:</span>
                        <span className="font-semibold">C4, C5</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
