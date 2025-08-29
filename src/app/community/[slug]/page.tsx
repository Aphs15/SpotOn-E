
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ThumbsUp, MoreVertical, BadgeCheck, AlertTriangle, PlusCircle, Users, Check } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { communityDetails, feedPosts, communityMembers } from '@/lib/community-data';
import { useFollowing } from '@/hooks/use-following';

interface CommunityDetailsPageProps {
    params: {
        slug: keyof typeof communityDetails;
    }
}

export default function CommunityDetailsPage({ params }: CommunityDetailsPageProps) {
  const slug = params.slug;
  const details = communityDetails[slug];
  const { isFollowing, toggleFollow } = useFollowing();

  if (!details) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">{details.name}</h1>
        <p className="text-lg text-muted-foreground mt-1">{details.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Create Post Card */}
          <Card className="transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2 text-primary" />
                Create a Post
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-start gap-4">
                     <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <form className="flex-1 space-y-4">
                        <Textarea placeholder={`What's on your mind, Alex?`} className="bg-secondary border-0" />
                        <div className="flex justify-end">
                            <Button>Post</Button>
                        </div>
                    </form>
                </div>
            </CardContent>
          </Card>

          {/* Feed Posts */}
          <div className="space-y-6">
            {feedPosts.map((post, index) => (
              <Card key={index} className="p-4 transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.author} data-ai-hint={post.avatarHint} />
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
          </div>
        </div>
        <div className="space-y-8">
            <Card className="transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
                <CardHeader>
                <CardTitle className="flex items-center">
                    <Users className="mr-2 text-primary" />
                    Community Members
                </CardTitle>
                <CardDescription>
                    See who's part of the group.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {communityMembers.map((member) => {
                    const following = isFollowing(member.name);
                    return (
                        <div key={member.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/80 transition-colors">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">{member.name}</span>
                            </div>
                            <motion.div
                                initial={false}
                                animate={following ? 'followed' : 'unfollowed'}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="sm"
                                    variant={following ? 'default' : 'outline'}
                                    onClick={() => toggleFollow(member)}
                                    className="w-24"
                                >
                                    <AnimatePresence mode="wait">
                                        {following ? (
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
                    );
                })}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
