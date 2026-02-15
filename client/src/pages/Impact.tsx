import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Heart, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";

const GALLERY_IMAGES = [
  { src: "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg", alt: "Community mentorship event" },
  { src: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg", alt: "Youth program participants" },
  { src: "https://static.wixstatic.com/media/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_cac5239a894f450ba6a41e8bde13fa6ef000.jpg", alt: "Adopt a Bus Stop program" },
  { src: "https://static.wixstatic.com/media/3b4e52_c076dc6a72c244a4a4ba89dcd6e6df9d~mv2.jpeg/v1/crop/x_2,y_0,w_1278,h_854/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22C19768-3581-459A-AB4A-498599512CEF_JPEG.jpeg", alt: "Community giveaway" },
  { src: "https://static.wixstatic.com/media/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg/v1/crop/x_0,y_0,w_1905,h_693/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3b4e52_09e44ec8791342a38b9fafe125928840~mv2.jpg", alt: "Volunteer gathering" },
  { src: "https://static.wixstatic.com/media/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/3b4e52_8a80efdc057644ab906504526c278af6f000.jpg", alt: "Community connection" },
];

const STATS = [
  { end: 1000, label: "People Helped", suffix: "+", description: "Lives touched through our community programs" },
  { end: 1000, label: "Meals Served", suffix: "+", description: "Nutritious meals served to children in need" },
  { end: 3, label: "Events Held", suffix: "", description: "Community gatherings bringing Nashville together" },
];

function StatCounter({ end, label, suffix, description, delay }: { end: number; label: string; suffix: string; description: string; delay: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center p-6 lg:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-2">
        {inView ? <CountUp end={end} duration={2.5} separator="," /> : "0"}
        {suffix}
      </div>
      <p className="text-white font-semibold text-lg mb-1">{label}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
}

export default function Impact() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <div className="relative py-28 lg:py-36 bg-[#103030] text-white overflow-hidden pt-36 lg:pt-44">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#18A058]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F83030]/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#18A058] text-xs font-bold uppercase tracking-widest mb-6">
                Our Impact
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                The Ripple Effect <br className="hidden md:block" />of Generosity
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Every donation and volunteer hour creates waves of positive change across Nashville. Here's the difference we've made together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {STATS.map((stat, i) => (
                <StatCounter key={stat.label} {...stat} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        <Section id="gallery" variant="white">
          <SectionHeader
            label="From goodvibetribe.info"
            title="Our Community in Action"
            subtitle="Real photos from our events, programs, and the people who make it all happen."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.a
                key={i}
                href="https://www.goodvibetribe.info/"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl overflow-hidden shadow-md group relative block aspect-square"
                data-testid={`img-gallery-${i}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1E4E48]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-opacity p-4"
                  style={{ visibility: "visible" }}
                >
                  <span className="text-white font-semibold text-sm flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> View on goodvibetribe.info
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.goodvibetribe.info/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#1E4E48] text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              data-testid="link-gvt-site"
            >
              Visit goodvibetribe.info <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Section>

        <section className="relative py-20 md:py-28 bg-gradient-to-r from-[#F83030] to-[#C92828] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-12 h-12 mx-auto mb-6 fill-current opacity-80" />
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">Help Us Grow the Impact</h2>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                Every contribution, no matter the size, helps us reach more youth, serve more meals, and bring more of Nashville together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/donate">
                  <Button className="bg-white text-[#F83030] rounded-full font-bold shadow-xl" size="lg" data-testid="button-impact-donate">
                    Donate Today
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" className="border-2 border-white/40 text-white bg-transparent rounded-full font-bold" size="lg" data-testid="button-impact-events">
                    View Events <ArrowRight className="w-5 h-5 ml-2" />
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
