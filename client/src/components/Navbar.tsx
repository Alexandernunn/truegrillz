import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@assets/Logo_(1)_1771118995327.png";

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "About", to: "/#about" },
  { name: "Programs", to: "/#programs" },
  { name: "Impact", to: "/impact" },
  { name: "Events", to: "/events" },
  { name: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const showTransparent = isHome && !scrolled;

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 py-4",
    showTransparent
      ? "bg-transparent py-5"
      : "bg-white/95 backdrop-blur-md shadow-md py-3"
  );

  const textClasses = cn(
    "font-display font-bold text-lg tracking-tight transition-colors duration-300",
    showTransparent ? "text-white" : "text-[#1E4E48]"
  );

  const linkClasses = cn(
    "cursor-pointer font-medium transition-colors hover:text-[#F83030]",
    showTransparent ? "text-white/90 hover:text-white" : "text-[#1E4E48]"
  );

  const handleNavClick = (to: string) => {
    setMobileMenuOpen(false);
    if (to.startsWith("/#")) {
      const sectionId = to.replace("/#", "");
      if (isHome) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        setLocation("/");
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 400);
      }
    }
  };

  return (
    <>
      <nav className={navClasses} data-testid="navbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
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
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isHashLink = link.to.startsWith("/#");
              const isActive = !isHashLink && location === link.to;

              if (isHashLink) {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.to)}
                    className={cn(linkClasses, "bg-transparent border-none")}
                    data-testid={`nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.to}
                  className={cn(linkClasses, isActive && "text-[#F83030] font-semibold")}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link href="/donate">
              <Button
                className={cn(
                  "rounded-full px-6 font-semibold shadow-lg transition-all hover:-translate-y-0.5",
                  showTransparent
                    ? "bg-white text-[#F83030] hover:bg-gray-100"
                    : "bg-[#F83030] hover:bg-[#C92828] text-white"
                )}
                data-testid="nav-donate-button"
              >
                <Heart className="w-4 h-4 mr-2 fill-current" />
                Donate
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-current"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className={showTransparent ? "text-white" : "text-[#1E4E48]"} />
            ) : (
              <Menu className={showTransparent ? "text-white" : "text-[#1E4E48]"} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#103030] lg:hidden pt-24 px-6 pb-6 flex flex-col items-center justify-start gap-8"
          >
            {NAV_LINKS.map((link, i) => {
              const isHashLink = link.to.startsWith("/#");

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {isHashLink ? (
                    <button
                      onClick={() => handleNavClick(link.to)}
                      className="text-2xl font-display font-semibold text-white/90 hover:text-[#F83030] bg-transparent border-none"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-display font-semibold text-white/90 hover:text-[#F83030]"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-xs"
            >
              <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#F83030] hover:bg-[#C92828] text-white rounded-full py-6 text-lg">
                  Donate Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
