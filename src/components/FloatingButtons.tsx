import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingButtons: React.FC = () => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
    <a
      href="https://wa.me/40720000000"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
    <a
      href="tel:+40720000000"
      className="w-12 h-12 rounded-full bg-emergency text-emergency-foreground flex items-center justify-center shadow-lg animate-pulse-border hover:scale-110 transition-transform"
      aria-label="Emergency"
    >
      <Phone className="w-6 h-6" />
    </a>
  </div>
);

export default FloatingButtons;
