import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/PageTransition";

export default function Donate() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <section className="py-24 pt-40 bg-gradient-to-br from-[#F83030] to-[#1E4E48] text-white min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Pay It Forward</h2>
              <p className="text-xl text-white/90">
                Every contribution helps us bless someone who needs it most.
                Powered by faith, fueled by community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 text-[#1E4E48] shadow-2xl">
                <h3 className="font-display font-bold text-2xl mb-2">Support Our Mission</h3>
                <p className="text-gray-600 mb-6">Fund mentorship programs and community events.</p>

                <div className="flex gap-2 mb-6">
                  <Button className="flex-1 rounded-full bg-[#F83030] hover:bg-[#C92828] text-white">One-time</Button>
                  <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600 hover:text-[#F83030]">Monthly</Button>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[25, 50, 100, 250].map((amt) => (
                    <button key={amt} className="border border-gray-200 rounded-lg py-2 font-bold hover:border-[#F83030] hover:text-[#F83030] transition-colors focus:ring-2 focus:ring-[#F83030]" data-testid={`button-donate-${amt}`}>
                      ${amt}
                    </button>
                  ))}
                </div>

                <Input placeholder="Custom Amount" type="number" className="mb-6" data-testid="input-custom-amount" />
                <Button className="w-full bg-[#F83030] hover:bg-[#C92828] text-white font-bold h-12 rounded-full text-lg shadow-lg" data-testid="button-donate-now">
                  Donate Now
                </Button>
              </div>

              <div className="bg-white rounded-2xl p-8 text-[#1E4E48] shadow-2xl border-t-8 border-[#18A058]">
                <h3 className="font-display font-bold text-2xl mb-2">Adopt a Bus Stop</h3>
                <p className="text-gray-600 mb-6">Every dollar feeds a child. No exceptions.</p>

                <div className="flex gap-2 mb-6">
                  <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600 hover:text-[#18A058]">One-time</Button>
                  <Button className="flex-1 rounded-full bg-[#18A058] hover:bg-[#107040] text-white">Monthly</Button>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[10, 25, 50, 100].map((amt) => (
                    <button key={amt} className="border border-gray-200 rounded-lg py-2 font-bold hover:border-[#18A058] hover:text-[#18A058] transition-colors focus:ring-2 focus:ring-[#18A058]" data-testid={`button-busstop-${amt}`}>
                      ${amt}
                    </button>
                  ))}
                </div>

                <Input placeholder="Custom Amount" type="number" className="mb-6" data-testid="input-busstop-amount" />
                <Button className="w-full bg-[#18A058] hover:bg-[#107040] text-white font-bold h-12 rounded-full text-lg shadow-lg" data-testid="button-feed-child">
                  Feed a Child Today
                </Button>
              </div>
            </div>
            <p className="text-center text-white/60 text-sm mt-8">
              * Secure payment processing integration coming soon. Contact us for direct donations.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
