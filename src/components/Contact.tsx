'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

/**
 * "Made by Vansszh" footer with three sticker-style contact links.
 * Drop in at the bottom of any page.
 */
export const Contact = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="sticker p-6 md:p-7"
      style={{ background: '#FFFFFF' }}
    >
      <div className="text-center mb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-soft mb-1">
          Contact
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-ink leading-none">
          Made by <span className="rainbow-text">Vansszh</span>
        </h3>
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        <ContactLink
          href="https://x.com/vansszh_"
          label="@vansszh_"
          bg="#1B1B2F"
          textColor="#FFFFFF"
          icon={<XLogo />}
        />
        <ContactLink
          href="mailto:vansszh@gmail.com"
          label="vansszh@gmail.com"
          bg="#FF5C8A"
          textColor="#FFFFFF"
          icon={<Mail className="w-4 h-4" strokeWidth={3} />}
        />
        <ContactLink
          href="https://www.linkedin.com/in/vansszh/"
          label="vansszh"
          bg="#0A66C2"
          textColor="#FFFFFF"
          icon={<Linkedin className="w-4 h-4" strokeWidth={3} fill="currentColor" />}
        />
      </div>
    </motion.div>
  );
};

const ContactLink = ({
  href,
  label,
  bg,
  textColor,
  icon,
}: {
  href: string;
  label: string;
  bg: string;
  textColor: string;
  icon: React.ReactNode;
}) => {
  const isExternal = href.startsWith('http');
  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2, rotate: -1 }}
      whileTap={{ scale: 0.96 }}
      className="sticker-sm sticker-press-sm flex items-center gap-2 px-4 py-2.5 font-extrabold text-sm md:text-base"
      style={{ background: bg, color: textColor }}
    >
      {icon}
      {label}
    </motion.a>
  );
};

// Lucide-react doesn't ship a current "X" mark, so render the brand glyph inline.
const XLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);
