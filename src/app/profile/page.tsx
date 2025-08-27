
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Edit, Shield, Star, Bookmark, CalendarCheck, Users, Ticket, QrCode, UserPlus, UserMinus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { GoogleIcon, AppleWalletIcon } from '@/components/icons';
import { followingMembers, joinedCommunities, userReviews, savedEvents } from '@/lib/community-data';

const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman smiling',
    joined: 'October 2024',
};

interface Booking {
    eventId: string;
    eventName: string;
    eventDate: string;
    eventImage: string;
    imageHint: string;
    seats: string[];
    tickets: Record<string, number>;
}

export default function ProfilePage() {
    const [userBookings, setUserBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const storedBookings = localStorage.getItem('userBookings');
        if (storedBookings) {
            setUserBookings(JSON.parse(storedBookings));
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: User Info & Settings */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
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

                    <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl">Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href="/profile/personal-information">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Personal Information
                                </Link>
                            </Button>
                             <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href="/profile/security">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Security & Password
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Events, Communities & Reviews */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
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
                                            <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
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

                     <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <Ticket className="mr-2 text-primary" />
                                My Tickets
                            </CardTitle>
                             <CardDescription>
                                Your successfully booked event tickets.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           {userBookings.length > 0 ? (
                                <div className="space-y-4">
                                    {userBookings.map(booking => (
                                       <Card key={booking.eventId} className="bg-secondary overflow-hidden hover:shadow-md transition-shadow">
                                         <div className="flex flex-col sm:flex-row">
                                           <div className="flex-1 p-4">
                                                <Link href={`/events/${booking.eventId}`}>
                                                    <div className="flex items-start gap-4 cursor-pointer">
                                                        <Image src={booking.eventImage} alt={booking.eventName} width={80} height={80} className="rounded-md object-cover aspect-square" data-ai-hint={booking.imageHint} />
                                                        <div>
                                                            <p className="font-bold text-lg">{booking.eventName}</p>
                                                            <p className="text-sm text-muted-foreground">{new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                            <p className="text-sm text-muted-foreground font-bold mt-1">Seats: {booking.seats.join(', ')}</p>
                                                            <div className="text-xs text-muted-foreground mt-2">
                                                                {Object.entries(booking.tickets).filter(([, qty]) => qty > 0).map(([name, qty]) => (
                                                                    <span key={name} className="mr-2">{name} (x{qty})</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Separator className="my-3" />
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        <AppleWalletIcon className="mr-2 h-5 w-5" />
                                                        Apple Wallet
                                                    </Button>
                                                     <Button variant="outline" size="sm" className="flex-1">
                                                        <GoogleIcon className="mr-2 h-5 w-5" />
                                                        Google Wallet
                                                    </Button>
                                                </div>
                                           </div>
                                           <div className="bg-background/50 flex items-center justify-center p-4 sm:border-l">
                                                <QrCode className="h-24 w-24 text-primary" />
                                           </div>
                                         </div>
                                       </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-4">You have no booked tickets yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <UserPlus className="mr-2 text-primary" />
                                Following
                            </CardTitle>
                             <CardDescription>
                                Members you are currently following.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {followingMembers.map((member) => (
                                <div key={member.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold">{member.name}</span>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        <UserMinus className="mr-2 h-4 w-4" />
                                        Unfollow
                                    </Button>
                                </div>
                           ))}
                        </CardContent>
                    </Card>

                     <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <Users className="mr-2 text-primary" />
                                Your Communities
                            </CardTitle>
                             <CardDescription>
                                Groups you've joined and are a part of.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {joinedCommunities.map((group) => (
                             <Link href={`/community/${group.slug}`} key={group.name}>
                                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary/10 rounded-full">
                                            <group.Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{group.name}</p>
                                            <p className="text-xs text-muted-foreground">{group.members} members</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">View</Button>
                                </div>
                             </Link>
                           ))}
                        </CardContent>
                    </Card>

                     <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
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
                                <div key={index} className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
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
