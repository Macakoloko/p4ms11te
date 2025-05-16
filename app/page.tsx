"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Menu, Phone, MapPin, Clock, Instagram, Facebook, ChevronRight, Star, X } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import { siteData } from "./data"
import { Footer } from "@/components/Footer"

// Update navigation array to include galeria
const navigation = [...siteData.navigation]

// Featured photos from the anniversary album
const anniversaryPhotos = [
  {
    image: "/Aniversário PM/DESTAQUE.JPG",
    alt: "Aniversário P&M - Destaque"
  },
  {
    image: "/Aniversário PM/destaque2.JPG",
    alt: "Celebração Exclusiva"
  },
  {
    image: "/Aniversário PM/destaque3.JPG",
    alt: "Momentos Especiais"
  },
  {
    image: "/Aniversário PM/_DSC0014.JPG",
    alt: "Evento Comemorativo"
  },
  {
    image: "/Aniversário PM/_DSC0034.JPG",
    alt: "Decoração Premium"
  },
  {
    image: "/Aniversário PM/_DSC0074.JPG",
    alt: "Celebração de Aniversário"
  }
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("início")
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const currentSection = navigation.find((section) => {
        const element = sectionsRef.current[section]
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#f4f3ee] overflow-x-hidden">
      {/* Custom Cursor (visible on larger screens) */}
      <div className="custom-cursor hidden lg:block"></div>

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
            className="flex items-center gap-4"
          >
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
          </motion.div>

          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {navigation.map((item) => (
                <li key={item}>
                  <a
                    href={item === "galeria" ? "/galeria" : `#${item}`}
                    className={`text-sm uppercase tracking-wider transition-all duration-300 hover:text-[#d38b5d] ${
                      activeSection === item ? "font-semibold text-[#d38b5d]" : "font-light"
                    }`}
                  >
                    {item}
                  </a>
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
                  {navigation.map((item) => (
                    <SheetClose asChild key={item}>
                      <a
                        href={item === "galeria" ? "/galeria" : `#${item}`}
                        className="text-lg uppercase tracking-wider text-[#f4f3ee] hover:text-[#d38b5d] transition-colors flex items-center justify-between group"
                      >
                        {item}
                        <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
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

      {/* Hero Section */}
      <section
        id="início"
        ref={(el) => (sectionsRef.current["início"] = el)}
        className="relative h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a0800]/80 to-[#2a0800]/50 z-10" />
          <Image
            src={siteData.hero.backgroundImage || "/placeholder.svg?height=1080&width=1920"}
            alt="Beauty Spa Luxury"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center mt-16">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
              <motion.p variants={fadeIn} className="text-[#d38b5d] uppercase tracking-[0.2em] font-light">
                {siteData.tagline}
              </motion.p>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-light text-[#f4f3ee] leading-tight"
              >
                Seu momento de <span className="font-semibold italic">beleza</span> e <br className="hidden md:block" />
                <span className="font-semibold italic">bem-estar</span> exclusivo
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl text-[#f4f3ee]/80 max-w-xl mx-auto">
                {siteData.hero.subtitle}
              </motion.p>

              <motion.div variants={fadeIn} className="pt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#a15e49] hover:bg-[#a15e49]/90 text-white px-8 py-6 rounded-none" asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a 
                      href={`https://wa.me/351936322227?text=Olá, gostaria de agendar uma Experiência!`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {siteData.hero.primaryButton}
                    </a>
                  </motion.div>
                </Button>

                <Button
                  variant="outline"
                  className="bg-transparent border border-[#f4f3ee] text-[#f4f3ee] hover:bg-[#f4f3ee]/10 px-8 py-6 rounded-none"
                  asChild
                >
                  <motion.a href="#serviços" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {siteData.hero.secondaryButton}
                  </motion.a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <a href="#serviços" className="text-[#f4f3ee] flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest">Explore</span>
              <div className="h-10 w-[1px] bg-[#f4f3ee]/30"></div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="serviços" ref={(el) => (sectionsRef.current["serviços"] = el)} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeIn} className="text-[#a15e49] uppercase tracking-[0.2em] font-light mb-3">
              Nossos Serviços Premium
            </motion.p>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-[#2a0800] mb-6">
              Experiências <span className="font-semibold italic">Exclusivas</span>
            </motion.h2>
            <motion.div variants={fadeIn} className="h-[1px] w-24 bg-[#d38b5d] mx-auto"></motion.div>
          </motion.div>

          <Tabs defaultValue={siteData.services[0].id} className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-12">
              {siteData.services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="data-[state=active]:bg-[#a15e49] data-[state=active]:text-[#f4f3ee] px-6 py-3 rounded-none border border-[#a15e49] text-[#a15e49] hover:bg-[#a15e49]/10 transition-all uppercase tracking-wider text-sm"
                >
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {siteData.services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="relative h-[400px] lg:h-[500px] overflow-hidden group">
                    <div className="absolute inset-0 bg-[#2a0800]/20 z-10 group-hover:bg-[#2a0800]/10 transition-all duration-500"></div>
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-light text-[#2a0800] mb-3">{service.title}</h3>
                      <p className="text-[#464e47] text-lg">{service.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-[#2a0800]">Tratamentos Exclusivos</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-[#a15e49]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <ChevronRight className="h-4 w-4 text-[#a15e49]" />
                            </div>
                            <span className="text-[#464e47]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Button className="bg-[#2a0800] hover:bg-[#2a0800]/90 text-white px-8 py-6 rounded-none" asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <a 
                            href={`https://wa.me/351936322227?text=Olá, gostaria de agendar ${service.title}!`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Agendar {service.title.split("&")[0]}
                          </a>
                        </motion.div>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Gallery Preview Section (replaced Testimonials) */}
      <section
        id="experiência"
        ref={(el) => (sectionsRef.current["experiência"] = el)}
        className="py-24 bg-[#f4f3ee]"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-light mb-4 text-[#2a0800]">
              A Experiência <span className="font-semibold">P&M</span>
            </h2>
            <p className="text-[#2a0800]/70">
              Conheça nosso último evento de aniversário
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {anniversaryPhotos.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 w-full overflow-hidden group">
                      <div className="absolute inset-0 bg-[#2a0800]/20 z-10 group-hover:bg-[#2a0800]/10 transition-all duration-500"></div>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-4">
                <CarouselPrevious className="position-static bg-[#2a0800] hover:bg-[#2a0800]/80 text-[#f4f3ee]" />
                <CarouselNext className="position-static bg-[#2a0800] hover:bg-[#2a0800]/80 text-[#f4f3ee]" />
              </div>
            </Carousel>
            <div className="flex justify-center mt-12">
              <Button 
                className="bg-[#a15e49] hover:bg-[#a15e49]/90 text-[#f4f3ee] px-8 py-6 rounded-none"
                asChild
              >
                <Link href="/galeria">
                  Ver Galeria Completa
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="sobre"
        ref={(el) => (sectionsRef.current["sobre"] = el)}
        className="py-24 bg-[#2a0800] text-[#f4f3ee]"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-light mb-4">
                  {siteData.about.title}
                </h2>
                <p className="text-xl text-[#d38b5d] mb-8">
                  {siteData.about.subtitle}
                </p>
              </div>

              <div className="space-y-6 text-[#f4f3ee]/80">
                <p>{siteData.about.description}</p>
                <p>{siteData.about.mission}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12">
                {siteData.about.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-semibold text-[#d38b5d] mb-2">{stat.value}</div>
                    <div className="text-sm text-[#f4f3ee]/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="relative h-[500px] lg:h-[600px] z-10 overflow-hidden">
                  <Image
                    src={siteData.about.image}
                    alt={`${siteData.siteName} Interior`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-10 -right-10 h-full w-full border-2 border-[#a15e49] -z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        ref={el => {
          if (el) {
            sectionsRef.current["contacto"] = el;
            return () => { sectionsRef.current["contacto"] = null; };
          }
        }}
        className="py-24 bg-[#2a0800] text-[#f4f3ee]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-light mb-4">
                {siteData.contact.title}
              </h2>
              <p className="text-[#d38b5d]">{siteData.contact.subtitle}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-[#f4f3ee]/80 mb-8">{siteData.contact.description}</p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#a15e49]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#d38b5d]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Endereço</h4>
                    <p className="text-[#f4f3ee]/80">Rua do Matadouro, 55, Braga</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#a15e49]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-[#d38b5d]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Telefone</h4>
                    <p className="text-[#f4f3ee]/80">{siteData.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#a15e49]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#d38b5d]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Horário</h4>
                    {siteData.contact.hours.map((hour, index) => (
                      <p key={index} className="text-[#f4f3ee]/80">
                        {hour}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4 mt-8">Siga-nos</h4>
                <div className="flex gap-4">
                  <a
                    href={siteData.contact.social.instagram}
                    className="h-12 w-12 rounded-full border border-[#a15e49] flex items-center justify-center hover:bg-[#a15e49] transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={siteData.contact.social.facebook}
                    className="h-12 w-12 rounded-full border border-[#a15e49] flex items-center justify-center hover:bg-[#a15e49] transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#f4f3ee] p-1 rounded-sm h-[450px] w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2984.028291279581!2d-8.42598382346061!3d41.5514037701356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24fec752fc8de1%3A0xa9d2d4dda9a19ff5!2sR.%20do%20Matadouro%2055%2C%204700-037%20Braga!5e0!3m2!1spt-PT!2spt!4v1713123927726!5m2!1spt-PT!2spt" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização P&M Beauty Space"
                  className="rounded-sm"
                ></iframe>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-[#a15e49] hover:bg-[#a15e49]/90 text-[#f4f3ee]" asChild>
                  <a 
                    href={`https://wa.me/351936322227?text=Olá, gostaria de mais informações sobre os serviços!`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fale Connosco via WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Custom cursor styles */}
      <style jsx global>{`
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid #a15e49;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          transition: width 0.3s, height 0.3s, border-color 0.3s;
          mix-blend-mode: difference;
        }
        
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
          width: 60px;
          height: 60px;
          border-color: #d38b5d;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Custom cursor script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
              document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
              });
            }
          });
        `,
        }}
      />
    </div>
  )
}

