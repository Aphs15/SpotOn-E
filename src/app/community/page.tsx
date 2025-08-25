import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Rss, Users } from 'lucide-react';
import Image from 'next/image';

const communityMembers = [
  { name: 'Alice', image: 'https://placehold.co/100x100.png', hint: 'woman smiling' },
  { name: 'Bob', image: 'https://placehold.co/100x100.png', hint: 'man glasses' },
  { name: 'Charlie', image: 'https://placehold.co/100x100.png', hint: 'person nature' },
  { name: 'Diana', image: 'https://placehold.co/100x100.png', hint: 'woman portrait' },
  { name: 'Ethan', image: 'https://placehold.co/100x100.png', hint: 'man hiking' },
  { name: 'Fiona', image: 'https://placehold.co/100x100.png', hint: 'woman city' },
];

const forumTopics = [
  { title: 'Best venues for live music in Cape Town?', replies: 12, author: 'Alice' },
  { title: 'Tips for organizing a successful sports event', replies: 8, author: 'Bob' },
  { title: 'Anyone going to the Jazz Festival next month?', replies: 25, author: 'Diana' },
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="relative text-center py-16 md:py-24 rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-900">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-white tracking-tight">
            Join the Conversation
          </h1>
          <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
            Connect with other event-goers, share experiences, and get the inside scoop.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 text-primary" />
                Latest Forum Topics
              </CardTitle>
              <CardDescription>
                Jump into the latest discussions from the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forumTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <h4 className="font-semibold">{topic.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Posted by {topic.author}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{topic.replies}</p>
                      <p className="text-xs text-muted-foreground">Replies</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
              <CardTitle className="flex items-center">
                <Rss className="mr-2 text-primary" />
                Community Blog
              </CardTitle>
              <CardDescription>
                Stories, tips, and highlights from the Event Hopper world.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:w-1/3 h-40 relative rounded-lg overflow-hidden">
                     <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Blog post image" data-ai-hint="concert crowd" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-xl mb-1">How to Make the Most of a Music Festival</h4>
                     <p className="text-muted-foreground mb-2">From packing essentials to navigating the crowds, here are our top tips for an unforgettable festival experience.</p>
                     <Button variant="link" className="p-0">Read More</Button>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 text-primary" />
                Featured Members
              </CardTitle>
               <CardDescription>
                Meet some of our most active community members.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {communityMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{member.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
