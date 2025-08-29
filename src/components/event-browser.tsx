
'use client';

import type { Event } from '@/lib/events';
import { useState, useMemo, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import EventCard from './event-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { PlusCircle, Bookmark, Search, Flame } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface EventBrowserProps {
  initialEvents: Event[];
  cities: string[];
  categories: string[];
}

export default function EventBrowser({
  initialEvents,
  cities,
  categories,
}: EventBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [allEvents, setAllEvents] = useState<Event[]>(initialEvents);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem('createdEvents');
      if (storedEvents) {
        const createdEvents = JSON.parse(storedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date), // Ensure date is a Date object
        }));
        setAllEvents(prevEvents => [...prevEvents, ...createdEvents]);
      }
    } catch (error) {
      console.error('Failed to parse created events from localStorage', error);
    }
  }, []);

  const filteredEvents = useMemo(() => {
    return allEvents
      .filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(event => cityFilter === 'all' || event.city === cityFilter)
      .filter(
        event => categoryFilter === 'all' || event.category === categoryFilter
      );
  }, [allEvents, searchTerm, cityFilter, categoryFilter]);

  const trendingEvents = useMemo(() => {
    return initialEvents.slice(0, 4);
  }, [initialEvents]);

  return (
    <div>
       <div className="relative text-center py-24 md:py-32 animate-fade-in-up bg-primary/10 mb-12">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
          <div className="container relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground tracking-tight">
              Find Your Next Experience
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
             Discover, create, and share amazing events with your community. Your next adventure is just a click away.
            </p>
            <div className="mt-8 mx-auto max-w-2xl p-4 rounded-2xl bg-card/80 border shadow-sm backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative md:col-span-3">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by event name..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-full h-12 text-base"
                    />
                  </div>
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger className="rounded-full h-12">
                      <SelectValue placeholder="Filter by city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="rounded-full h-12">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="lg" className="rounded-full md:col-span-3 h-12 font-semibold">Search Events</Button>
                </div>
            </div>
          </div>
        </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 animate-fade-in-up animation-delay-200">
            <h2 className="text-3xl font-bold font-headline mb-4 flex items-center">
                <Flame className="mr-3 h-7 w-7 text-accent" />
                Trending Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingEvents.map((event, i) => (
                    <div key={event.id} className="animate-fade-in-up" style={{animationDelay: `${i * 100 + 200}ms`}}>
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>


        <div className="mb-8 p-4 rounded-2xl bg-card/80 border shadow-sm sticky top-[4.5rem] z-40 backdrop-blur-md animate-fade-in-up animation-delay-400">
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <h2 className="text-2xl font-bold font-headline">All Events</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button asChild size="lg" className="rounded-full font-semibold">
                        <Link href={user ? "/events/create" : "/login"}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Event
                        </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="rounded-full font-semibold">
                        <Link href={user ? "/events/saved" : "/login"}>
                        <Bookmark className="mr-2 h-4 w-4" />
                        View Saved Events
                        </Link>
                    </Button>
                </div>
            </div>
        </div>

        {filteredEvents.length > 0 ? (
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {filteredEvents.map((event, i) => (
                <div key={event.id} className="animate-fade-in-up" style={{animationDelay: `${i * 100}ms`}}>
                    <EventCard event={event} />
                </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No events found.</p>
            <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters.
            </p>
            </div>
        )}
      </div>
    </div>
  );
}
