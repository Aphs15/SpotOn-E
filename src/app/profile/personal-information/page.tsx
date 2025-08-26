
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, Camera, X } from 'lucide-react';
import Image from 'next/image';

const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman smiling',
};

type DialogView = 'options' | 'camera' | 'preview';

export default function PersonalInformationPage() {
    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogView, setDialogView] = useState<DialogView>('options');
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [currentAvatar, setCurrentAvatar] = useState(user.avatar);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getCameraPermission = useCallback(async () => {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
          try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
              setHasCameraPermission(true);
              if (videoRef.current) {
                  videoRef.current.srcObject = stream;
              }
              return stream;
          } catch (error) {
              console.error('Error accessing camera:', error);
              setHasCameraPermission(false);
              return null;
          }
      }
      return null;
    }, []);

    useEffect(() => {
        if (dialogView !== 'camera') {
            const stream = videoRef.current?.srcObject as MediaStream;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                videoRef.current!.srcObject = null;
            }
        }
    }, [dialogView]);
    
    const handleUseCameraClick = async () => {
        const stream = await getCameraPermission();
        if (stream) {
            setDialogView('camera');
        } else {
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings.',
            });
        }
    };
    
    const handleCapturePhoto = () => {
        const video = videoRef.current;
        if (video) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/png');
                setImagePreview(dataUrl);
                setDialogView('preview');
            }
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setDialogView('preview');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: 'Information Updated',
            description: 'Your personal details have been saved successfully.',
        });
    };
    
     const handleSavePhoto = () => {
        if (imagePreview) {
            setCurrentAvatar(imagePreview);
        }
        setDialogOpen(false);
        toast({
            title: 'Photo Updated',
            description: 'Your profile photo has been changed.',
        });
    };

    const resetDialog = () => {
      setImagePreview(null);
      setDialogView('options');
    }

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
                    <form onSubmit={handleSaveChanges} className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={currentAvatar} alt={user.name} data-ai-hint={user.avatarHint} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetDialog(); }}>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="outline">Change Photo</Button>
                                </DialogTrigger>
                                <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                                    <DialogHeader>
                                        <DialogTitle>Change Profile Photo</DialogTitle>
                                        <DialogDescription>
                                            {dialogView === 'options' && "Choose how you'd like to update your photo."}
                                            {dialogView === 'camera' && "Position your face in the frame and take a photo."}
                                            {dialogView === 'preview' && "Review your new photo before saving."}
                                        </DialogDescription>
                                    </DialogHeader>

                                    {dialogView === 'options' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                                                <Upload className="mr-2" /> Upload from Device
                                            </Button>
                                            <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                            <Button variant="outline" onClick={handleUseCameraClick}>
                                                <Camera className="mr-2" /> Use Camera
                                            </Button>
                                        </div>
                                    )}

                                    {dialogView === 'camera' && (
                                        <div>
                                            {hasCameraPermission === false && (
                                                <Alert variant="destructive">
                                                    <AlertTitle>Camera Access Required</AlertTitle>
                                                    <AlertDescription>
                                                        Please allow camera access to use this feature.
                                                    </AlertDescription>
                                                </Alert>
                                            )}
                                            <div className="relative bg-secondary rounded-md overflow-hidden aspect-video">
                                                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                                            </div>
                                            <DialogFooter className="mt-4">
                                                <Button type="button" variant="secondary" onClick={() => setDialogView('options')}>Back</Button>
                                                <Button type="button" onClick={handleCapturePhoto} disabled={!hasCameraPermission}>Capture Photo</Button>
                                            </DialogFooter>
                                        </div>
                                    )}
                                    
                                     {dialogView === 'preview' && imagePreview && (
                                        <div className="space-y-4">
                                            <p className="text-sm text-center font-medium">Preview</p>
                                            <div className="flex justify-center">
                                                <Image src={imagePreview} alt="New profile photo preview" width={200} height={200} className="rounded-full object-cover aspect-square" />
                                            </div>
                                            <DialogFooter>
                                                <Button type="button" variant="secondary" onClick={resetDialog}>
                                                    <X className="mr-2" /> Discard
                                                </Button>
                                                <Button type="button" onClick={handleSavePhoto}>Save Photo</Button>
                                            </DialogFooter>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
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
