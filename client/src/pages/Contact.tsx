import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";
import { PageTransition } from "@/components/PageTransition";

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const submitContact = useSubmitContact();
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate(contactForm, {
      onSuccess: () => {
        toast({ title: "Message Sent!", description: "We'll get back to you soon." });
        setContactForm({ name: "", email: "", subject: "", message: "" });
      },
      onError: () => {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      },
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <Section id="contact" variant="cream" className="pt-32">
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
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="bg-gray-50 border-gray-200 h-12"
                    placeholder="John Doe"
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <Input
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="bg-gray-50 border-gray-200 h-12"
                    type="email"
                    placeholder="john@example.com"
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Subject</label>
                  <Select onValueChange={(v) => setContactForm({ ...contactForm, subject: v })}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 h-12" data-testid="select-subject">
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
                    className="bg-gray-50 border-gray-200 min-h-[120px]"
                    placeholder="How can we help?"
                    data-testid="input-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full bg-[#F83030] hover:bg-[#C92828] text-white font-bold h-12 rounded-full text-lg shadow-md"
                  data-testid="button-send-message"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </Section>

        <Footer />
      </div>
    </PageTransition>
  );
}
