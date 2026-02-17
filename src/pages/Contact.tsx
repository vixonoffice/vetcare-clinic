import React from 'react';
import { useI18n, useTr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t } = useI18n();
  const tr = useTr();

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-[1280px] px-4">
        <h1 className="font-nunito font-extrabold text-4xl md:text-5xl mb-4">{tr(t.contactPage.title)}</h1>

        {/* Emergency banner */}
        <div className="bg-emergency text-emergency-foreground rounded-[24px] p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-nunito font-bold text-xl">🚨 {tr(t.nav.emergency)}</h2>
            <p className="text-sm opacity-90">{tr(t.emergencyBanner.subtitle)}</p>
          </div>
          <a href="tel:+40720000000">
            <Button variant="secondary" size="lg" className="rounded-full font-bold text-emergency whitespace-nowrap">
              <Phone className="w-5 h-5 mr-2" /> +40 720 XXX XXX
            </Button>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <div>
            <h2 className="font-nunito font-bold text-2xl mb-4">{tr(t.contactPage.sendMessage)}</h2>
            <div className="vetcare-card p-6 space-y-4">
              <Input placeholder={tr(t.contactPage.name)} />
              <Input placeholder={tr(t.booking.email)} type="email" />
              <Input placeholder={tr(t.booking.phone)} type="tel" />
              <Textarea placeholder={tr(t.contactPage.message)} rows={4} />
              <Button className="rounded-full">{tr(t.contactPage.send)}</Button>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* About */}
            <div className="vetcare-card p-6">
              <h2 className="font-nunito font-bold text-xl mb-3">{tr(t.contactPage.about)}</h2>
              <p className="text-sm text-muted-foreground">{tr(t.contactPage.aboutText)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">ANSVSA ✓</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tr({ ro: 'Laborator propriu', en: 'In-house Lab' })}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tr({ ro: 'Partener ONG', en: 'NGO Partner' })}</span>
              </div>
            </div>

            {/* Schedule */}
            <div className="vetcare-card p-6">
              <h3 className="font-nunito font-bold flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {tr(t.contactPage.schedule)}</h3>
              <div className="mt-3 space-y-1 text-sm">
                <p>{tr(t.contactPage.weekdays)}</p>
                <p>{tr(t.contactPage.weekend)}</p>
                <p className="font-bold text-emergency">{tr(t.contactPage.emergencyAlways)}</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="vetcare-card p-6 space-y-3 text-sm">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +40 720 XXX XXX</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> contact@vetcare.ro</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Str. Veterinarilor 42, București</p>
            </div>

            {/* Map placeholder */}
            <div className="vetcare-card h-48 bg-gradient-to-br from-primary/5 to-background-secondary flex items-center justify-center text-muted-foreground text-sm rounded-[24px]">
              📍 {tr({ ro: 'Hartă — Str. Veterinarilor 42, București', en: 'Map — Str. Veterinarilor 42, Bucharest' })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
