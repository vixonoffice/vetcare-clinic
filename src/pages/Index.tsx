import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useI18n, useTr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Clock, Microscope, Heart, Shield, Calendar, Star, ArrowRight } from 'lucide-react';

// ─── Intersection Observer Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Animated Counter ───
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, visible } = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, value]);
  return <span ref={ref}>{visible ? `${count.toLocaleString('ro-RO')}${suffix}` : '0'}</span>;
}

// ─── Section Wrapper ───
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} id={id} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

const HomePage: React.FC = () => {
  const { t } = useI18n();
  const tr = useTr();

  const whyUsIcons = [<Clock key="c" />, <Microscope key="m" />, <Heart key="h" />, <Shield key="s" />];

  const adoptionAnimals = [
    { name: 'Milo', species: { ro: 'Câine', en: 'Dog' }, breed: 'Mix Labrador', age: { ro: '2 ani', en: '2 years' }, sex: { ro: 'Mascul', en: 'Male' }, status: 'available', desc: { ro: 'Milo e jucăuș, bun cu copiii, vaccinat, sterilizat.', en: 'Milo is playful, good with kids, vaccinated, neutered.' } },
    { name: 'Luna', species: { ro: 'Pisică', en: 'Cat' }, breed: 'Europeană', age: { ro: '1 an', en: '1 year' }, sex: { ro: 'Femelă', en: 'Female' }, status: 'available', desc: { ro: 'Luna e blândă, adoră să toarcă și să stea în brațe.', en: 'Luna is gentle, loves to purr and cuddle.' } },
    { name: 'Puf', species: { ro: 'Pisică', en: 'Cat' }, breed: 'Persană mix', age: { ro: '3 ani', en: '3 years' }, sex: { ro: 'Mascul', en: 'Male' }, status: 'reserved', desc: { ro: 'Puf e calm, perfect pentru apartament, iubește liniștea.', en: 'Puf is calm, perfect for apartments, loves quiet.' } },
    { name: 'Rocky', species: { ro: 'Câine', en: 'Dog' }, breed: 'Ciobănesc mix', age: { ro: '4 ani', en: '4 years' }, sex: { ro: 'Mascul', en: 'Male' }, status: 'available', desc: { ro: 'Rocky e loial, energic, perfect pentru casă cu curte.', en: 'Rocky is loyal, energetic, perfect for a house with a yard.' } },
  ];

  const testimonials = [
    { text: { ro: 'Max a avut o intervenție de urgență la 2 noaptea. Dr. Popa a venit în 20 de minute. Îi datorez câinele meu.', en: 'Max had an emergency surgery at 2 AM. Dr. Popa arrived in 20 minutes. I owe him my dog.' }, name: 'Cosmin A.' },
    { text: { ro: 'Luna a fost sterilizată ieri și azi deja aleargă prin casă. Recuperare perfectă, echipă minunată.', en: 'Luna was spayed yesterday and today she\'s already running around. Perfect recovery, amazing team.' }, name: 'Ioana M.' },
    { text: { ro: 'Am adoptat-o pe Nora de la ei. M-au ajutat cu tot — vaccinuri, sfaturi, follow-up. Oameni cu suflet.', en: 'I adopted Nora from them. They helped with everything — vaccines, advice, follow-up. People with heart.' }, name: 'Dan R.' },
  ];

  const blogPosts = [
    { title: { ro: 'Semne că Pisica Ta Este Bolnavă (și Nu Știi)', en: 'Signs Your Cat Is Sick (and You Don\'t Know)' }, author: 'Dr. Voicu' },
    { title: { ro: 'Ghid Complet Vaccinuri Câine — Ce, Când, De Ce', en: 'Complete Dog Vaccine Guide — What, When, Why' }, author: 'Dr. Popa' },
    { title: { ro: 'Cum să Pregătești Animalul pentru Sterilizare', en: 'How to Prepare Your Pet for Spaying' }, author: 'Dr. Voicu' },
  ];

  const [testimIndex, setTestimIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTestimIndex(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(138 76% 97%) 0%, hsl(138 68% 93%) 50%, hsl(46 100% 96%) 100%)' }}>
        <div className="absolute inset-0 paw-pattern opacity-[0.04]" />
        <div className="container mx-auto max-w-[1280px] px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-caveat text-lg text-primary inline-block animate-float mb-4">{tr(t.hero.badge)}</span>
              <h1 className="font-nunito font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight">
                <span className="text-primary">{tr(t.hero.title1)}</span><br />
                <span className="text-foreground">{tr(t.hero.title2)}</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg">{tr(t.hero.subtitle)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/programare">
                  <Button size="lg" className="rounded-full text-base gap-2 px-6">
                    <Calendar className="w-5 h-5" /> {tr(t.hero.bookBtn)}
                  </Button>
                </Link>
                <a href="tel:+40720000000">
                  <Button variant="outline" size="lg" className="rounded-full text-base gap-2 px-6 border-emergency text-emergency animate-pulse-border hover:bg-emergency hover:text-emergency-foreground">
                    {tr(t.hero.emergencyBtn)}
                  </Button>
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>{tr(t.hero.trust1)}</span>
                <span>{tr(t.hero.trust2)}</span>
                <span>{tr(t.hero.trust3)}</span>
              </div>
            </div>

            {/* Quick booking card */}
            <div className="glassmorphism rounded-[24px] p-6 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <h3 className="font-nunito font-bold text-lg mb-4">{tr(t.hero.quickBook)}</h3>
              <div className="space-y-3">
                <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                  <option>{tr(t.hero.selectAnimal)}</option>
                  <option>🐕 {tr(t.hero.dog)}</option>
                  <option>🐈 {tr(t.hero.cat)}</option>
                  <option>🐾 {tr(t.hero.other)}</option>
                </select>
                <input type="date" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" />
                <Link to="/programare">
                  <Button className="w-full rounded-full">{tr(t.hero.bookNow)}</Button>
                </Link>
              </div>
              <p className="mt-2 text-xs text-primary font-medium">{tr(t.hero.availableToday)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <Section className="py-16 bg-background">
        <div className="container mx-auto max-w-[1280px] px-4">
          <span className="font-caveat text-xl text-accent-orange">{tr(t.services.label)}</span>
          <h2 className="font-nunito font-extrabold text-3xl md:text-4xl mt-1 mb-8">{tr(t.services.title)}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.items.map((s, i) => (
              <div key={i} className="vetcare-card p-6 cursor-pointer">
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <h3 className="font-nunito font-bold text-lg">{tr(s.title)}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tr(s.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ EMERGENCY BANNER ═══ */}
      <Section className="py-12" id="urgente">
        <div className="bg-gradient-to-r from-emergency to-accent-orange">
          <div className="container mx-auto max-w-[1280px] px-4 py-10 text-center text-emergency-foreground">
            <div className="text-4xl animate-heartbeat inline-block mb-3">❤️</div>
            <h2 className="font-nunito font-extrabold text-2xl md:text-3xl">{tr(t.emergencyBanner.title)}</h2>
            <p className="mt-2 opacity-90">{tr(t.emergencyBanner.subtitle)}</p>
            <a href="tel:+40720000000">
              <Button variant="secondary" size="lg" className="mt-4 rounded-full text-lg px-8 bg-card text-emergency font-bold">
                {tr(t.emergencyBanner.callBtn)}
              </Button>
            </a>
            <p className="mt-2 text-sm opacity-80">{tr(t.emergencyBanner.response)}</p>
          </div>
        </div>
      </Section>

      {/* ═══ WHY US ═══ */}
      <Section className="py-16 bg-background-secondary">
        <div className="container mx-auto max-w-[1280px] px-4">
          <span className="font-caveat text-xl text-accent-orange">{tr(t.whyUs.label)}</span>
          <h2 className="font-nunito font-extrabold text-3xl md:text-4xl mt-1 mb-8">{tr(t.whyUs.title)}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.whyUs.items.map((item, i) => (
              <div key={i} className="vetcare-card p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                  {React.cloneElement(whyUsIcons[i], { className: 'w-6 h-6' })}
                </div>
                <h3 className="font-nunito font-bold">{tr(item.title)}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tr(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ DOCTORS ═══ */}
      <Section className="py-16 bg-background">
        <div className="container mx-auto max-w-[1280px] px-4">
          <span className="font-caveat text-xl text-accent-orange">{tr(t.doctors.label)}</span>
          <h2 className="font-nunito font-extrabold text-3xl md:text-4xl mt-1 mb-8">{tr(t.doctors.title)}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.doctors.items.map((doc, i) => (
              <div key={i} className="vetcare-card p-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4 mx-auto">
                  {['🩺', '✂️', '🦎'][i]}
                </div>
                <h3 className="font-nunito font-bold text-lg text-center">{doc.name}</h3>
                <p className="text-sm text-primary text-center">{tr(doc.spec)}</p>
                <p className="text-xs text-muted-foreground text-center mt-1">{doc.years} {tr(t.doctors.experience)}</p>
                <p className="text-xs text-center mt-2 font-caveat text-accent-orange">🐾 {tr(t.doctors.petLabel)}: {tr(doc.pet)}</p>
                <Link to="/programare" className="block mt-4">
                  <Button variant="outline" className="w-full rounded-full text-sm">{tr(t.doctors.bookDirect)}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ STATS ═══ */}
      <Section className="py-16 bg-foreground text-primary-foreground">
        <div className="container mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {t.stats.items.map((s, i) => (
              <div key={i}>
                <div className="font-nunito font-extrabold text-4xl md:text-5xl text-primary-light">
                  {s.value === '24/7' ? '24/7' : s.value === '8.000+' ? <><AnimatedCounter value={8000} />+</> : <AnimatedCounter value={parseInt(s.value)} />}
                </div>
                <p className="mt-2 text-sm opacity-70">{tr(s.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ ADOPTIONS ═══ */}
      <Section className="py-16 bg-background">
        <div className="container mx-auto max-w-[1280px] px-4">
          <span className="font-caveat text-xl text-accent-orange">{tr(t.adoptions.label)}</span>
          <h2 className="font-nunito font-extrabold text-3xl md:text-4xl mt-1 mb-8">{tr(t.adoptions.title)}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {adoptionAnimals.map((a, i) => (
              <div key={i} className="vetcare-card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/5 to-accent-yellow/10 flex items-center justify-center text-6xl">
                  {a.species.ro === 'Câine' ? '🐕' : '🐈'}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-nunito font-bold text-lg">{a.name}</h3>
                    <span className={`text-xs font-caveat font-bold px-2 py-0.5 rounded-full ${a.status === 'available' ? 'bg-primary/10 text-primary' : 'bg-accent-yellow/20 text-accent-orange'}`}>
                      {a.status === 'available' ? tr(t.adoptions.available) : tr(t.adoptions.reserved)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{tr(a.species)} · {a.breed} · {tr(a.age)} · {tr(a.sex)}</p>
                  <p className="text-sm mt-2">{tr(a.desc)}</p>
                  <div className="text-xs text-primary mt-2">{tr(t.adoptions.vaccinated)} ✓ | {tr(t.adoptions.dewormed)} ✓ | {tr(t.adoptions.microchip)} ✓</div>
                  <Link to="/adoptii">
                    <Button className="w-full mt-3 rounded-full text-sm bg-accent-orange hover:bg-accent-orange/90 text-accent-foreground">
                      {tr(t.adoptions.adoptBtn)} {a.name} →
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/adoptii">
              <Button variant="outline" className="rounded-full">{tr(t.adoptions.viewAll)}</Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══ TESTIMONIALS ═══ */}
      <Section className="py-16 bg-background-secondary">
        <div className="container mx-auto max-w-[1280px] px-4 text-center">
          <span className="font-caveat text-xl text-accent-orange">{tr(t.testimonials.label)}</span>
          <h2 className="font-nunito font-extrabold text-3xl md:text-4xl mt-1 mb-8">{tr(t.testimonials.title)}</h2>
          <div className="max-w-2xl mx-auto">
            <div className="vetcare-card p-8 min-h-[180px] flex flex-col justify-center">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-accent-yellow fill-accent-yellow" />)}
              </div>
              <blockquote className="text-lg italic">"{tr(testimonials[testimIndex].text)}"</blockquote>
              <p className="mt-3 font-semibold text-sm text-muted-foreground">— {testimonials[testimIndex].name}</p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimIndex(i)} className={`w-3 h-3 rounded-full transition-colors ${i === testimIndex ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ BLOG PREVIEW ═══ */}
      <Section className="py-16 bg-background">
        <div className="container mx-auto max-w-[1280px] px-4">
          <span className="font-caveat text-xl text-accent-orange">{tr(t.blogPreview.label)}</span>
          <h2 className="font-nunito font-extrabold text-3xl md:text-4xl mt-1 mb-8">{tr(t.blogPreview.title)}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => (
              <div key={i} className="vetcare-card p-6">
                <div className="h-32 rounded-lg bg-gradient-to-br from-primary/5 to-background-secondary flex items-center justify-center text-4xl mb-4">
                  {['🐱', '🐕', '✂️'][i]}
                </div>
                <h3 className="font-nunito font-bold">{tr(post.title)}</h3>
                <p className="text-xs text-muted-foreground mt-2">{post.author}</p>
                <Button variant="link" className="p-0 mt-2 text-primary text-sm">
                  {tr({ ro: 'Citește →', en: 'Read →' })}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ CTA FINAL ═══ */}
      <Section className="py-20 bg-foreground paw-pattern relative">
        <div className="container mx-auto max-w-[1280px] px-4 text-center relative z-10">
          <h2 className="font-nunito font-extrabold text-3xl md:text-4xl text-primary-foreground">{tr(t.cta.title)}</h2>
          <p className="mt-3 text-primary-foreground/70 max-w-lg mx-auto">{tr(t.cta.subtitle)}</p>
          <Link to="/programare">
            <Button size="lg" variant="secondary" className="mt-6 rounded-full text-lg px-8 bg-card text-primary font-bold hover:bg-card/90">
              {tr(t.cta.btn)}
            </Button>
          </Link>
          <p className="mt-3 text-xs text-primary-foreground/50">{tr(t.cta.sub)}</p>
        </div>
      </Section>
    </main>
  );
};

export default HomePage;
