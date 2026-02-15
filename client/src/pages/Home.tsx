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

// === Images ===
const HERO_IMG = "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1021,h_681/fill/w_1349,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg";
const MENTOR_IMG = "https://lh3.googleusercontent.com/d/1LytFYEomz7eMVGaN-ZBDgc1L5zy70gVQ";
const ABOUT_IMG = "https://lh3.googleusercontent.com/d/1LKHQnL0xVLFg6pXxkSY06bk144oFWdfv";
const MEALS_IMG = "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_543,h_305,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg";
const COMMUNITY_IMG = "https://scontent-den2-1.cdninstagram.com/v/t51.71878-15/587653429_833878459251471_277270254532439369_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_9_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5";

// Social/Instagram Placeholders
const SOCIAL_POSTS = [
  "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/627965665_17864939904568787_5495629343880620021_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_5_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5",
  "https://scontent-den2-1.cdninstagram.com/v/t51.71878-15/630106954_26557527413839470_6866466320700869668_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_2_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5",
  "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/628033879_17864939838568787_7943023268721415121_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_3_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5",
  "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/628198523_17864939487568787_5128103398848135111_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_5_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5",
  "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/627697573_17864939133568787_7745597901954125121_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_6_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5",
  "https://scontent-den2-1.cdninstagram.com/v/t51.71878-15/625419811_1600785954294358_9833602751248015111_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de2a&_nc_ohc=y4p0Q-3m6YUAX_7_H8P&_nc_ht=scontent-den2-1.cdninstagram.com&oh=00_AfC4G2P8v4WJ4f8_8W7-S5z4_8v4WJ4f8_8W7-S5z4&oe=65C4F8D5"
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
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              Good Vibe Tribe unites Nashville through mentorship, youth programs, and community support — inspiring growth, hope, and lasting change.
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
              "It's not about me — it's about us."
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

      <Footer />

      {/* === SOCIAL FEED === */}
      <Section id="social" variant="light">
        <SectionHeader 
          label="Follow the Tribe"
          title="Stay Connected on Social Media"
          subtitle="@goodvibetribe615"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_POSTS.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-xl overflow-hidden shadow-md group relative"
            >
              <img src={img} alt={`Social post ${i + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#103030]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white font-bold text-sm">View Post</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
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
