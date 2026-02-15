import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { EventCard } from "@/components/Cards";
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

        <Section id="events" variant="white" className="pt-32">
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
                <div className="absolute inset-0 bg-[#103030]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" style={{ visibility: "visible" }}>
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
    </PageTransition>
  );
}
