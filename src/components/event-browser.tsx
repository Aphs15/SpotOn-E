'use client';

import type { Event } from '@/lib/events';
import { useState, useMemo } from 'react';
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
import { PlusCircle, Bookmark } from 'lucide-react';

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

  const filteredEvents = useMemo(() => {
    return initialEvents
      .filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(event => cityFilter === 'all' || event.city === cityFilter)
      .filter(
        event => categoryFilter === 'all' || event.category === categoryFilter
      );
  }, [initialEvents, searchTerm, cityFilter, categoryFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Find Your Next Experience
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse events by city, category, or name. Your next adventure awaits.
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg bg-card border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="md:col-span-1"
          />
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger>
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
            <SelectTrigger>
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
        </div>
         <div className="mt-4 flex flex-wrap gap-4 items-center">
            <Button asChild>
              <Link href="/events/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Event
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/events/saved">
                <Bookmark className="mr-2 h-4 w-4" />
                View Saved Events
              </Link>
            </Button>
          </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
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
  );
}
