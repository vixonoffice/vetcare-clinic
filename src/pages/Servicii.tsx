import React, { useState } from 'react';
import { useI18n, useTr } from '@/lib/i18n';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const servicesData = [
  { title: { ro: 'Consultație generală', en: 'General Consultation' }, price: '80 RON', desc: { ro: 'Examinare completă, sfaturi de îngrijire, plan de tratament. 30 minute.', en: 'Complete examination, care advice, treatment plan. 30 minutes.' } },
  { title: { ro: 'Vaccinuri', en: 'Vaccinations' }, price: '60-120 RON', desc: { ro: 'Vaccinuri anuale și de rapel pentru câini, pisici și exotice. Schema completă de vaccinare.', en: 'Annual and booster vaccines for dogs, cats and exotics. Complete vaccination schedule.' } },
  { title: { ro: 'Deparazitare internă/externă', en: 'Internal/External Deworming' }, price: '40-80 RON', desc: { ro: 'Tratament complet anti-parazitar. Produse premium, scheme personalizate.', en: 'Complete anti-parasitic treatment. Premium products, personalized schedules.' } },
  { title: { ro: 'Sterilizare câine/pisică', en: 'Spaying Dog/Cat' }, price: '400-800 RON', desc: { ro: 'Prețul variază după greutatea animalului. Include anestezie, intervenție și control post-operator.', en: 'Price varies by animal weight. Includes anesthesia, surgery and post-op check.' } },
  { title: { ro: 'Chirurgie generală', en: 'General Surgery' }, price: { ro: 'de la 800 RON', en: 'from 800 RON' }, desc: { ro: 'Evaluare gratuită. Echipament de ultimă generație, echipă specializată.', en: 'Free evaluation. State-of-the-art equipment, specialized team.' } },
  { title: { ro: 'Analize complete sânge', en: 'Complete Blood Tests' }, price: '150-300 RON', desc: { ro: 'Laborator propriu, rezultate în 2 ore. Hemogramă, biochimie, teste specifice.', en: 'In-house lab, results in 2 hours. CBC, biochemistry, specific tests.' } },
  { title: { ro: 'Ecografie', en: 'Ultrasound' }, price: '120 RON', desc: { ro: 'Ecografie abdominală completă. Diagnostic rapid și precis.', en: 'Complete abdominal ultrasound. Fast and accurate diagnosis.' } },
  { title: { ro: 'Radiografie', en: 'X-Ray' }, price: '100 RON', desc: { ro: 'Radiografie digitală. Rezultate imediate pe ecran.', en: 'Digital X-ray. Immediate on-screen results.' } },
  { title: { ro: 'Toaletaj', en: 'Grooming' }, price: '120-250 RON', desc: { ro: 'Baie, tuns, curățare urechi, tăiere unghii. 60-90 minute.', en: 'Bath, haircut, ear cleaning, nail trimming. 60-90 minutes.' } },
  { title: { ro: 'Hotel veterinar', en: 'Pet Hotel' }, price: '80-120 RON/zi', desc: { ro: 'Cazare sigură cu supraveghere veterinară. Plimbări zilnice, hrană premium.', en: 'Safe accommodation with veterinary supervision. Daily walks, premium food.' } },
  { title: { ro: 'Farmacie', en: 'Pharmacy' }, price: '-', desc: { ro: 'Medicamente, suplimente și produse de îngrijire disponibile la recepție.', en: 'Medications, supplements and care products available at reception.' } },
];

const ServiciiPage: React.FC = () => {
  const { t, lang } = useI18n();
  const tr = useTr();

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-[1280px] px-4">
        <h1 className="font-nunito font-extrabold text-4xl md:text-5xl mb-8">{tr(t.servicesPage.title)}</h1>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {servicesData.map((s, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="vetcare-card px-6 border-none">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="font-nunito font-bold">{tr(s.title)}</span>
                    <span className="text-sm font-bold text-primary shrink-0 ml-4">{typeof s.price === 'string' ? s.price : s.price[lang]}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{tr(s.desc)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default ServiciiPage;
