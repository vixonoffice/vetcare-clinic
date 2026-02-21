import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n, useTr } from '@/lib/i18n';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const { t } = useI18n();
  const tr = useTr();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto max-w-[1280px] px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div>
            <span className="font-nunito font-extrabold text-2xl text-primary-light">VetCare</span>
            <p className="mt-2 text-sm opacity-70">{tr(t.footer.tagline)}</p>
            <div className="mt-3 flex gap-3">
              <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary-light">ANSVSA ✓</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-nunito font-bold text-sm mb-3 opacity-80">{tr(t.footer.quickServices)}</h4>
            <div className="space-y-2 text-sm opacity-60">
              <Link to="/servicii" className="block hover:opacity-100 transition-opacity">{tr(t.nav.services)}</Link>
              <Link to="/programare" className="block hover:opacity-100 transition-opacity">{tr(t.nav.book)}</Link>
              <Link to="/adoptii" className="block hover:opacity-100 transition-opacity">{tr(t.nav.adoptions)}</Link>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-nunito font-bold text-sm mb-3 opacity-80">{tr(t.footer.usefulInfo)}</h4>
            <div className="space-y-2 text-sm opacity-60">
              <Link to="/contact" className="block hover:opacity-100 transition-opacity">{tr(t.nav.contact)}</Link>
              <Link to="/contact" className="block hover:opacity-100 transition-opacity">{tr(t.nav.about)}</Link>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-nunito font-bold text-sm mb-3 opacity-80">{tr(t.footer.contactTitle)}</h4>
            <p className="text-sm opacity-60 mb-2">+40 720 XXX XXX</p>
            <p className="text-sm opacity-60 mb-3">contact@vetcare.ro</p>
            <a href="tel:+40720000000">
              <Button variant="destructive" size="sm" className="rounded-full gap-1">
                <Phone className="w-3 h-3" /> {tr(t.nav.emergency)}
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-xs opacity-50">
          {tr(t.footer.copyright)}
          <p className="mt-1">
            Site realizat de{' '}
            <a href="https://vixonlab.ro" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity underline underline-offset-2">
              Vixon Lab
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
