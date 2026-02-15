import { ReactNode, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Users, Heart, Compass } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// === Pillar Card ===
interface PillarCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: "heart" | "compass" | "users";
  color: "red" | "green" | "teal";
  delay: number;
}

const PILLAR_ICONS = {
  heart: Heart,
  compass: Compass,
  users: Users,
};

const PILLAR_COLORS = {
  red: { bg: "bg-red-50", text: "text-[#F83030]", border: "border-[#F83030]" },
  green: { bg: "bg-green-50", text: "text-[#18A058]", border: "border-[#18A058]" },
  teal: { bg: "bg-teal-50", text: "text-[#1E4E48]", border: "border-[#1E4E48]" },
};

export function PillarCard({ title, subtitle, description, icon, color, delay }: PillarCardProps) {
  const Icon = PILLAR_ICONS[icon];
  const styles = PILLAR_COLORS[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 relative overflow-hidden group border border-gray-100"
    >
      <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6", styles.bg)}>
        <Icon className={cn("w-8 h-8", styles.text)} />
      </div>
      <h3 className="font-display font-bold text-2xl text-[#1E4E48] mb-2">{title}</h3>
      <p className={cn("font-medium mb-4", styles.text)}>{subtitle}</p>
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
      
      {/* Bottom accent line that grows on hover */}
      <div className={cn("absolute bottom-0 left-0 h-1 w-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300", styles.bg.replace("bg-", "bg-opacity-100 bg-"))} style={{ backgroundColor: color === 'red' ? '#F83030' : color === 'green' ? '#18A058' : '#1E4E48' }} />
    </motion.div>
  );
}

// === Event Card ===
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  color: "red" | "green" | "teal";
  image?: string;
}

export function EventCard({ title, date, location, description, category, color, image }: EventCardProps) {
  const btnColor = color === 'red' ? 'bg-[#F83030]' : color === 'green' ? 'bg-[#18A058]' : 'bg-[#1E4E48]';
  const badgeColor = color === 'red' ? 'bg-[#F83030]' : color === 'green' ? 'bg-[#18A058]' : 'bg-[#1E4E48]';

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100 group"
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
        )}
        <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity", badgeColor)} />
        <div className="absolute top-4 left-4">
          <span className={cn("px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider", badgeColor)}>
            {date}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{category}</div>
        <h3 className="font-display font-bold text-xl text-[#1E4E48] mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </div>
        
        <Button className={cn("w-full rounded-full text-white font-semibold", btnColor)} data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Learn More
        </Button>
      </div>
    </motion.div>
  );
}

// === Program Row ===
interface ProgramRowProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  reverse?: boolean;
  color: "red" | "green" | "teal";
  link?: string;
}

function ScrollVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        aria-label={title}
        data-testid={`video-${title.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  );
}

export function ProgramRow({ title, subtitle, description, image, video, reverse = false, color, link }: ProgramRowProps) {
  const textColor = color === 'red' ? 'text-[#F83030]' : color === 'green' ? 'text-[#18A058]' : 'text-[#1E4E48]';
  const bgColor = color === 'red' ? 'bg-[#F83030]' : color === 'green' ? 'bg-[#18A058]' : 'bg-[#1E4E48]';

  return (
    <div className={cn("flex flex-col lg:flex-row gap-12 items-center mb-24 last:mb-0", reverse && "lg:flex-row-reverse")}>
      <motion.div 
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
          <div className={cn("absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500 z-10", bgColor)} />
          {video ? (
            <ScrollVideo src={video} title={title} />
          ) : (
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:w-1/2"
      >
        <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider mb-4", bgColor)}>
          {subtitle}
        </span>
        <h3 className="font-display font-bold text-3xl md:text-4xl text-[#1E4E48] mb-6">{title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">{description}</p>
        <Link href={link || "/events"} className={cn("flex items-center font-bold text-lg group", textColor)} data-testid={`link-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Learn More <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
