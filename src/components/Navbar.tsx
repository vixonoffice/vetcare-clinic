import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n, useTr } from '@/lib/i18n';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PawIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-primary group-hover:animate-paw-wag">
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5-2c-.83 0-1.5.67-1.5 1.5S6.67 11 7.5 11 9 10.33 9 9.5 8.33 8 7.5 8zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S17.33 8 16.5 8zM12 16c-2.21 0-4-1.79-4-4h1.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5H16c0 2.21-1.79 4-4 4zm-2.5-9c-.83 0-1.5-.67-1.5-1.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7z"/>
  </svg>
);

const Navbar: React.FC = () => {
  const { lang, setLang, t } = useI18n();
  const tr = useTr();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Body scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { to: '/', label: tr(t.nav.home) },
    { to: '/servicii', label: tr(t.nav.services) },
    { to: '/adoptii', label: tr(t.nav.adoptions) },
    { to: '/contact', label: tr(t.nav.contact) },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b-2 border-primary/10" style={{ boxShadow: '0 2px 12px rgba(45,125,70,0.06)' }}>
      <div className="container mx-auto max-w-[1280px] px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => { setMobileOpen(false); if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'instant' }); }}
        >
          <PawIcon />
          <span className="font-nunito font-extrabold text-2xl text-primary">VetCare</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.to ? 'text-primary' : 'text-foreground'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')}
            className="text-xs font-semibold px-2 py-1 rounded-full border border-border hover:bg-secondary transition-colors"
          >
            {lang === 'ro' ? 'EN' : 'RO'}
          </button>

          {/* Emergency btn */}
          <a href="tel:+40720000000" className="animate-pulse-border rounded-full">
            <Button variant="destructive" size="sm" className="rounded-full text-xs gap-1">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">{tr(t.nav.emergency)}</span>
              <span className="sm:hidden">🚨</span>
            </Button>
          </a>

          {/* Book btn */}
          <Link to="/programare" className="hidden sm:block">
            <Button className="rounded-full text-xs">{tr(t.nav.book)} →</Button>
          </Link>

          {/* Mobile hamburger */}
          <button className="md:hidden ml-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium border-b border-border/50 hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/programare" onClick={() => setMobileOpen(false)} className="block mt-3">
            <Button className="w-full rounded-full">{tr(t.nav.book)} →</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
