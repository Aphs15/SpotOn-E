
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function SecurityPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isPasswordDialog, setIsPasswordDialog] = useState(false);
    const [isFeedbackDialog, setIsFeedbackDialog] = useState(false);

    const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: 'Password Updated',
            description: 'Your password has been changed successfully.',
        });
    };

    const handleDeleteAccount = () => {
        // Here you would typically make an API call to delete the user's account.
        // After successful deletion, you would redirect them.
        setIsPasswordDialog(false);
        setIsFeedbackDialog(true);
    };
    
    const handleFeedbackSubmit = () => {
         toast({
            title: 'Account Deleted',
            description: 'Your account has been permanently deleted. Thank you for your feedback.',
            variant: 'destructive',
        });
        setIsFeedbackDialog(false);
        router.push('/');
    };
    
    const handleSkipFeedback = () => {
        toast({
            title: 'Account Deleted',
            description: 'Your account has been permanently deleted.',
            variant: 'destructive',
        });
        setIsFeedbackDialog(false);
        router.push('/');
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Security & Password</CardTitle>
                    <CardDescription>
                        Manage your account's security settings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Change Password Section */}
                    <div className="space-y-6">
                        <CardTitle className="text-xl">Change Password</CardTitle>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" placeholder="Enter your current password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" placeholder="Enter your new password" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" placeholder="Confirm your new password" />
                            </div>
                            <Button type="submit">Update Password</Button>
                        </form>
                    </div>

                    <Separator />

                    {/* Account Visibility Section */}
                    <div className="space-y-4">
                        <CardTitle className="text-xl">Account Visibility</CardTitle>
                         <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary">
                            <div>
                                <Label htmlFor="private-account" className="text-base font-semibold">
                                    Private Account
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    If enabled, your profile and activity will only be visible to your followers.
                                </p>
                            </div>
                            <Switch id="private-account" />
                        </div>
                    </div>

                     <Separator />

                    {/* Delete Account Section */}
                    <div className="space-y-4">
                        <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
                         <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div>
                                    <p className="font-semibold">Delete Your Account</p>
                                    <p className="text-sm text-muted-foreground">
                                        This action is irreversible and will permanently delete all your data.
                                    </p>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                         <Button variant="destructive" className="mt-2 sm:mt-0">Delete Account</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => setIsPasswordDialog(true)}>
                                            Continue
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Password Confirmation Dialog */}
            <Dialog open={isPasswordDialog} onOpenChange={setIsPasswordDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Account Deletion</DialogTitle>
                        <DialogDescription>
                            To finalize, please enter your password. This is the final step and cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-2">
                            <Label htmlFor="password-confirm" className="sr-only">Password</Label>
                            <Input id="password-confirm" type="password" placeholder="Enter your password..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordDialog(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>Delete My Account</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

             {/* Feedback Dialog */}
            <Dialog open={isFeedbackDialog} onOpenChange={setIsFeedbackDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>We're sad to see you go</DialogTitle>
                        <DialogDescription>
                            Your account has been deleted. Could you share any feedback on how we could improve?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Textarea placeholder="Your feedback is greatly appreciated..." />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleSkipFeedback}>Skip</Button>
                        <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
