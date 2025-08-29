
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FacebookIcon, GoogleIcon } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const isFirebaseConfigured = !!auth;

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  if (loading || user) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>
            Sign in to manage your events and bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
           {!isFirebaseConfigured && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Firebase Not Configured</AlertTitle>
              <AlertDescription>
                The login services are currently unavailable. Please configure Firebase to enable authentication.
              </AlertDescription>
            </Alert>
          )}
           <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required disabled={!isFirebaseConfigured} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required disabled={!isFirebaseConfigured} />
            </div>
            <Button type="submit" className="w-full" disabled={!isFirebaseConfigured}>
              Login with Email
            </Button>
          </form>
           <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={signInWithGoogle} disabled={!isFirebaseConfigured}>
              <GoogleIcon className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full" disabled={!isFirebaseConfigured}>
              <FacebookIcon className="mr-2 h-5 w-5" />
              Continue with Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" asChild className="p-0">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
