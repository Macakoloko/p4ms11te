"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, Phone, ChevronRight, X, Expand, ChevronLeft, ChevronUp, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import { siteData } from "../data"
import { Footer } from "@/components/Footer"

// All photos in a single array
const allPhotos = [
  "/Aniversário PM/DESTAQUE.JPG",
  "/Aniversário PM/destaque2.JPG",
  "/Aniversário PM/destaque3.JPG",
  "/Aniversário PM/_DSC0003.JPG",
  "/Aniversário PM/_DSC0006.JPG",
  "/Aniversário PM/_DSC0008.JPG",
  "/Aniversário PM/_DSC0010.JPG",
  "/Aniversário PM/_DSC0014.JPG",
  "/Aniversário PM/_DSC0017.JPG",
  "/Aniversário PM/_DSC0020.JPG",
  "/Aniversário PM/_DSC0021.JPG",
  "/Aniversário PM/_DSC0029.JPG",
  "/Aniversário PM/_DSC0031.JPG",
  "/Aniversário PM/_DSC0034.JPG",
  "/Aniversário PM/_DSC0057.JPG",
  "/Aniversário PM/_DSC0062.JPG",
  "/Aniversário PM/_DSC0066.JPG",
  "/Aniversário PM/_DSC0068.JPG",
  "/Aniversário PM/_DSC0074.JPG",
  "/Aniversário PM/_DSC0076.JPG",
  "/Aniversário PM/_DSC0079.JPG",
  "/Aniversário PM/_DSC0081.JPG",
  "/Aniversário PM/_DSC0083.JPG",
  "/Aniversário PM/_DSC0089.JPG",
  "/Aniversário PM/_DSC0090.JPG",
  "/Aniversário PM/_DSC0094.JPG",
  "/Aniversário PM/_DSC0097.JPG",
  "/Aniversário PM/_DSC0098.JPG",
  "/Aniversário PM/_DSC0099.JPG",
  "/Aniversário PM/_DSC0103.JPG",
  "/Aniversário PM/_DSC0106.JPG",
  "/Aniversário PM/_DSC0107.JPG",
  "/Aniversário PM/_DSC0109.JPG",
  "/Aniversário PM/_DSC0112.JPG",
  "/Aniversário PM/_DSC0114.JPG",
  "/Aniversário PM/_DSC0115.JPG",
  "/Aniversário PM/_DSC0116.JPG",
  "/Aniversário PM/_DSC0119.JPG",
  "/Aniversário PM/_DSC0127.JPG",
  "/Aniversário PM/_DSC0133.JPG",
  "/Aniversário PM/_DSC0147.JPG",
  "/Aniversário PM/_DSC0156.JPG",
  "/Aniversário PM/_DSC0157.JPG",
  "/Aniversário PM/_DSC0161.JPG",
  "/Aniversário PM/_DSC0164.JPG",
  "/Aniversário PM/_DSC0165.JPG",
  "/Aniversário PM/_DSC0167.JPG",
  "/Aniversário PM/_DSC0171.JPG",
  "/Aniversário PM/_DSC0176.JPG",
  "/Aniversário PM/_DSC0177.JPG",
]

// Featured photos for the hero section
const heroImages = [
  {
    url: "/Aniversário PM/DESTAQUE.JPG",
    title: "Aniversário P&M",
    subtitle: "Celebrando momentos especiais"
  },
  {
    url: "/Aniversário PM/destaque2.JPG",
    title: "Momentos Únicos",
    subtitle: "Explore nossa galeria de fotos"
  },
  {
    url: "/Aniversário PM/destaque3.JPG",
    title: "Celebração Exclusiva",
    subtitle: "Conheça um pouco mais do nosso espaço"
  }
]

// Create a grid of photos for display
const createPhotoGrid = (photos: string[], itemsPerRow = 4): string[][] => {
  const rows: string[][] = [];
  for (let i = 0; i < photos.length; i += itemsPerRow) {
    rows.push(photos.slice(i, i + itemsPerRow));
  }
  return rows;
}

export default function GaleriaPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [visiblePhotos, setVisiblePhotos] = useState(8) // Initially show 8 photos
  const [isLoading, setIsLoading] = useState(false) // Loading state for the Load More button
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Load more photos with simulated loading time
  const loadMorePhotos = () => {
    setIsLoading(true)
    
    // Simulate network request with setTimeout
    setTimeout(() => {
      setVisiblePhotos(prev => Math.min(prev + 8, allPhotos.length))
      setIsLoading(false)
    }, 800) // 800ms delay simulates loading
  }

  // Navigation through photos
  const goToNextPhoto = () => {
    if (selectedPhotoIndex === null) return
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % allPhotos.length)
  }

  const goToPrevPhoto = () => {
    if (selectedPhotoIndex === null) return
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + allPhotos.length) % allPhotos.length)
  }

  // Handle key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return

      if (e.key === 'ArrowRight') {
        goToNextPhoto()
      } else if (e.key === 'ArrowLeft') {
        goToPrevPhoto()
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Create photo grid for display - but only with visible photos
  const visiblePhotosList = allPhotos.slice(0, visiblePhotos)
  const photoGrid = createPhotoGrid(visiblePhotosList)

  // Check if all photos are loaded
  const allPhotosLoaded = visiblePhotos >= allPhotos.length

  return (
    <div className="min-h-screen bg-[#f4f3ee]">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#2a0800] text-[#f4f3ee] py-3 shadow-lg" : "bg-transparent text-[#f4f3ee] py-4"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-4">
              <div className="relative h-16 w-auto flex items-center">
                <Image
                  src="https://res.cloudinary.com/dvopxlh1g/image/upload/v1742835348/pmbeauty/logos/j0yxo2egfymnswkawkju.png"
                  alt={`${siteData.siteName} Logo`}
                  width={190}
                  height={64}
                  className="object-contain w-auto h-full"
                  priority
                />
              </div>
              <span className="text-2xl font-light tracking-wide">P&M Beauty Space</span>
            </Link>
          </motion.div>

          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {siteData.navigation.map((item) => (
                <li key={item}>
                  <Link
                    href={item === "galeria" ? "/galeria" : `/#${item}`}
                    className={`text-sm uppercase tracking-wider transition-all duration-300 hover:text-[#d38b5d] ${
                      item === "galeria" ? "font-semibold text-[#d38b5d]" : "font-light"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`https://wa.me/351936322227?text=Olá, gostaria de agendar uma consulta!`}
                className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider hover:text-[#d38b5d] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={16} />
                <span>Agendar</span>
              </a>
            </motion.div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-[#f4f3ee]">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#2a0800] text-[#f4f3ee] border-l border-[#a15e49]/30">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="relative h-14 w-auto flex items-center">
                      <Image
                        src="https://res.cloudinary.com/dvopxlh1g/image/upload/v1742835348/pmbeauty/logos/j0yxo2egfymnswkawkju.png"
                        alt={`${siteData.siteName} Logo`}
                        width={150}
                        height={56}
                        className="object-contain w-auto h-full"
                      />
                    </div>
                  </div>
                  <SheetClose className="rounded-full p-1 hover:bg-[#a15e49]/20">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-6 mt-8">
                  {siteData.navigation.map((item) => (
                    <SheetClose asChild key={item}>
                      <Link
                        href={item === "galeria" ? "/galeria" : `/#${item}`}
                        className="text-lg uppercase tracking-wider text-[#f4f3ee] hover:text-[#d38b5d] transition-colors flex items-center justify-between group"
                      >
                        {item}
                        <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="absolute bottom-8 left-6 right-6">
                  <Button className="w-full bg-[#a15e49] hover:bg-[#a15e49]/90 text-[#f4f3ee]" asChild>
                    <a 
                      href={`https://wa.me/351936322227?text=Olá, gostaria de agendar uma consulta!`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Agendar Consulta
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section with Slider */}
      <section className="relative h-screen">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="relative h-screen">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2a0800]/80 to-[#2a0800]/50 z-10" />
                <div className="absolute inset-0">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="text-center text-[#f4f3ee]">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-5xl md:text-6xl lg:text-7xl font-light mb-4"
                    >
                      {image.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-xl text-[#f4f3ee]/80"
                    >
                      {image.subtitle}
                    </motion.p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
            <Button size="icon" variant="outline" className="bg-[#2a0800]/50 border-[#f4f3ee] text-[#f4f3ee] hover:bg-[#2a0800]" asChild>
              <CarouselPrevious />
            </Button>
            <Button size="icon" variant="outline" className="bg-[#2a0800]/50 border-[#f4f3ee] text-[#f4f3ee] hover:bg-[#2a0800]" asChild>
              <CarouselNext />
            </Button>
          </div>
        </Carousel>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-4xl font-light text-[#2a0800] mb-4 text-center">
              Aniversário <span className="font-semibold">P&M</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-[#2a0800]/70 max-w-2xl mx-auto text-center mb-16">
              Explore nossa coleção completa de fotos do aniversário P&M Beauty Space
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {photoGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {row.map((photo: string, colIndex: number) => {
                  const photoIndex = rowIndex * 4 + colIndex;
                  return (
                    <motion.div
                      key={photoIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: photoIndex % 4 * 0.1 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedPhotoIndex(photoIndex)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-[#2a0800]/20 group-hover:bg-[#2a0800]/40 transition-all duration-300 z-10" />
                        <Image
                          src={photo}
                          alt={`Foto ${photoIndex + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <Expand className="text-[#f4f3ee] h-8 w-8" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Load More Button */}
            {!allPhotosLoaded && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center mt-16"
              >
                <Button 
                  onClick={loadMorePhotos}
                  disabled={isLoading}
                  className="bg-[#a15e49] hover:bg-[#a15e49]/90 text-[#f4f3ee] px-8 py-6 flex items-center gap-2 rounded-none"
                >
                  {isLoading ? (
                    <>
                      Carregando
                      <span className="ml-1 inline-block">
                        <span className="inline-flex h-2 w-2 mr-1 bg-[#f4f3ee] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="inline-flex h-2 w-2 mr-1 bg-[#f4f3ee] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        <span className="inline-flex h-2 w-2 bg-[#f4f3ee] rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></span>
                      </span>
                    </>
                  ) : (
                    <>
                      Ver Mais Fotos
                      <ChevronDown className="h-5 w-5 animate-pulse" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Viewer Dialog with Navigation */}
      <Dialog open={selectedPhotoIndex !== null} onOpenChange={() => setSelectedPhotoIndex(null)}>
        <DialogContent className="max-w-7xl bg-[#2a0800]/95 border-none p-0">
          {selectedPhotoIndex !== null && (
            <div className="relative">
              <div className="relative h-[80vh]">
                <Image
                  src={allPhotos[selectedPhotoIndex]}
                  alt={`Foto ${selectedPhotoIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Navigation Controls */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-[#2a0800]/70 border-[#f4f3ee] text-[#f4f3ee] hover:bg-[#2a0800] h-12 w-12 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevPhoto();
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-[#2a0800]/70 border-[#f4f3ee] text-[#f4f3ee] hover:bg-[#2a0800] h-12 w-12 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextPhoto();
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#f4f3ee]">
                <p className="bg-[#2a0800]/70 px-4 py-2 rounded-full text-sm">
                  {selectedPhotoIndex + 1} / {allPhotos.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      {visiblePhotos > 8 && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button 
            onClick={scrollToTop}
            className="h-12 w-12 rounded-full bg-[#a15e49] hover:bg-[#a15e49]/90 text-[#f4f3ee] shadow-lg"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  )
} 