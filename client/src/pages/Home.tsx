import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDown, Heart, Check } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { PillarCard, ProgramRow, EventCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

// === Images (using reliable Wixstatic sources from goodvibetribe.info) ===
const HERO_IMG = "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg";
const MENTOR_IMG = "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_800,h_533,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg";
const ABOUT_IMG = "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_800,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg";
const MEALS_IMG = "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_543,h_720,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg";
const COMMUNITY_IMG = "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_800,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg";

const WIXSTATIC_IMAGES = [
  "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg",
  "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg",
  "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg",
  "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg",
];

const INSTAGRAM_GRID_IMAGES = [
  { src: "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg", caption: "Forward together" },
  { src: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg", caption: "Leaving a positive impact" },
  { src: "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg", caption: "Adopt a Bus Stop" },
  { src: "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg", caption: "Community events" },
  { src: "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg", caption: "Still rising" },
  { src: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/crop/x_0,y_0,w_1905,h_693/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg", caption: "We're all figuring it out" },
];

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const submitContact = useSubmitContact();
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    submitContact.mutate({
      name: contactForm.name,
      email: contactForm.email,
      subject: contactForm.subject || "General Inquiry",
      message: contactForm.message
    }, {
      onSuccess: () => setContactForm({ name: "", email: "", subject: "", message: "" })
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E4E48] selection:bg-[#F83030] selection:text-white">
      <Navbar />

      {/* === HERO SECTION === */}
      <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Parallax */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F83030]/80 to-[#1E4E48]/90 mix-blend-multiply z-10" />
          <img src={HERO_IMG} alt="Community" className="w-full h-full object-cover" />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center text-white max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm font-semibold tracking-wide uppercase mb-6">
              Nashville Community Relief
            </span>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight mb-8">
              More Than an Organization. <br className="hidden md:block" />
              <span className="text-[#F8F898]">A Way of Life.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 max-w-2xl mx-auto">
              Good Vibe Tribe unites Nashville through mentorship, youth programs, and community support — inspiring growth, hope, and lasting change.
            </p>
            <p className="text-lg text-[#F8F898]/90 italic leading-relaxed mb-10 max-w-2xl mx-auto">
              "I want this movement to inspire everyone to do something positive. We believe good people should benefit from doing the right thing."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ScrollLink to="events" smooth={true} offset={-80}>
                <Button className="bg-white text-[#1E4E48] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-bold shadow-lg w-full sm:w-auto">
                  Get Involved
                </Button>
              </ScrollLink>
              <ScrollLink to="donate" smooth={true}>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-lg font-bold w-full sm:w-auto bg-transparent">
                  Donate Now
                </Button>
              </ScrollLink>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 z-20"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* === ABOUT SECTION === */}
      <Section id="about" variant="cream">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#18A058] font-bold tracking-wider text-sm uppercase mb-2 block">Who We Are</span>
            <h2 className="font-display font-bold text-4xl text-[#1E4E48] mb-6">Empowering Communities Through Kindness and Connection</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Good Vibe Tribe is committed to fostering meaningful community service through engaging events aimed at uplifting individuals and promoting collaboration. 
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From mentorship programs to community giveaways, we create spaces where genuine connections thrive and every person finds their potential.
            </p>
            <blockquote className="border-l-4 border-[#F83030] pl-6 italic text-xl text-[#1E4E48] font-medium">
              "I want this movement to inspire everyone to do something positive. We believe good people should benefit from doing the right thing."
              <footer className="text-sm text-gray-500 mt-2 not-italic font-sans">— Good Vibe Tribe</footer>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img src={ABOUT_IMG} alt="Volunteers" className="rounded-[2rem] shadow-2xl w-full object-cover aspect-square" />
            <div className="absolute -bottom-8 -left-8 bg-[#18A058] text-white p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="font-display font-bold text-2xl">Est. 2023</p>
              <p className="text-white/80">Nashville, TN</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* === PILLARS SECTION === */}
      <Section id="purpose" variant="white">
        <SectionHeader 
          label="Our Mission Matters"
          title="The Three Pillars That Guide Everything We Do"
          subtitle="Built on straight-forward compassion, positive energy, and conviction."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          <PillarCard 
            title="Authenticity"
            subtitle="Straight-Forward Compassion"
            description="We lead with genuine care and positive energy. We don't pretend to be perfect — we're real people with good intentions."
            icon="heart"
            color="red"
            delay={0}
          />
          <PillarCard 
            title="Mentorship"
            subtitle="Guiding the Next Generation"
            description="Through humility and honesty, we guide young minds away from adversity and toward opportunity and confidence."
            icon="compass"
            color="green"
            delay={0.2}
          />
          <PillarCard 
            title="Community"
            subtitle="Strength in Togetherness"
            description="From giveaways to workshops, we create events that strengthen bonds and foster a genuine sense of belonging."
            icon="users"
            color="teal"
            delay={0.4}
          />
        </div>
      </Section>

      {/* === PROGRAMS SECTION === */}
      <Section id="programs" variant="light">
        <SectionHeader 
          label="What We Do"
          title="Programs That Create Lasting Impact"
        />

        <div className="space-y-24">
          <ProgramRow 
            title="Guiding Young Minds"
            subtitle="Youth Development"
            description="Our mentorship program connects experienced volunteers with Nashville's youth, providing dedicated support, guidance, and resources. Through meaningful one-on-one relationships, young people gain the confidence and skills they need."
            image={MENTOR_IMG}
            color="red"
          />
          <ProgramRow 
            title="Adopt a Bus Stop"
            subtitle="Child Nutrition"
            description="Every child deserves access to daily nutrition without exception. Our Adopt a Bus Stop initiative ensures that kids across Nashville have the meals they need to learn, grow, and thrive."
            image={MEALS_IMG}
            reverse={true}
            color="green"
          />
          <ProgramRow 
            title="Community Events & Giveaways"
            subtitle="Community Building"
            description="From our annual community giveaways to concerts, paintball outings, and volunteer drives, our events bring Nashville together. Each gathering creates opportunities to connect and share experiences."
            image={COMMUNITY_IMG}
            color="teal"
          />
        </div>
      </Section>

      {/* === IMPACT SECTION === */}
      <div id="impact" className="relative py-28 bg-[#103030] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeader 
            title="The Ripple Effect of Generosity"
            subtitle="Every donation and volunteer hour creates waves of positive change across Nashville."
            dark={true}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <StatCounter end={500} label="Youth Mentored" suffix="+" />
            <StatCounter end={1000} label="Meals Provided" suffix="+" />
            <StatCounter end={50} label="Events Hosted" suffix="+" />
            <StatCounter end={200} label="Active Volunteers" suffix="+" />
          </div>
        </div>
      </div>

      {/* === EVENTS SECTION === */}
      <Section id="events" variant="white">
        <SectionHeader 
          label="Get Involved"
          title="Upcoming Events & Gatherings"
          subtitle="Join us at our next event and experience the power of community firsthand."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          <EventCard 
            title="Annual Community Giveaway"
            date="Dec 2025"
            category="Signature Event"
            description="Providing essential items, warm meals, and community connection to Nashville families in need."
            location="Nashville, TN"
            color="red"
          />
          <EventCard 
            title="Youth Mentorship Session"
            date="Monthly"
            category="Mentorship"
            description="One-on-one and group mentoring sessions connecting Nashville youth with experienced guides."
            location="East Nashville Center"
            color="green"
          />
          <EventCard 
            title="Adopt a Bus Stop"
            date="Weekly"
            category="Volunteer"
            description="Help prepare and distribute meals to children at bus stops across Nashville communities."
            location="Various Locations"
            color="teal"
          />
        </div>
      </Section>

      {/* === DONATE SECTION === */}
      <section id="donate" className="py-24 bg-gradient-to-br from-[#F83030] to-[#1E4E48] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-4xl mb-6">Pay It Forward</h2>
            <p className="text-xl text-white/90">
              Every contribution helps us bless someone who needs it most. 
              Powered by faith, fueled by community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* General Donation */}
            <div className="bg-white rounded-2xl p-8 text-[#1E4E48] shadow-2xl">
              <h3 className="font-display font-bold text-2xl mb-2">Support Our Mission</h3>
              <p className="text-gray-600 mb-6">Fund mentorship programs and community events.</p>
              
              <div className="flex gap-2 mb-6">
                <Button className="flex-1 rounded-full bg-[#F83030] hover:bg-[#C92828] text-white">One-time</Button>
                <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600 hover:text-[#F83030]">Monthly</Button>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[25, 50, 100, 250].map((amt) => (
                  <button key={amt} className="border border-gray-200 rounded-lg py-2 font-bold hover:border-[#F83030] hover:text-[#F83030] transition-colors focus:ring-2 focus:ring-[#F83030]">
                    ${amt}
                  </button>
                ))}
              </div>
              
              <Input placeholder="Custom Amount" type="number" className="mb-6" />
              <Button className="w-full bg-[#F83030] hover:bg-[#C92828] text-white font-bold h-12 rounded-full text-lg shadow-lg">
                Donate Now
              </Button>
            </div>

            {/* Program Specific */}
            <div className="bg-white rounded-2xl p-8 text-[#1E4E48] shadow-2xl border-t-8 border-[#18A058]">
              <h3 className="font-display font-bold text-2xl mb-2">Adopt a Bus Stop</h3>
              <p className="text-gray-600 mb-6">Every dollar feeds a child. No exceptions.</p>
              
              <div className="flex gap-2 mb-6">
                <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600 hover:text-[#18A058]">One-time</Button>
                <Button className="flex-1 rounded-full bg-[#18A058] hover:bg-[#107040] text-white">Monthly</Button>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[10, 25, 50, 100].map((amt) => (
                  <button key={amt} className="border border-gray-200 rounded-lg py-2 font-bold hover:border-[#18A058] hover:text-[#18A058] transition-colors focus:ring-2 focus:ring-[#18A058]">
                    ${amt}
                  </button>
                ))}
              </div>
              
              <Input placeholder="Custom Amount" type="number" className="mb-6" />
              <Button className="w-full bg-[#18A058] hover:bg-[#107040] text-white font-bold h-12 rounded-full text-lg shadow-lg">
                Feed a Child Today
              </Button>
            </div>
          </div>
          <p className="text-center text-white/60 text-sm mt-8">
            * Secure payment processing integration coming soon. Contact us for direct donations.
          </p>
        </div>
      </section>

      {/* === CONTACT SECTION === */}
      <Section id="contact" variant="cream">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[#F83030] font-bold tracking-wider text-sm uppercase mb-2 block">Get in Touch</span>
            <h2 className="font-display font-bold text-4xl text-[#1E4E48] mb-6">Let's Build Something Together</h2>
            <p className="text-lg text-gray-600 mb-10">
              Whether you want to volunteer, partner, donate, or simply learn more about our mission, we'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#18A058]/10 flex items-center justify-center text-[#18A058]">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-[#1E4E48]">Visit Us</p>
                  <p className="text-gray-600">Nashville, TN</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#18A058]/10 flex items-center justify-center text-[#18A058]">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-[#1E4E48]">Call Us</p>
                  <p className="text-gray-600">(615) 600-6083</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <Input 
                  value={contactForm.name}
                  onChange={e => setContactForm({...contactForm, name: e.target.value})}
                  className="bg-gray-50 border-gray-200 h-12" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <Input 
                  value={contactForm.email}
                  onChange={e => setContactForm({...contactForm, email: e.target.value})}
                  className="bg-gray-50 border-gray-200 h-12" 
                  type="email" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject</label>
                <Select onValueChange={v => setContactForm({...contactForm, subject: v})}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 h-12">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="partner">Partnership</SelectItem>
                    <SelectItem value="donate">Donation</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <Textarea 
                  value={contactForm.message}
                  onChange={e => setContactForm({...contactForm, message: e.target.value})}
                  className="bg-gray-50 border-gray-200 min-h-[120px]" 
                  placeholder="How can we help?" 
                />
              </div>
              <Button 
                type="submit" 
                disabled={submitContact.isPending}
                className="w-full bg-[#F83030] hover:bg-[#C92828] text-white font-bold h-12 rounded-full text-lg shadow-md"
              >
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </Section>

      {/* === GALLERY WITH GOODVIBETRIBE.INFO IMAGES === */}
      <Section id="media" variant="white">
        <SectionHeader
          label="From goodvibetribe.info"
          title="Our Community in Action"
          subtitle="Real photos from our events, programs, and the people who make it all happen."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {WIXSTATIC_IMAGES.map((src, i) => (
            <motion.a
              key={i}
              href="https://www.goodvibetribe.info/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden shadow-md group relative block"
              data-testid={`img-wixstatic-${i}`}
            >
              <img 
                src={src} 
                alt={`Event highlight ${i + 1}`} 
                className="w-full aspect-square object-cover transition-transform group-hover:scale-105" 
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#1E4E48]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" style={{ visibility: 'visible' }}>
                <span className="text-white font-bold text-sm">View on goodvibetribe.info</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.goodvibetribe.info/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#1E4E48] text-white font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            data-testid="link-gvt-site"
          >
            Visit goodvibetribe.info
          </a>
        </div>
      </Section>

      {/* === INSTAGRAM 3x2 PHOTO GRID === */}
      <Section id="social" variant="light">
        <SectionHeader 
          label="@goodvibetribe615"
          title="Follow Us on Instagram"
          subtitle="Photos from our community — real moments, real impact."
        />
        <div className="grid grid-cols-3 grid-rows-2 gap-4 max-w-4xl mx-auto">
          {INSTAGRAM_GRID_IMAGES.map((img, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/goodvibetribe615"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-xl overflow-hidden shadow-md group relative block"
              data-testid={`img-instagram-${i}`}
            >
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-[#103030]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" style={{ visibility: 'visible' }}>
                <span className="text-white font-bold text-sm text-center px-2">{img.caption}</span>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a 
            href="https://instagram.com/goodvibetribe615" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F83030] to-[#E1306C] text-white font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            data-testid="link-instagram-profile"
          >
            Follow @goodvibetribe615 on Instagram
          </a>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

function StatCounter({ end, label, suffix }: { end: number, label: string, suffix: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  
  return (
    <div ref={ref} className="text-center p-6 rounded-xl hover:bg-white/5 transition-colors">
      <div className="font-display font-extrabold text-5xl md:text-6xl text-white mb-2">
        {inView ? <CountUp end={end} duration={2.5} separator="," /> : '0'}
        <span className="text-[#F83030]">{suffix}</span>
      </div>
      <p className="text-[#F8F898] font-medium text-lg uppercase tracking-wide">{label}</p>
    </div>
  );
}
