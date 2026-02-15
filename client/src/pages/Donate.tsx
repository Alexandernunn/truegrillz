import { motion } from "framer-motion";
import { Heart, Users, Utensils, Gift, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/PageTransition";

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
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Every contribution helps us bless someone who needs it most.
                Powered by faith, fueled by community.
              </p>
            </motion.div>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 lg:p-8 text-[#1E4E48] shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#F83030]/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#F83030]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Support Our Mission</h3>
                    <p className="text-gray-500 text-sm">Fund mentorship programs and community events</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button className="flex-1 rounded-full bg-[#F83030] text-white" data-testid="button-onetime-mission">One-time</Button>
                  <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600" data-testid="button-monthly-mission">Monthly</Button>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[25, 50, 100, 250].map((amt) => (
                    <button key={amt} className="border border-gray-200 rounded-lg py-2.5 font-bold text-sm hover:border-[#F83030] hover:text-[#F83030] transition-colors focus:ring-2 focus:ring-[#F83030] focus:outline-none" data-testid={`button-donate-${amt}`}>
                      ${amt}
                    </button>
                  ))}
                </div>

                <Input placeholder="Custom Amount" type="number" className="mb-6" data-testid="input-custom-amount" />
                <Button className="w-full bg-[#F83030] text-white font-bold rounded-full shadow-lg" data-testid="button-donate-now">
                  Donate Now
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl p-6 lg:p-8 text-[#1E4E48] shadow-xl border border-gray-100 border-t-4 border-t-[#18A058]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#18A058]/10 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-[#18A058]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Adopt a Bus Stop</h3>
                    <p className="text-gray-500 text-sm">Every dollar feeds a child. No exceptions.</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600" data-testid="button-onetime-busstop">One-time</Button>
                  <Button className="flex-1 rounded-full bg-[#18A058] text-white" data-testid="button-monthly-busstop">Monthly</Button>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[10, 25, 50, 100].map((amt) => (
                    <button key={amt} className="border border-gray-200 rounded-lg py-2.5 font-bold text-sm hover:border-[#18A058] hover:text-[#18A058] transition-colors focus:ring-2 focus:ring-[#18A058] focus:outline-none" data-testid={`button-busstop-${amt}`}>
                      ${amt}
                    </button>
                  ))}
                </div>

                <Input placeholder="Custom Amount" type="number" className="mb-6" data-testid="input-busstop-amount" />
                <Button className="w-full bg-[#18A058] text-white font-bold rounded-full shadow-lg" data-testid="button-feed-child">
                  Feed a Child Today
                </Button>
              </motion.div>
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              * Secure payment processing integration coming soon. Contact us for direct donations.
            </p>
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
