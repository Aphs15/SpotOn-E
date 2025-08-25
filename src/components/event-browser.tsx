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
import { PlusCircle, Bookmark, Search, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const trendingEvents = useMemo(() => {
    return initialEvents.slice(0, 4);
  }, [initialEvents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="relative text-center py-16 md:py-24 animate-fade-in-up rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-900">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-white tracking-tight">
              Event Planning
            </h1>
            <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
             Find, create, and share amazing events with your community. Your next adventure is just a click away.
            </p>
          </div>
        </div>

      <div className="mb-12 animate-fade-in-up animation-delay-200">
        <h2 className="text-3xl font-bold font-headline mb-4 flex items-center">
            <Flame className="mr-3 h-7 w-7 text-accent" />
            Trending Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingEvents.map((event, i) => (
                <div key={event.id} className="animate-fade-in-up" style={{animationDelay: `${i * 100 + 200}ms`}}>
                    <EventCard event={event} />
                </div>
            ))}
        </div>
      </div>


      <div className="mb-8 p-4 rounded-2xl bg-card/50 border shadow-sm sticky top-20 z-40 backdrop-blur-md animate-fade-in-up animation-delay-400">
         <h2 className="text-2xl font-bold font-headline mb-4">Find Your Next Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by event name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="rounded-full">
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
            <SelectTrigger className="rounded-full">
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
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-8 animate-fade-in-up animation-delay-400">
          <Button asChild size="lg" className="rounded-full font-semibold">
            <Link href="/events/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="rounded-full font-semibold">
            <Link href="/events/saved">
              <Bookmark className="mr-2 h-4 w-4" />
              View Saved Events
            </Link>
          </Button>
      </div>

      {filteredEvents.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
  );
}
