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

export default function LoginPage() {
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
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon className="mr-2 h-5 w-5" />
              Continue with Facebook
            </Button>
          </div>
          <Separator className="my-6" />
           <div className="text-center">
             <p className="text-xs text-muted-foreground">
                Phone number login and other features coming soon!
             </p>
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
