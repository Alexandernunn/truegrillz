import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  variant?: "white" | "cream" | "light" | "dark";
  fullWidth?: boolean;
}

const VARIANTS = {
  white: "bg-white text-[#1E4E48]",
  cream: "bg-[#F8FFF5] text-[#1E4E48]", // Light Cream
  light: "bg-[#F0F7F4] text-[#1E4E48]", // Cool Light
  dark: "bg-[#103030] text-white",      // Dark Teal
};

export function Section({ id, className, children, variant = "white", fullWidth = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "py-20 md:py-28 overflow-hidden", 
        VARIANTS[variant],
        className
      )}
    >
      <div className={cn("mx-auto px-4 md:px-8", fullWidth ? "w-full" : "max-w-7xl")}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ 
  label, 
  title, 
  subtitle, 
  centered = true,
  dark = false
}: { 
  label?: string; 
  title: string; 
  subtitle?: string; 
  centered?: boolean;
  dark?: boolean;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16 max-w-3xl", centered && "mx-auto text-center")}
    >
      {label && (
        <span className={cn(
          "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4",
          dark ? "bg-white/10 text-[#18A058]" : "bg-[#18A058]/10 text-[#18A058]"
        )}>
          {label}
        </span>
      )}
      <h2 className={cn(
        "font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight",
        dark ? "text-white" : "text-[#1E4E48]"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg md:text-xl leading-relaxed",
          dark ? "text-gray-300" : "text-gray-600"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
