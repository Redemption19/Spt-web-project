"use client";

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// export const metadata: Metadata = {
//   title: 'Gallery | Standard Pensions Trust',
//   description: 'View our image gallery showcasing events, facilities, and moments at Standard Pensions Trust.',
// };

export default function GalleryPage() {
  // Placeholder for gallery images data - replace with actual image data (e.g., from a CMS or local assets)
  const galleryImages = [
    { id: '1', src: 'https://images.pexels.com/photos/10173004/pexels-photo-10173004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Office interior with team members', category: 'Office' },
    { id: '2', src: 'https://images.pexels.com/photos/13936647/pexels-photo-13936647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Team meeting in a modern conference room', category: 'Team' },
    { id: '3', src: 'https://images.pexels.com/photos/8353793/pexels-photo-8353793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Financial documents and calculations', category: 'Work' },
    { id: '4', src: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Professional portrait of a team member', category: 'Team' },
    { id: '5', src: 'https://images.pexels.com/photos/7063777/pexels-photo-7063777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Person reviewing documents', category: 'Work' },
    { id: '6', src: 'https://images.pexels.com/photos/10173004/pexels-photo-10173004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Another view of office interior', category: 'Office' },
  ];

  const [open, setOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const [selectedImageAlt, setSelectedImageAlt] = useState('');

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImageSrc(src);
    setSelectedImageAlt(alt);
    setOpen(true);
  };

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center bg-card rounded-lg p-8 sm:p-10 md:p-12 border border-border/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Our Gallery</h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Explore moments from our events, a glimpse into our offices, and the people who make Standard Pensions Trust a leading financial institution.
        </p>
      </section>

      {/* Image Gallery Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Visual Showcase</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden rounded-lg group border border-border/50 shadow-sm">
              <div className="relative h-60 w-full cursor-pointer" onClick={() => handleImageClick(image.src, image.alt)}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">{image.category}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-foreground font-medium text-lg">{image.alt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background/90">
          <div className="relative w-full h-[80vh]">
            <Image src={selectedImageSrc} alt={selectedImageAlt} fill className="object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 