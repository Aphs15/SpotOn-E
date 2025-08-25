import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FacebookIcon, GoogleIcon } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join Event Hopper to discover and create amazing events.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
           <div className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" required />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          <Separator className="my-2" />
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon className="mr-2 h-5 w-5" />
              Sign up with Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Button variant="link" asChild className="p-0">
                    <Link href="/login">Login</Link>
                </Button>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
