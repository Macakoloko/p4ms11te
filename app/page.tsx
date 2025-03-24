"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Menu, Phone, MapPin, Clock, Instagram, Facebook, ChevronRight, Star, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import { siteData } from "./data"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("início")
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const currentSection = siteData.navigation.find((section) => {
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
          scrolled ? "bg-[#2a0800] text-[#f4f3ee] py-3 shadow-lg" : "bg-transparent text-[#f4f3ee] py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#d38b5d] flex items-center justify-center bg-[#f4f3ee]">
              <Image
                src="https://res.cloudinary.com/dvopxlh1g/image/upload/v1742835343/pmbeauty/logos/eiln2k4fbsvksvoobxpu.png"
                alt={`${siteData.siteName} Logo`}
                width={32}
                height={32}
                className="object-contain w-auto h-auto"
              />
            </div>
            <span className="text-xl font-light tracking-wider">
              <span className="font-bold">P&M</span> Beauty Space
            </span>
          </motion.div>

          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {siteData.navigation.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
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
            <motion.a
              href={`tel:${siteData.contact.phone}`}
              className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider hover:text-[#d38b5d] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={16} />
              <span>Agendar</span>
            </motion.a>

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
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#d38b5d] bg-[#f4f3ee] flex items-center justify-center">
                      <Image
                        src="https://res.cloudinary.com/dvopxlh1g/image/upload/v1742835343/pmbeauty/logos/eiln2k4fbsvksvoobxpu.png"
                        alt={`${siteData.siteName} Logo`}
                        width={24}
                        height={24}
                        className="object-contain w-auto h-auto"
                      />
                    </div>
                    <span className="text-lg font-light tracking-wider">
                      <span className="font-bold">P&M</span>
                    </span>
                  </div>
                  <SheetClose className="rounded-full p-1 hover:bg-[#a15e49]/20">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-6 mt-8">
                  {siteData.navigation.map((item) => (
                    <SheetClose asChild key={item}>
                      <a
                        href={`#${item}`}
                        className="text-lg uppercase tracking-wider text-[#f4f3ee] hover:text-[#d38b5d] transition-colors flex items-center justify-between group"
                      >
                        {item}
                        <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="absolute bottom-8 left-6 right-6">
                  <Button className="w-full bg-[#a15e49] hover:bg-[#a15e49]/90 text-[#f4f3ee]">
                    <Phone className="mr-2 h-4 w-4" />
                    Agendar Consulta
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
              <motion.p variants={fadeIn} className="text-[#d38b5d] uppercase tracking-[0.2em] font-light">
                {siteData.tagline}
              </motion.p>

              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-6xl lg:text-7xl font-light text-[#f4f3ee] leading-tight"
              >
                Seu momento de <span className="font-semibold italic">beleza</span> e <br className="hidden md:block" />
                <span className="font-semibold italic">bem-estar</span> exclusivo
              </motion.h1>

              <motion.p variants={fadeIn} className="text-lg text-[#f4f3ee]/80 max-w-xl mx-auto">
                {siteData.hero.subtitle}
              </motion.p>

              <motion.div variants={fadeIn} className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#a15e49] hover:bg-[#a15e49]/90 text-white px-8 py-6 rounded-none" asChild>
                  <motion.a href="#contacto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {siteData.hero.primaryButton}
                  </motion.a>
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
                      <p className="text-xl font-light text-[#2a0800] mb-6">
                        <span className="font-medium">{service.price}</span>
                      </p>
                      <Button className="bg-[#2a0800] hover:bg-[#2a0800]/90 text-white px-8 py-6 rounded-none" asChild>
                        <motion.a href="#contacto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          Agendar {service.title.split("&")[0]}
                        </motion.a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
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
              O que nossas clientes dizem sobre sua jornada de beleza e bem-estar conosco.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.testimonials.map((testimonial, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white p-8 shadow-sm relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2a0800]">{testimonial.name}</h4>
                    <p className="text-sm text-[#2a0800]/60">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#2a0800]/80 mb-6">{testimonial.content}</p>
                <div className="flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#d38b5d] fill-[#d38b5d]" />
                  ))}
                </div>
              </motion.div>
            ))}
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

      {/* Gallery Section */}
      <section className="py-24 bg-[#f4f3ee]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-light mb-4 text-[#2a0800]">
              Nossa <span className="font-semibold">Galeria</span>
            </h2>
            <p className="text-[#2a0800]/70">
              Conheça nosso espaço e ambiente de relaxamento
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteData.gallery.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="relative h-64 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[#2a0800]/20 z-10 group-hover:bg-[#2a0800]/10 transition-all duration-500"></div>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        ref={(el) => (sectionsRef.current["contacto"] = el)}
        className="py-24 bg-[#2a0800] text-[#f4f3ee]"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-light mb-4">
              {siteData.contact.title}
            </h2>
            <p className="text-[#d38b5d]">{siteData.contact.subtitle}</p>
          </motion.div>

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
                    <p className="text-[#f4f3ee]/80">{siteData.contact.address}</p>
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
              <div className="bg-[#f4f3ee] p-8 rounded-sm">
                <h3 className="text-xl font-medium text-[#2a0800] mb-6">Agende sua consulta</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#2a0800]/70 mb-2">Nome</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-[#d38b5d]/20 text-[#2a0800]"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2a0800]/70 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-white border border-[#d38b5d]/20 text-[#2a0800]"
                        placeholder="Seu email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#2a0800]/70 mb-2">Assunto</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-[#d38b5d]/20 text-[#2a0800]"
                      placeholder="Assunto"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2a0800]/70 mb-2">Mensagem</label>
                    <textarea
                      className="w-full px-4 py-3 bg-white border border-[#d38b5d]/20 text-[#2a0800] h-32"
                      placeholder="Sua mensagem"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-[#a15e49] hover:bg-[#a15e49]/90 text-[#f4f3ee]">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2a0800] text-[#f4f3ee] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#d38b5d] bg-[#f4f3ee] flex items-center justify-center">
                  <Image
                    src="https://res.cloudinary.com/dvopxlh1g/image/upload/v1742835343/pmbeauty/logos/eiln2k4fbsvksvoobxpu.png"
                    alt={`${siteData.siteName} Logo`}
                    width={32}
                    height={32}
                    className="object-contain w-auto h-auto"
                  />
                </div>
                <span className="text-xl font-light tracking-wider">
                  <span className="font-bold">P&M</span> Beauty Space
                </span>
              </div>
              <p className="text-[#f4f3ee]/70 mb-6">{siteData.footer.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                {siteData.footer.quickLinks.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-[#f4f3ee]/70 hover:text-[#d38b5d] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-6">Newsletter</h4>
              <p className="text-[#f4f3ee]/70 mb-4">Inscreva-se para receber novidades e ofertas exclusivas.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="px-4 py-3 bg-[#f4f3ee]/10 border-none outline-none flex-grow text-[#f4f3ee]"
                />
                <Button className="bg-[#a15e49] hover:bg-[#a15e49]/90 rounded-none">Enviar</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#f4f3ee]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#f4f3ee]/70 text-sm">
              &copy; {new Date().getFullYear()} {siteData.siteName}. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {siteData.footer.legal.map((item, index) => (
                <a key={index} href="#" className="text-[#f4f3ee]/70 hover:text-[#d38b5d] text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

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

