
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserMinus, UserPlus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useFollowing } from '@/hooks/use-following';
import Link from 'next/link';

export default function FollowingPage() {
    const { followingMembers, unfollowMember } = useFollowing();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-3xl font-headline">
                        <UserPlus className="mr-3 text-primary" />
                        Following
                    </CardTitle>
                    <CardDescription>
                        The complete list of members you are following.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {followingMembers.map((member) => (
                        <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary transition-colors">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">{member.name}</span>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                        <UserMinus className="mr-2 h-4 w-4" />
                                        Unfollow
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to unfollow {member.name}?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => unfollowMember(member.name)}>
                                            Yes, Unfollow
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))}
                    {followingMembers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-lg text-muted-foreground">You are not following anyone yet.</p>
                             <Button asChild className="mt-4">
                                <Link href="/community">Find Members to Follow</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
