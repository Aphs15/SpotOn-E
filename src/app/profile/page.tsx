import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Edit, Shield, Star, Bookmark, CalendarCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman smiling',
    joined: 'October 2024',
};

const savedEvents = [
    { id: '1', name: 'Cape Town International Jazz Festival', date: 'Oct 26, 2024', image: 'https://placehold.co/600x400.png', imageHint: 'jazz music festival' },
    { id: '2', name: 'Soweto Derby', date: 'Nov 09, 2024', image: 'https://placehold.co/600x400.png', imageHint: 'soccer stadium' },
];

const userReviews = [
    { eventName: 'Rocking the Daisies', rating: 5, comment: 'Absolutely incredible experience! The energy was insane and the lineup was top-notch. Can\'t wait for next year!' },
    { eventName: 'Gugs Unplugged Sessions', rating: 4, comment: 'A wonderful, intimate show. It felt so authentic and the talent was amazing. A must-do for local music lovers.' },
];

export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: User Info & Settings */}
                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.avatarHint} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                            <p className="text-xs text-muted-foreground">Joined {user.joined}</p>
                        </CardHeader>
                        <CardContent>
                             <Button className="w-full rounded-full">Edit Profile</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <Edit className="mr-2 h-4 w-4" />
                                Personal Information
                            </Button>
                             <Button variant="outline" className="w-full justify-start">
                                <Shield className="mr-2 h-4 w-4" />
                                Security & Password
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Events & Reviews */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <Calendar className="mr-2 text-primary" />
                                Your Events
                            </CardTitle>
                             <CardDescription>
                                Manage your saved and created events.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {savedEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {savedEvents.map(event => (
                                        <Link href={`/events/${event.id}`} key={event.id}>
                                            <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer">
                                                <Image src={event.image} alt={event.name} width={80} height={60} className="rounded-md object-cover aspect-[4/3]" data-ai-hint={event.imageHint} />
                                                <div>
                                                    <p className="font-semibold">{event.name}</p>
                                                    <p className="text-sm text-muted-foreground">{event.date}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">You have no upcoming events.</p>
                            )}
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/events/saved">
                                        <Bookmark className="mr-2 h-4 w-4" />
                                        View All Saved Events
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/events/created">
                                        <CalendarCheck className="mr-2 h-4 w-4" />
                                        View Created Events
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <Star className="mr-2 text-primary" />
                                Your Reviews
                            </CardTitle>
                             <CardDescription>
                                Reviews you've left for past events.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {userReviews.map((review, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="font-semibold">{review.eventName}</p>
                                      <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted-foreground'}`} />
                                          ))}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                                    {index < userReviews.length - 1 && <Separator className="mt-4" />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
