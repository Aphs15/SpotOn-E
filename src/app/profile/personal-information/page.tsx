
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman smiling',
};

export default function PersonalInformationPage() {
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically handle form submission, e.g., send data to an API.
        // For now, we'll just show a success toast.
        toast({
            title: 'Information Updated',
            description: 'Your personal details have been saved successfully.',
        });
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Personal Information</CardTitle>
          <CardDescription>
            View and update your personal details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.avatarHint} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="year-of-birth">Year of Birth</Label>
                <Input id="year-of-birth" type="number" placeholder="e.g., 1990" defaultValue="1992" />
              </div>
            <Button type="submit" size="lg">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
