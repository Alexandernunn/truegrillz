import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check, MapPin, Phone, Instagram, Mail, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PageTransition } from "@/components/PageTransition";

const CONTACT_INFO = [
  { icon: MapPin, label: "Visit Us", value: "Nashville, Tennessee", color: "bg-[#F83030]/10 text-[#F83030]" },
  { icon: Phone, label: "Call Us", value: "(615) 600-6083", href: "tel:6156006083", color: "bg-[#18A058]/10 text-[#18A058]" },
  { icon: Instagram, label: "Follow Us", value: "@goodvibetribe615", href: "https://instagram.com/goodvibetribe615", color: "bg-[#E1306C]/10 text-[#E1306C]" },
  { icon: Mail, label: "Email Us", value: "Contact form below", color: "bg-[#1E4E48]/10 text-[#1E4E48]" },
];

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xjgewljd", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        toast({ title: "Message Sent!", description: "We'll get back to you soon." });
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <div className="relative py-24 lg:py-32 bg-gradient-to-br from-[#1E4E48] to-[#103030] text-white overflow-hidden pt-32 lg:pt-40">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#18A058]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F83030]/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#18A058] text-xs font-bold uppercase tracking-widest mb-6">
                Get in Touch
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Let's Build Something Together
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Whether you want to volunteer, partner, donate, or simply learn more about our mission, we'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>

        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mx-auto mb-3`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-[#1E4E48] text-sm mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-gray-500 text-sm hover:text-[#F83030] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Section id="contact" variant="cream">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display font-bold text-3xl text-[#1E4E48] mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have a question, idea, or just want to say hello? Fill out the form and we'll get back to you as soon as we can.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#18A058]/10 flex items-center justify-center text-[#18A058] shrink-0 mt-0.5">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E4E48]">Volunteer Opportunities</p>
                    <p className="text-gray-500 text-sm">We'll match you with a program that fits your skills and schedule.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F83030]/10 flex items-center justify-center text-[#F83030] shrink-0 mt-0.5">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E4E48]">Partnerships</p>
                    <p className="text-gray-500 text-sm">Let's collaborate to create even more positive impact together.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#F83030]/5 to-transparent border-l-4 border-[#F83030] pl-5 py-3 rounded-r-lg">
                <p className="italic text-[#1E4E48] text-sm leading-relaxed">
                  "Good people should benefit from doing the right thing."
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <Input
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="bg-gray-50 border-gray-200"
                        placeholder="John Doe"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <Input
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="bg-gray-50 border-gray-200"
                        type="email"
                        placeholder="john@example.com"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Subject</label>
                    <Select onValueChange={(v) => setContactForm({ ...contactForm, subject: v })}>
                      <SelectTrigger className="bg-gray-50 border-gray-200" data-testid="select-subject">
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
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="bg-gray-50 border-gray-200 min-h-[140px]"
                      placeholder="How can we help?"
                      data-testid="input-message"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F83030] text-white font-bold rounded-full shadow-md"
                    data-testid="button-send-message"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Section>

        <section className="py-16 md:py-20 bg-[#103030] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">Want to Support Us Instead?</h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                If you'd like to make a financial contribution, visit our donation page to see how your generosity helps Nashville.
              </p>
              <Link href="/donate">
                <Button className="bg-[#F83030] text-white rounded-full font-bold shadow-xl" size="lg" data-testid="button-cta-donate">
                  <Heart className="w-5 h-5 mr-2 fill-current" /> Donate Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
