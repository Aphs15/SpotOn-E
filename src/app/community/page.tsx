
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageSquare, ThumbsUp, Users, Music, Dribbble, Drama, MoreVertical, BadgeCheck, AlertTriangle, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const communityMembers = [
  { name: 'Alice', image: 'https://placehold.co/100x100.png', hint: 'woman smiling' },
  { name: 'Bob', image: 'https://placehold.co/100x100.png', hint: 'man glasses' },
  { name: 'Charlie', image: 'https://placehold.co/100x100.png', hint: 'person nature' },
  { name: 'Diana', image: 'https://placehold.co/100x100.png', hint: 'woman portrait' },
  { name: 'Ethan', image: 'https://placehold.co/100x100.png', hint: 'man hiking' },
];

const feedPosts = [
  {
    author: 'Diana',
    avatarHint: 'woman portrait',
    content: "Just got my tickets for the Cape Town International Jazz Festival! Who else is going? Can't wait!",
    likes: 42,
    comments: 18,
    verified: false,
  },
  {
    author: 'Fiona',
    avatarHint: 'woman city',
    content: "Rocking the Daisies was absolutely epic last weekend! Here's a shot from the main stage. The energy was unreal.",
    image: 'https://placehold.co/600x400.png',
    imageHint: 'music festival crowd',
    likes: 128,
    comments: 34,
    verified: false,
  },
  {
    author: 'Bob',
    avatarHint: 'man glasses',
    content: 'Checked in at FNB Stadium! Any tips for first-timers at the Soweto Derby? Want to make the most of the experience!',
    likes: 15,
    comments: 9,
    verified: true,
  }
];

const eventDiscussions = [
  { title: "Who's going to the Cape Town Jazz Festival?", event: 'Cape Town International Jazz Festival', replies: 78 },
  { title: 'Best pre-game spot near FNB Stadium?', event: 'Soweto Derby', replies: 45 },
  { title: 'The Lion King Meetup - Act 1 Intermission', event: 'The Lion King', replies: 22 },
];

const communityGroups = [
    { name: 'Music Lovers', slug: 'music-lovers', members: '1.2k', Icon: Music },
    { name: 'Sports Fans', slug: 'sports-fans', members: '856', Icon: Dribbble },
    { name: 'Theatre Buffs', slug: 'theatre-buffs', members: '432', Icon: Drama },
]


export default function CommunityPage() {
    const [followedMembers, setFollowedMembers] = useState<Record<string, boolean>>({});

    const handleFollowToggle = (memberName: string) => {
        setFollowedMembers(prev => ({ ...prev, [memberName]: !prev[memberName] }));
    };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="relative text-center py-16 md:py-24 rounded-2xl overflow-hidden mb-12 bg-primary">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary-foreground tracking-tight">
            Join the Conversation
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Connect with other event-goers, share experiences, and get the inside scoop.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 animate-fade-in-up animation-delay-200">
          <Card>
            <CardHeader>
              <CardTitle>Community Feed</CardTitle>
              <CardDescription>See what's happening in the Event Hopper community.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {feedPosts.map((post, index) => (
                <Card key={index} className="p-4 bg-card transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={`https://placehold.co/100x100.png`} alt={post.author} data-ai-hint={post.avatarHint} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold">{post.author}</p>
                          {post.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    <span>Report</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-muted-foreground mt-1">{post.content}</p>
                      {post.image && (
                        <div className="mt-3 rounded-lg overflow-hidden border">
                          <Image src={post.image} width={600} height={400} alt="Post image" data-ai-hint={post.imageHint} className="w-full h-auto" />
                        </div>
                      )}
                      <div className="flex items-center gap-6 mt-3 text-muted-foreground">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 animate-fade-in-up animation-delay-400">
          <Card>
            <CardHeader>
              <CardTitle>Join a Group</CardTitle>
              <CardDescription>Find your tribe and connect.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {communityGroups.map((group) => (
                <Link href={`/login`} key={group.name}>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                      <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                              <group.Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                              <p className="font-semibold">{group.name}</p>
                              <p className="text-xs text-muted-foreground">{group.members} members</p>
                          </div>
                      </div>
                      <Button size="sm" variant="outline">Join</Button>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Discussions</CardTitle>
              <CardDescription>Talk about upcoming events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {eventDiscussions.map((discussion) => (
                <div key={discussion.title} className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                  <p className="font-semibold leading-tight">{discussion.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{discussion.event} • {discussion.replies} replies</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 text-primary" />
                Connect With Members
              </CardTitle>
               <CardDescription>
                Meet active community members.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {communityMembers.map((member) => (
                <div key={member.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{member.name}</span>
                    </div>
                    <motion.div
                        initial={false}
                        animate={followedMembers[member.name] ? 'followed' : 'unfollowed'}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            size="sm"
                            variant={followedMembers[member.name] ? 'default' : 'outline'}
                            onClick={() => handleFollowToggle(member.name)}
                            className="w-24"
                        >
                            <AnimatePresence mode="wait">
                                {followedMembers[member.name] ? (
                                    <motion.span
                                        key="following"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center"
                                    >
                                        <Check className="mr-2 h-4 w-4" />
                                        Following
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="follow"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Follow
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Button>
                    </motion.div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
