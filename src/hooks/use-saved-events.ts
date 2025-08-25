'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Event } from '@/lib/events';
import { useToast } from '@/hooks/use-toast';

const SAVED_EVENTS_KEY = 'savedEvents';

export function useSavedEvents() {
  const [savedEventIds, setSavedEventIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedIds = localStorage.getItem(SAVED_EVENTS_KEY);
      if (storedIds) {
        setSavedEventIds(new Set(JSON.parse(storedIds)));
      }
    } catch (error) {
      console.error('Failed to parse saved events from localStorage', error);
      setSavedEventIds(new Set());
    }
  }, []);

  const isEventSaved = useCallback(
    (eventId: string) => savedEventIds.has(eventId),
    [savedEventIds]
  );

  const toggleSaveEvent = useCallback(
    (event: Event) => {
      const newSavedEventIds = new Set(savedEventIds);
      let message = '';
      if (newSavedEventIds.has(event.id)) {
        newSavedEventIds.delete(event.id);
        message = `"${event.name}" removed from saved events.`;
      } else {
        newSavedEventIds.add(event.id);
        message = `"${event.name}" saved!`;
      }
      setSavedEventIds(newSavedEventIds);
      localStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify(Array.from(newSavedEventIds)));
      toast({
        title: message,
      });
    },
    [savedEventIds, toast]
  );
  
  const getSavedEventIds = useCallback(() => {
    return Array.from(savedEventIds);
  }, [savedEventIds]);

  return { isEventSaved, toggleSaveEvent, savedEventIds: getSavedEventIds() };
}
