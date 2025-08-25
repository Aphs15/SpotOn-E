import EventBrowser from '@/components/event-browser';
import { getCategories, getCities, getEvents } from '@/lib/events';

export default async function Home() {
  const events = await getEvents();
  const cities = await getCities();
  const categories = await getCategories();

  return (
    <main>
      <EventBrowser
        initialEvents={events}
        cities={cities}
        categories={categories}
      />
    </main>
  );
}
