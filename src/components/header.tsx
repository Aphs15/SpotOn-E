
'use client';

import { Home, Settings, Mail, PlusCircle, Bookmark, Ticket, Users, LayoutDashboard, CalendarCheck, UserPlus, LogIn, User, LogOut, Menu, History } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ThemeToggle } from './theme-toggle';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from './ui/skeleton';

const navLinks = [
    { href: '/', label: 'Home', Icon: Home },
    { href: '/community', label: 'Community', Icon: Users },
    { href: '/events/past', label: 'Past Events', Icon: History },
    { href: '/contact', label: 'Contact', Icon: Mail },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Nav */}
        <div className="md:hidden">
             <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b">
                             <Link href="/" className="flex items-center space-x-2 font-bold text-lg" onClick={() => setIsSheetOpen(false)}>
                                <Ticket className="h-6 w-6 text-primary" />
                                <span className="font-headline tracking-tight">SpotOn</span>
                            </Link>
                        </div>
                        <nav className="flex flex-col gap-2 p-4 flex-1">
                            {navLinks.map(({ href, label, Icon }) => (
                                <Button key={href} variant="ghost" className="justify-start text-base" asChild onClick={() => setIsSheetOpen(false)}>
                                    <Link href={href}>
                                        <Icon className="mr-3" />
                                        {label}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                        <div className="p-4 border-t">
                            <ThemeToggle />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="font-headline tracking-tight">SpotOn</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-2 mx-6">
            {navLinks.map(({ href, label }) => (
                <Button key={href} variant="link" asChild className="text-muted-foreground hover:text-foreground">
                    <Link href={href}>{label}</Link>
                </Button>
            ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild className="hidden md:inline-flex rounded-full font-semibold">
                <Link href={user ? "/events/create" : "/login"}>
                    <PlusCircle className="mr-2" />
                    Create Event
                </Link>
            </Button>
            
            {loading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
            ) : user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} data-ai-hint="user avatar" />
                            <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                            </p>
                        </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/profile">
                                    <User className="mr-2" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                                <Link href="/dashboard">
                                <LayoutDashboard className="mr-2" />
                                <span>Dashboard</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                         <div className="md:hidden">
                            <DropdownMenuItem asChild>
                                <Link href="/events/create">
                                    <PlusCircle className="mr-2" />
                                    <span>Create Event</span>
                                </Link>
                            </DropdownMenuItem>
                             <DropdownMenuSeparator/>
                        </div>
                        <DropdownMenuItem>
                           <div className="w-full">
                             <ThemeToggle />
                           </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>
                            <LogOut className="mr-2" />
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                 <div className="space-x-2">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
}
