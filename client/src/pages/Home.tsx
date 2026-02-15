import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Heart, Users, Star } from "lucide-react";
import { Link } from "wouter";

const adoptBusStopVideo = "/adopt-bus-stop.mp4";
const aboutVideo = "/about-video.mp4";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { PillarCard, ProgramRow } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";

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

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="font-display font-extrabold text-3xl md:text-4xl text-white">{value}</div>
      <div className="text-white/70 text-sm mt-1">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <PageTransition>
    <div className="min-h-screen bg-white font-sans text-[#1E4E48] selection:bg-[#F83030] selection:text-white">
      <Navbar />

      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#1E4E48]/70 to-[#103030]/90 z-10" />
          <img src={HERO_IMG} alt="Community" className="w-full h-full object-cover" />
        </motion.div>

        <div className="relative z-20 container mx-auto px-4 text-center text-white max-w-5xl pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs font-bold tracking-widest uppercase mb-8">
              Nashville Community Relief
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              More Than an Organization. <br className="hidden md:block" />
              <span className="text-[#F8F898]">A Way of Life.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-4 max-w-2xl mx-auto">
              Good Vibe Tribe unites Nashville through mentorship, youth programs, and community support — inspiring growth, hope, and lasting change.
            </p>
            <p className="text-base md:text-lg text-[#F8F898]/80 italic leading-relaxed mb-10 max-w-xl mx-auto">
              "I want this movement to inspire everyone to do something positive. We believe good people should benefit from doing the right thing."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/events">
                <Button className="bg-white text-[#1E4E48] rounded-full font-bold shadow-lg w-full sm:w-auto" size="lg" data-testid="button-get-involved">
                  Get Involved
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" className="border-2 border-white text-white rounded-full font-bold w-full sm:w-auto bg-transparent" size="lg" data-testid="button-donate-hero">
                  Donate Now
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-lg mx-auto">
            <QuickStat value="1K+" label="People Helped" />
            <QuickStat value="1K+" label="Meals Served" />
            <QuickStat value="3" label="Events Held" />
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 z-20"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      <Section id="purpose" variant="white">
        <SectionHeader
          label="Our Mission Matters"
          title="The Three Pillars That Guide Everything We Do"
          subtitle="Built on straight-forward compassion, positive energy, and conviction."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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
            delay={0.15}
          />
          <PillarCard
            title="Community"
            subtitle="Strength in Togetherness"
            description="From giveaways to workshops, we create events that strengthen bonds and foster a genuine sense of belonging."
            icon="users"
            color="teal"
            delay={0.3}
          />
        </div>
      </Section>

      <Section id="about" variant="cream">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#18A058] font-bold tracking-wider text-xs uppercase mb-3 block">Who We Are</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#1E4E48] mb-6 leading-tight">Empowering Communities Through Kindness</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Good Vibe Tribe is committed to fostering meaningful community service through engaging events aimed at uplifting individuals and promoting collaboration.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              From mentorship programs to community giveaways, we create spaces where genuine connections thrive and every person finds their potential.
            </p>

            <div className="bg-gradient-to-r from-[#F83030]/5 to-transparent border-l-4 border-[#F83030] pl-6 py-4 mb-8 rounded-r-lg">
              <p className="italic text-lg text-[#1E4E48] font-medium leading-relaxed">
                "I want this movement to inspire everyone to do something positive. We believe good people should benefit from doing the right thing."
              </p>
              <p className="text-sm text-gray-500 mt-2 not-italic">— Good Vibe Tribe</p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F83030]/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#F83030]" />
                </div>
                <div>
                  <p className="font-bold text-[#1E4E48] text-sm">Faith-Driven</p>
                  <p className="text-xs text-gray-500">Powered by belief</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#18A058]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#18A058]" />
                </div>
                <div>
                  <p className="font-bold text-[#1E4E48] text-sm">Community-Led</p>
                  <p className="text-xs text-gray-500">By the people</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E4E48]/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#1E4E48]" />
                </div>
                <div>
                  <p className="font-bold text-[#1E4E48] text-sm">Nashville Born</p>
                  <p className="text-xs text-gray-500">Est. 2023</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <ScrollVideo src={aboutVideo} className="rounded-2xl shadow-2xl w-full overflow-hidden aspect-[4/5]" />
            <div className="absolute -bottom-6 -left-6 bg-[#18A058] text-white p-5 rounded-xl shadow-xl hidden md:block">
              <p className="font-display font-bold text-xl">Est. 2023</p>
              <p className="text-white/80 text-sm">Nashville, TN</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#F83030] text-white p-4 rounded-xl shadow-xl hidden md:block">
              <Heart className="w-6 h-6 fill-current" />
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="programs" variant="light">
        <SectionHeader
          label="What We Do"
          title="Programs That Create Lasting Impact"
        />

        <div className="space-y-20 lg:space-y-28">
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
            title="Guiding Young Minds"
            subtitle="Youth Development"
            description="Our mentorship program connects experienced volunteers with Nashville's youth, providing dedicated support, guidance, and resources. Through meaningful one-on-one relationships, young people gain the confidence and skills they need."
            image={MENTOR_IMG}
            color="red"
            link="/impact"
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

      <section className="relative py-20 md:py-28 bg-gradient-to-r from-[#1E4E48] to-[#103030] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#F83030] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#18A058] rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you donate, volunteer, or simply spread the word — every action creates a ripple of positive change across Nashville.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button className="bg-[#F83030] text-white rounded-full font-bold shadow-xl" size="lg" data-testid="button-cta-donate">
                  <Heart className="w-5 h-5 mr-2 fill-current" /> Donate Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white/30 text-white bg-transparent rounded-full font-bold" size="lg" data-testid="button-cta-contact">
                  Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
  );
}
