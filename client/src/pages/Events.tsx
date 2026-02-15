import { motion } from "framer-motion";
import { Instagram, ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { EventCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";

const INSTAGRAM_GRID_IMAGES = [
  { src: "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg", caption: "Forward together" },
  { src: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg", caption: "Leaving a positive impact" },
  { src: "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg", caption: "Adopt a Bus Stop" },
  { src: "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg", caption: "Community events" },
  { src: "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg", caption: "Still rising" },
  { src: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/crop/x_0,y_0,w_1905,h_693/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg", caption: "We're all figuring it out" },
];

export default function Events() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <div className="relative py-24 lg:py-32 bg-gradient-to-br from-[#1E4E48] to-[#103030] text-white overflow-hidden pt-32 lg:pt-40">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#18A058]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F83030]/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#18A058] text-xs font-bold uppercase tracking-widest mb-6">
                <Calendar className="w-3 h-3 inline mr-1.5 -mt-0.5" />Get Involved
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Upcoming Events & Gatherings
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Join us at our next event and experience the power of community firsthand. Every gathering is an opportunity to grow.
              </p>
            </motion.div>
          </div>
        </div>

        <Section id="events" variant="white">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <EventCard
              title="Annual Community Giveaway"
              date="Dec 2025"
              category="Signature Event"
              description="Providing essential items, warm meals, and community connection to Nashville families in need."
              location="Nashville, TN"
              color="red"
              image="https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_700,h_350,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg"
            />
            <EventCard
              title="Youth Mentorship Session"
              date="Monthly"
              category="Mentorship"
              description="One-on-one and group mentoring sessions connecting Nashville youth with experienced guides."
              location="East Nashville Center"
              color="green"
              image="https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_700,h_350,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg"
            />
            <EventCard
              title="Adopt a Bus Stop"
              date="Weekly"
              category="Volunteer"
              description="Help prepare and distribute meals to children at bus stops across Nashville communities."
              location="Various Locations"
              color="teal"
              image="https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_700,h_350,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg"
            />
          </div>
        </Section>

        <section className="py-16 md:py-20 bg-[#F0F7F4]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[#1E4E48] mb-4">Want to Volunteer?</h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                We're always looking for passionate people to join our mission. No experience needed — just a willingness to help.
              </p>
              <Link href="/contact">
                <Button className="bg-[#18A058] text-white rounded-full font-bold shadow-lg" size="lg" data-testid="button-volunteer-cta">
                  Sign Up to Volunteer <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Section id="social" variant="white">
          <SectionHeader
            label="@goodvibetribe615"
            title="Follow Us on Instagram"
            subtitle="Photos from our community — real moments, real impact."
          />
          <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            {INSTAGRAM_GRID_IMAGES.map((img, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/goodvibetribe615"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-md group relative block"
                data-testid={`img-instagram-${i}`}
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#103030]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-opacity p-3" style={{ visibility: "visible" }}>
                  <span className="text-white font-semibold text-xs md:text-sm text-center">{img.caption}</span>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://instagram.com/goodvibetribe615"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F83030] to-[#E1306C] text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              data-testid="link-instagram-profile"
            >
              <Instagram className="w-5 h-5" /> Follow @goodvibetribe615
            </a>
          </div>
        </Section>

        <Footer />
      </div>
    </PageTransition>
  );
}
