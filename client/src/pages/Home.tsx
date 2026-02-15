import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import adoptBusStopVideo from "@assets/AQO1WTN4NrnqaH1Ni9YwDlw9OkGWpL0tpqS2ZbhLYcCe7F6yXPdRot8A84UA_9_1771138179054.mp4";
import aboutVideo from "@assets/bus_stops_video.mp4";
import { Link } from "wouter";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { PillarCard, ProgramRow } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";

// === Images (using reliable Wixstatic sources from goodvibetribe.info) ===
const HERO_IMG = "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg";
const MENTOR_IMG = "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_800,h_533,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg";
const ABOUT_IMG = "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_800,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg";
const MEALS_IMG = "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_543,h_720,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg";
const COMMUNITY_IMG = "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_800,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg";


function ScrollVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <PageTransition>
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
              <Link href="/events">
                <Button className="bg-white text-[#1E4E48] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-bold shadow-lg w-full sm:w-auto" data-testid="button-get-involved">
                  Get Involved
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-lg font-bold w-full sm:w-auto bg-transparent" data-testid="button-donate-hero">
                  Donate Now
                </Button>
              </Link>
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
            <ScrollVideo src={aboutVideo} className="rounded-[2rem] shadow-2xl w-full overflow-hidden aspect-square" />
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
            link="/impact"
          />
          <ProgramRow 
            title="Adopt a Bus Stop"
            subtitle="Child Nutrition"
            description="Every child deserves access to daily nutrition without exception. Our Adopt a Bus Stop initiative ensures that kids across Nashville have the meals they need to learn, grow, and thrive."
            image={MEALS_IMG}
            video={adoptBusStopVideo}
            reverse={true}
            color="green"
            link="/donate"
          />
          <ProgramRow 
            title="Community Events & Giveaways"
            subtitle="Community Building"
            description="From our annual community giveaways to concerts, paintball outings, and volunteer drives, our events bring Nashville together. Each gathering creates opportunities to connect and share experiences."
            image={COMMUNITY_IMG}
            color="teal"
            link="/events"
          />
        </div>
      </Section>

      <Footer />
    </div>
    </PageTransition>
  );
}
