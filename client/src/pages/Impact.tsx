import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { PageTransition } from "@/components/PageTransition";

const WIXSTATIC_IMAGES = [
  "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg",
  "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg",
  "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg",
  "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_520,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg",
];

function StatCounter({ end, label, suffix }: { end: number; label: string; suffix: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="text-center p-6 rounded-xl hover:bg-white/5 transition-colors" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="font-display font-extrabold text-5xl md:text-6xl text-white mb-2">
        {inView ? <CountUp end={end} duration={2.5} separator="," /> : "0"}
        {suffix}
      </div>
      <p className="text-gray-300 font-medium mt-2">{label}</p>
    </div>
  );
}

export default function Impact() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <div className="relative py-28 bg-[#103030] text-white overflow-hidden pt-40">
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

        <Section id="gallery" variant="white">
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
                <div
                  className="absolute inset-0 bg-[#1E4E48]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  style={{ visibility: "visible" }}
                >
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

        <Footer />
      </div>
    </PageTransition>
  );
}
