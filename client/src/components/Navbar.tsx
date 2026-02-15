import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@assets/Logo_(1)_1771118995327.png";

const NAV_LINKS = [
  { name: "Home", to: "home" },
  { name: "About", to: "about" },
  { name: "Programs", to: "programs" },
  { name: "Impact", to: "impact" },
  { name: "Events", to: "events" },
  { name: "Contact", to: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 py-4",
    scrolled
      ? "bg-white/95 backdrop-blur-md shadow-md py-3"
      : "bg-transparent py-5"
  );

  const textClasses = cn(
    "font-display font-bold text-lg tracking-tight transition-colors duration-300",
    scrolled ? "text-[#1E4E48]" : "text-white"
  );

  const linkClasses = cn(
    "cursor-pointer font-medium transition-colors hover:text-[#F83030]",
    scrolled ? "text-[#1E4E48]" : "text-white/90 hover:text-white"
  );

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <ScrollLink 
            to="home" 
            smooth={true} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src={logo} 
              alt="Good Vibe Tribe Logo" 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
            <span className={cn(textClasses, "hidden sm:block")}>
              Good Vibe Tribe
            </span>
          </ScrollLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className={linkClasses}
                activeClass="text-[#F83030] font-semibold"
              >
                {link.name}
              </ScrollLink>
            ))}
            <ScrollLink to="donate" smooth={true}>
              <Button 
                className={cn(
                  "rounded-full px-6 font-semibold shadow-lg transition-all hover:-translate-y-0.5",
                  scrolled 
                    ? "bg-[#F83030] hover:bg-[#C92828] text-white" 
                    : "bg-white text-[#F83030] hover:bg-gray-100"
                )}
              >
                <Heart className="w-4 h-4 mr-2 fill-current" />
                Donate
              </Button>
            </ScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-current"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={scrolled ? "text-[#1E4E48]" : "text-white"} />
            ) : (
              <Menu className={scrolled ? "text-[#1E4E48]" : "text-white"} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#103030] lg:hidden pt-24 px-6 pb-6 flex flex-col items-center justify-start gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-semibold text-white/90 hover:text-[#F83030]"
                >
                  {link.name}
                </ScrollLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-xs"
            >
              <ScrollLink to="donate" smooth={true} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#F83030] hover:bg-[#C92828] text-white rounded-full py-6 text-lg">
                  Donate Now
                </Button>
              </ScrollLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
