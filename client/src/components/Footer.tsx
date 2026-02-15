import { Instagram, MapPin, Phone, Heart } from "lucide-react";
import { Link } from "wouter";
import logo from "@assets/Logo_(1)_1771118995327.png";

const QUICK_LINKS = [
  { name: "Home", to: "/" },
  { name: "About", to: "/#about" },
  { name: "Programs", to: "/#programs" },
  { name: "Events", to: "/events" },
  { name: "Contact", to: "/contact" },
];

export function Footer() {
  const handleNavClick = (to: string) => {
    if (to.startsWith("/#")) {
      window.location.href = to;
    }
  };

  return (
    <footer className="bg-[#103030] text-white pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Good Vibe Tribe" className="h-12 w-auto brightness-0 invert" />
              <span className="font-display font-bold text-xl">Good Vibe Tribe</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering Nashville through kindness, mentorship, and community.
              Together, we prove that when people stick together, every life can flourish.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/goodvibetribe615"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F83030] transition-colors"
                data-testid="link-footer-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-[#18A058]">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.name}>
                  {item.to.startsWith("/#") ? (
                    <button
                      onClick={() => handleNavClick(item.to)}
                      className="text-gray-400 hover:text-white cursor-pointer transition-colors hover:translate-x-1 inline-block bg-transparent border-none"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.to}
                      className="text-gray-400 hover:text-white cursor-pointer transition-colors hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/donate"
                  className="text-[#F83030] hover:text-white font-medium cursor-pointer transition-colors inline-flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" /> Donate Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-[#18A058]">Our Programs</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-400">Youth Mentorship</span></li>
              <li><span className="text-gray-400">Adopt a Bus Stop</span></li>
              <li><span className="text-gray-400">Community Giveaways</span></li>
              <li><span className="text-gray-400">Volunteer Drives</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-[#18A058]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F83030] mt-1 shrink-0" />
                <span className="text-gray-400">Nashville, Tennessee</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F83030] shrink-0" />
                <a href="tel:6156006083" className="text-gray-400 hover:text-white">(615) 600-6083</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-[#F83030] shrink-0" />
                <a href="https://instagram.com/goodvibetribe615" className="text-gray-400 hover:text-white">@goodvibetribe615</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Good Vibe Tribe. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Powered by Faith and Community
          </p>
        </div>
      </div>
    </footer>
  );
}
