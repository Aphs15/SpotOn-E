
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, User, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Only subscribe to auth state changes if Firebase is initialized
    if (!auth || !db) {
      setUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) { 
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          // User is new, create a document for them
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
          });
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      console.error("Firebase is not configured. Cannot sign in.");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/profile');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({
        title: 'Sign-in Error',
        description: 'Could not sign in with Google. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    // Mock user login
    if (email === 'UserOne' && password === 'password12345') {
      const mockUser = {
        uid: 'mock-user-one-uid',
        email: 'userone@gmail.com',
        displayName: 'UserOne',
        photoURL: 'https://media.tenor.com/K-KTshhwK4gAAAAM/kanye-kanye-weat.gif',
      } as User;
      setUser(mockUser);
      setLoading(false);
      router.push('/profile');
      toast({
        title: 'Logged in as Mock User',
        description: 'You are now logged in as UserOne.',
      });
      return;
    }
    
    if (!auth) {
      console.error("Firebase is not configured. Cannot sign in.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error) {
      const authError = error as AuthError;
      let description = 'An unexpected error occurred. Please try again.';
      switch (authError.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
          description = 'Invalid email or password. Please check your credentials and try again.';
          break;
        case 'auth/wrong-password':
          description = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          description = 'The email address is not valid.';
          break;
      }
      toast({
        title: 'Login Failed',
        description,
        variant: 'destructive',
      });
      console.error("Error signing in with email: ", error);
    }
  };

  const logout = async () => {
    // Handle mock user logout
    if (user?.uid === 'mock-user-one-uid') {
        setUser(null);
        router.push('/');
        return;
    }

    if (!auth) {
        console.error("Firebase is not configured. Cannot log out.");
        return;
    }
    await signOut(auth);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
