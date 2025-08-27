
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

export default function SignUpPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

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
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join Event Hopper to discover and create amazing events.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon className="mr-2 h-5 w-5" />
              Sign up with Facebook
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="text-center">
             <p className="text-xs text-muted-foreground">
                More sign up options coming soon!
             </p>
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
