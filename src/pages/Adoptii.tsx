import React, { useState } from 'react';
import { useI18n, useTr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, ArrowRight } from 'lucide-react';

const animals = [
  { name: 'Milo', species: 'dog', breed: 'Mix Labrador', age: { ro: '2 ani', en: '2 years' }, sex: { ro: 'Mascul', en: 'Male' }, weight: '18kg', size: 'medium', ageGroup: 'adult', status: 'available', personality: { ro: ['Jucăuș', 'Bun cu copiii', 'Energic'], en: ['Playful', 'Good with kids', 'Energetic'] }, desc: { ro: 'Milo a fost găsit pe stradă la 3 luni. Acum e sănătos, vaccinat și plin de viață!', en: 'Milo was found on the street at 3 months. Now he\'s healthy, vaccinated and full of life!' } },
  { name: 'Luna', species: 'cat', breed: 'Europeană', age: { ro: '1 an', en: '1 year' }, sex: { ro: 'Femelă', en: 'Female' }, weight: '4kg', size: 'small', ageGroup: 'adult', status: 'available', personality: { ro: ['Blândă', 'Calmă', 'Iubitoare'], en: ['Gentle', 'Calm', 'Loving'] }, desc: { ro: 'Luna a fost abandonată într-o cutie. E blândă, adoră să toarcă și să stea în brațe.', en: 'Luna was abandoned in a box. She\'s gentle, loves to purr and cuddle.' } },
  { name: 'Puf', species: 'cat', breed: 'Persană mix', age: { ro: '3 ani', en: '3 years' }, sex: { ro: 'Mascul', en: 'Male' }, weight: '5kg', size: 'small', ageGroup: 'adult', status: 'reserved', personality: { ro: ['Calm', 'Liniștit', 'Independent'], en: ['Calm', 'Quiet', 'Independent'] }, desc: { ro: 'Puf e perfect pentru apartament. Iubește liniștea și sesiunile de periere.', en: 'Puf is perfect for apartments. Loves quiet and brushing sessions.' } },
  { name: 'Rocky', species: 'dog', breed: 'Ciobănesc mix', age: { ro: '4 ani', en: '4 years' }, sex: { ro: 'Mascul', en: 'Male' }, weight: '28kg', size: 'large', ageGroup: 'adult', status: 'available', personality: { ro: ['Loial', 'Protector', 'Energic'], en: ['Loyal', 'Protective', 'Energetic'] }, desc: { ro: 'Rocky e loial, inteligent și perfect pentru o casă cu curte.', en: 'Rocky is loyal, smart and perfect for a house with a yard.' } },
  { name: 'Bella', species: 'dog', breed: 'Bichon mix', age: { ro: '6 luni', en: '6 months' }, sex: { ro: 'Femelă', en: 'Female' }, weight: '3kg', size: 'small', ageGroup: 'puppy', status: 'available', personality: { ro: ['Jucăușă', 'Curioasă', 'Afectuoasă'], en: ['Playful', 'Curious', 'Affectionate'] }, desc: { ro: 'Bella e un pui plin de energie. Ideală pentru familii cu copii!', en: 'Bella is a puppy full of energy. Ideal for families with children!' } },
  { name: 'Oscar', species: 'other', breed: 'Iepure', age: { ro: '1 an', en: '1 year' }, sex: { ro: 'Mascul', en: 'Male' }, weight: '2kg', size: 'small', ageGroup: 'adult', status: 'available', personality: { ro: ['Blând', 'Curios'], en: ['Gentle', 'Curious'] }, desc: { ro: 'Oscar e un iepure blând, perfect ca animal de companie pentru copii.', en: 'Oscar is a gentle rabbit, perfect as a pet for children.' } },
];

const AdoptiiPage: React.FC = () => {
  const { t, lang } = useI18n();
  const tr = useTr();
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = animals.filter(a => {
    if (speciesFilter !== 'all' && a.species !== speciesFilter) return false;
    if (ageFilter !== 'all' && a.ageGroup !== ageFilter) return false;
    if (sizeFilter !== 'all' && a.size !== sizeFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    return true;
  });

  const FilterBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${active ? 'bg-primary text-primary-foreground' : 'bg-card border border-border hover:border-primary'}`}>
      {children}
    </button>
  );

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-[1280px] px-4">
        {/* Hero */}
        <div className="text-center mb-10">
          <span className="font-caveat text-xl text-accent-orange">{tr(t.adoptionPage.heroBadge)}</span>
          <h1 className="font-nunito font-extrabold text-4xl md:text-5xl mt-2">{tr(t.adoptionPage.title)}</h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">{tr(t.adoptionPage.subtitle)}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <FilterBtn active={speciesFilter === 'all'} onClick={() => setSpeciesFilter('all')}>{tr(t.adoptionPage.all)}</FilterBtn>
          <FilterBtn active={speciesFilter === 'dog'} onClick={() => setSpeciesFilter('dog')}>{tr(t.adoptionPage.dogs)}</FilterBtn>
          <FilterBtn active={speciesFilter === 'cat'} onClick={() => setSpeciesFilter('cat')}>{tr(t.adoptionPage.cats)}</FilterBtn>
          <FilterBtn active={speciesFilter === 'other'} onClick={() => setSpeciesFilter('other')}>{tr(t.adoptionPage.others)}</FilterBtn>
          <span className="w-px h-6 bg-border self-center mx-1" />
          <FilterBtn active={ageFilter === 'all'} onClick={() => setAgeFilter('all')}>{tr(t.adoptionPage.all)}</FilterBtn>
          <FilterBtn active={ageFilter === 'puppy'} onClick={() => setAgeFilter('puppy')}>{tr(t.adoptionPage.puppy)}</FilterBtn>
          <FilterBtn active={ageFilter === 'adult'} onClick={() => setAgeFilter('adult')}>{tr(t.adoptionPage.adult)}</FilterBtn>
          <FilterBtn active={ageFilter === 'senior'} onClick={() => setAgeFilter('senior')}>{tr(t.adoptionPage.senior)}</FilterBtn>
          <span className="w-px h-6 bg-border self-center mx-1" />
          <FilterBtn active={sizeFilter === 'all'} onClick={() => setSizeFilter('all')}>{tr(t.adoptionPage.all)}</FilterBtn>
          <FilterBtn active={sizeFilter === 'small'} onClick={() => setSizeFilter('small')}>{tr(t.adoptionPage.small)}</FilterBtn>
          <FilterBtn active={sizeFilter === 'medium'} onClick={() => setSizeFilter('medium')}>{tr(t.adoptionPage.medium)}</FilterBtn>
          <FilterBtn active={sizeFilter === 'large'} onClick={() => setSizeFilter('large')}>{tr(t.adoptionPage.large)}</FilterBtn>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a, i) => (
            <div key={i} className="vetcare-card overflow-hidden">
              <div className="h-56 bg-gradient-to-br from-primary/5 to-accent-yellow/10 flex items-center justify-center text-7xl">
                {a.species === 'dog' ? '🐕' : a.species === 'cat' ? '🐈' : '🐇'}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-nunito font-extrabold text-xl">{a.name}</h3>
                  <span className={`text-xs font-caveat font-bold px-2 py-0.5 rounded-full ${a.status === 'available' ? 'bg-primary/10 text-primary' : 'bg-accent-yellow/20 text-accent-orange'}`}>
                    {a.status === 'available' ? tr(t.adoptions.available) + ' ✓' : tr(t.adoptions.reserved)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{a.breed} · {tr(a.age)} · {tr(a.sex)} · {a.weight}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {a.personality[lang].map((p, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{p}</span>
                  ))}
                </div>
                <p className="text-sm mt-3">{tr(a.desc)}</p>
                <div className="text-xs text-primary mt-2">{tr(t.adoptions.vaccinated)} ✓ | {tr(t.adoptions.dewormed)} ✓ | {tr(t.adoptions.microchip)} ✓</div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-3 rounded-full bg-accent-orange hover:bg-accent-orange/90 text-white gap-1">
                      <Heart className="w-4 h-4" /> {tr(t.adoptionPage.adoptForm)}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-nunito">{tr(t.adoptionPage.adoptForm)} — {a.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 mt-2">
                      <Input placeholder={tr(t.contactPage.name)} />
                      <Input placeholder={tr(t.booking.phone)} type="tel" />
                      <Input placeholder={tr(t.booking.email)} type="email" />
                      <Select>
                        <SelectTrigger><SelectValue placeholder={tr({ ro: 'Tip locuință', en: 'Housing type' })} /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apt">{tr({ ro: 'Apartament', en: 'Apartment' })}</SelectItem>
                          <SelectItem value="house">{tr({ ro: 'Casă cu curte', en: 'House with yard' })}</SelectItem>
                          <SelectItem value="big">{tr({ ro: 'Curte mare', en: 'Large yard' })}</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea placeholder={tr({ ro: 'De ce vrei să adoptezi?', en: 'Why do you want to adopt?' })} rows={3} />
                      <Button className="w-full rounded-full">{tr({ ro: 'Trimite Cererea', en: 'Submit Request' })}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        {/* How adoption works */}
        <div className="mt-16 text-center">
          <h2 className="font-nunito font-extrabold text-2xl mb-8">{tr(t.adoptionPage.howItWorks)}</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[t.adoptionPage.step1, t.adoptionPage.step2a, t.adoptionPage.step3a].map((s, i) => (
              <div key={i} className="vetcare-card p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold mb-3">{i + 1}</div>
                <p className="text-sm font-medium">{tr(s)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor */}
        <div className="mt-12 vetcare-card p-8 text-center bg-gradient-to-r from-accent-yellow/10 to-accent-orange/5">
          <p className="text-lg">{tr(t.adoptionPage.sponsor)}</p>
          <Button className="mt-4 rounded-full bg-accent-orange hover:bg-accent-orange/90 text-white">{tr(t.adoptionPage.sponsorBtn)} →</Button>
        </div>
      </div>
    </main>
  );
};

export default AdoptiiPage;
