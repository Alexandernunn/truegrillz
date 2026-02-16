import { motion } from "framer-motion";
import { Heart, Users, Utensils, Gift, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";

const ZEFFY_URL = "https://www.zeffy.com/en-US/donation-form/paying-it-forward";

const IMPACT_ITEMS = [
  { icon: Utensils, value: "$10", label: "Feeds a child for a week", color: "bg-[#18A058]" },
  { icon: Users, value: "$50", label: "Supports a mentorship session", color: "bg-[#1E4E48]" },
  { icon: Gift, value: "$100", label: "Sponsors a family giveaway package", color: "bg-[#F83030]" },
];

export default function Donate() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <div className="relative py-24 lg:py-32 bg-gradient-to-br from-[#F83030] via-[#C92828] to-[#1E4E48] text-white overflow-hidden pt-32 lg:pt-40">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#18A058]/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Heart className="w-12 h-12 mx-auto mb-6 fill-current opacity-80" />
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">Pay It Forward</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
                Every contribution helps us bless someone who needs it most.
                Powered by faith, fueled by community.
              </p>
              <a href={ZEFFY_URL} target="_blank" rel="noreferrer">
                <Button className="bg-white text-[#F83030] rounded-full font-bold shadow-xl" size="lg" data-testid="button-donate-hero">
                  <Heart className="w-5 h-5 mr-2 fill-current" /> Donate Now <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 lg:p-12 text-center shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 rounded-full bg-[#F83030]/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#F83030]" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#1E4E48] mb-4">Support Our Mission</h2>
              <p className="text-gray-600 mb-4 max-w-lg mx-auto leading-relaxed">
                Your donation funds mentorship programs, community events, and our Adopt a Bus Stop initiative that feeds children across Nashville.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                All donations are securely processed through Zeffy — 100% of your contribution goes directly to our programs.
              </p>
              <a href={ZEFFY_URL} target="_blank" rel="noreferrer">
                <Button className="bg-[#F83030] text-white font-bold rounded-full shadow-lg px-10" size="lg" data-testid="button-donate-now">
                  Donate Now <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#F8FFF5]">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[#1E4E48] mb-3">Your Dollar Goes Further</h3>
              <p className="text-gray-600">See exactly how your contribution makes a difference.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {IMPACT_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md text-center border border-gray-100"
                >
                  <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-display font-extrabold text-3xl text-[#1E4E48] mb-2">{item.value}</div>
                  <p className="text-gray-600 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a href={ZEFFY_URL} target="_blank" rel="noreferrer">
                <Button className="bg-[#18A058] text-white font-bold rounded-full shadow-lg" size="lg" data-testid="button-donate-impact">
                  Make Your Impact <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#103030] text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xl md:text-2xl italic text-white/90 leading-relaxed mb-6">
                "I want this movement to inspire everyone to do something positive. We believe good people should benefit from doing the right thing."
              </p>
              <p className="text-[#18A058] font-semibold">— Good Vibe Tribe</p>
              <div className="mt-10">
                <Link href="/contact">
                  <Button variant="outline" className="border-2 border-white/30 text-white bg-transparent rounded-full font-bold" size="lg" data-testid="button-contact-us">
                    Questions? Contact Us <ArrowRight className="w-5 h-5 ml-2" />
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
