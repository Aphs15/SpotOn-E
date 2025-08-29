
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategories, getCities } from '@/lib/events';
import type { Event } from '@/lib/events';
import { Switch } from '@/components/ui/switch';
import { Info, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [eventName, setEventName] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<any>('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const cityData = await getCities();
      const categoryData = await getCategories();
      setCities(cityData);
      setCategories(categoryData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDateTime = now.toISOString().slice(0, 16);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setImageUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !city || !category || !dateTime || !location || !description || (!imageUrl && !uploadedImage)) {
        toast({
            title: 'Incomplete Form',
            description: 'Please fill out all the required fields.',
            variant: 'destructive',
        });
        return;
    }

    const newEvent: Event = {
        id: `created-${Date.now()}`,
        name: eventName,
        city,
        category,
        date: new Date(dateTime),
        location,
        description,
        image: uploadedImage || imageUrl,
        bookingLink: '#',
    };

    const existingEvents = JSON.parse(localStorage.getItem('createdEvents') || '[]');
    localStorage.setItem('createdEvents', JSON.stringify([...existingEvents, newEvent]));

    toast({
        title: 'Event Created!',
        description: `"${newEvent.name}" has been successfully created.`,
    });

    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Create a New Event</CardTitle>
          <CardDescription>
            Fill out the details below to add a new event to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" placeholder="Enter the event name" value={eventName} onChange={e => setEventName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select value={city} onValueChange={setCity} required>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input id="date" type="datetime-local" min={minDateTime} value={dateTime} onChange={e => setDateTime(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location / Venue</Label>
              <Input id="location" placeholder="e.g., FNB Stadium" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the event" className="min-h-[120px]" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            
            <div className="space-y-2">
                <Label>Event Image</Label>
                <Tabs defaultValue="url" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url">Image URL</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                        <div className="space-y-2 mt-2">
                            <Input 
                                id="image" 
                                placeholder="https://example.com/image.png" 
                                value={imageUrl} 
                                onChange={e => { setImageUrl(e.target.value); setUploadedImage(null); }} 
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="upload">
                        <div className="space-y-2 mt-2">
                            <Label 
                                htmlFor="image-upload" 
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-secondary/80"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <Input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </Label>
                        </div>
                    </TabsContent>
                </Tabs>
                {(imageUrl || uploadedImage) && (
                    <div className="mt-4 p-2 border rounded-lg">
                        <p className="text-sm font-medium mb-2">Image Preview:</p>
                        <Image src={uploadedImage || imageUrl} alt="Event preview" width={500} height={300} className="rounded-md w-full object-cover" />
                    </div>
                )}
            </div>
            
            <div className="space-y-4 rounded-lg border bg-secondary p-4">
               <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Label htmlFor="private-event" className="text-base">
                        Private Event
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Only invited people or groups can see this event.
                    </p>
                </div>
                <Switch id="private-event" />
              </div>
              {/* This section would conditionally render when the switch is on */}
               <div className="space-y-2">
                <Label htmlFor="invites">Invite Guests or Groups</Label>
                <Textarea id="invites" placeholder="Enter emails, usernames, or group names, separated by commas..." />
                 <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Info className="h-3 w-3" />
                    This feature requires a backend to be fully functional.
                </p>
              </div>
            </div>

            <Button type="submit" size="lg">Create Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
