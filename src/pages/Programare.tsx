import React, { useState } from 'react';
import { useI18n, useTr } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Check, Calendar as CalIcon, ArrowRight, ArrowLeft, Phone, PartyPopper } from 'lucide-react';

const animalTypes = [
  { icon: '🐕', ro: 'Câine', en: 'Dog' },
  { icon: '🐈', ro: 'Pisică', en: 'Cat' },
  { icon: '🐇', ro: 'Iepure', en: 'Rabbit' },
  { icon: '🦜', ro: 'Pasăre', en: 'Bird' },
  { icon: '🦎', ro: 'Reptilă', en: 'Reptile' },
  { icon: '🐾', ro: 'Alt animal', en: 'Other' },
];

const consultTypes = [
  { ro: 'Consultație generală', en: 'General consultation', price: '80 RON', time: '30 min' },
  { ro: 'Vaccinare', en: 'Vaccination', price: '60 RON', time: '20 min' },
  { ro: 'Analize sânge', en: 'Blood tests', price: '150 RON', time: '15 min' },
  { ro: 'Chirurgie / Sterilizare', en: 'Surgery / Spaying', price: { ro: 'Evaluare gratuită', en: 'Free evaluation' }, time: '' },
  { ro: 'Toaletaj', en: 'Grooming', price: '120-250 RON', time: '90 min' },
];

const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

const ProgramarePage: React.FC = () => {
  const { t, lang } = useI18n();
  const tr = useTr();
  const [step, setStep] = useState(0);
  const [animal, setAnimal] = useState(-1);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [consultType, setConsultType] = useState(-1);
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState('');
  const [chooseDoctor, setChooseDoctor] = useState(false);
  const [doctor, setDoctor] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [notes, setNotes] = useState('');
  const [smsReminder, setSmsReminder] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const steps = [tr(t.booking.step1), tr(t.booking.step2), tr(t.booking.step3), tr(t.booking.step4)];

  const canNext = () => {
    if (step === 0) return animal >= 0;
    if (step === 1) return consultType >= 0;
    if (step === 2) return !!date && !!timeSlot;
    if (step === 3) return ownerName && phone && email;
    return false;
  };

  if (confirmed) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto max-w-[600px] px-4 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="font-nunito font-extrabold text-3xl text-primary">{tr(t.booking.successTitle)}</h1>
          <p className="mt-2 text-lg">{petName || 'Pet'}</p>
          <div className="vetcare-card p-6 mt-6 text-left space-y-2 text-sm">
            <p><strong>{tr(t.booking.step1)}:</strong> {animalTypes[animal]?.[lang]} — {petName}</p>
            <p><strong>{tr(t.booking.step2)}:</strong> {consultTypes[consultType]?.[lang]}</p>
            <p><strong>{tr(t.booking.step3)}:</strong> {date?.toLocaleDateString()} {timeSlot}</p>
            <p><strong>{tr(t.booking.step4)}:</strong> {ownerName}, {phone}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{tr({ ro: 'Înainte de consultație: nu hrăniți animalul cu 4h înainte (dacă e chirurgie)', en: 'Before the consultation: don\'t feed the animal 4h before (if surgery)' })}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-[1280px] px-4">
        {/* Hero */}
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{tr(t.booking.heroBadge)}</span>
          <h1 className="font-nunito font-extrabold text-4xl md:text-5xl mt-3">{tr(t.booking.title)}</h1>
          <p className="text-muted-foreground mt-2">{tr(t.booking.subtitle)}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* FORM (3 cols) */}
          <div className="lg:col-span-3">
            {/* Stepper */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto">
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className={`flex-1 h-0.5 ${i <= step ? 'bg-primary' : 'bg-border'}`} />}
                  <div className={`flex items-center gap-1.5 shrink-0 ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < step ? 'bg-primary text-primary-foreground' : i === step ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {i < step ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className="text-xs font-medium hidden sm:inline">{s}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Step 1 */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {animalTypes.map((a, i) => (
                    <button key={i} onClick={() => setAnimal(i)}
                      className={cn('vetcare-card p-4 text-center cursor-pointer transition-all', animal === i && 'ring-2 ring-primary border-t-3 border-primary')}>
                      <span className="text-3xl block">{a.icon}</span>
                      <span className="text-xs mt-1 block">{a[lang]}</span>
                    </button>
                  ))}
                </div>
                {animal >= 0 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">{tr(t.booking.petName)}</label>
                      <Input value={petName} onChange={e => setPetName(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{tr(t.booking.petAge)}</label>
                      <Input value={petAge} onChange={e => setPetAge(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div className="space-y-3">
                {consultTypes.map((c, i) => (
                  <button key={i} onClick={() => setConsultType(i)}
                    className={cn('vetcare-card p-4 w-full text-left flex items-center justify-between', consultType === i && 'ring-2 ring-primary')}>
                    <div>
                      <span className="font-semibold">{c[lang]}</span>
                      {c.time && <span className="text-xs text-muted-foreground ml-2">· {c.time}</span>}
                    </div>
                    <span className="text-sm font-bold text-primary">{typeof c.price === 'string' ? c.price : c.price[lang]}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button variant={chooseDoctor ? 'default' : 'outline'} size="sm" className="rounded-full" onClick={() => setChooseDoctor(true)}>{tr(t.booking.chooseDoctor)}</Button>
                  <Button variant={!chooseDoctor ? 'default' : 'outline'} size="sm" className="rounded-full" onClick={() => setChooseDoctor(false)}>{tr(t.booking.firstAvailable)}</Button>
                </div>
                {chooseDoctor && (
                  <div className="flex gap-2 flex-wrap">
                    {t.doctors.items.map((d, i) => (
                      <button key={i} onClick={() => setDoctor(d.name)}
                        className={cn('px-3 py-2 rounded-full text-sm border transition-colors', doctor === d.name ? 'bg-primary text-primary-foreground' : 'border-border hover:border-primary')}>
                        {d.name}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Calendar mode="single" selected={date} onSelect={setDate} className={cn("p-3 pointer-events-auto rounded-lg border")} disabled={(d) => d < new Date()} />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">{tr({ ro: 'Ore disponibile', en: 'Available times' })}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(ts => (
                        <button key={ts} onClick={() => setTimeSlot(ts)}
                          className={cn('py-2 px-3 rounded-lg text-sm border transition-colors', timeSlot === ts ? 'bg-primary text-primary-foreground' : 'border-border hover:border-primary')}>
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">{tr(t.booking.ownerName)}</label>
                    <Input value={ownerName} onChange={e => setOwnerName(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{tr(t.booking.phone)}</label>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} type="tel" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{tr(t.booking.email)}</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={isNew} onCheckedChange={(v) => setIsNew(!!v)} />
                  <label className="text-sm">{tr(t.booking.newClient)}</label>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{tr(t.booking.symptoms)}</label>
                  <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={smsReminder} onCheckedChange={(v) => setSmsReminder(!!v)} />
                  <label className="text-sm">{tr(t.booking.smsReminder)}</label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> {tr(t.booking.back)}
                </Button>
              ) : <div />}
              {step < 3 ? (
                <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="rounded-full gap-2">
                  {tr(t.booking.next)} <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={() => setConfirmed(true)} disabled={!canNext()} className="rounded-full gap-2 text-base px-6" size="lg">
                  {tr(t.booking.confirm)}
                </Button>
              )}
            </div>
          </div>

          {/* SIDEBAR (2 cols) */}
          <div className="lg:col-span-2">
            <div className="vetcare-card p-6 sticky top-24 space-y-4">
              <h3 className="font-nunito font-bold">{tr(t.booking.summary)}</h3>
              <div className="text-sm space-y-2">
                {animal >= 0 && <p>🐾 {animalTypes[animal][lang]} {petName && `— ${petName}`}</p>}
                {consultType >= 0 && <p>📋 {consultTypes[consultType][lang]}</p>}
                {date && <p>📅 {date.toLocaleDateString()} {timeSlot}</p>}
                {doctor && <p>👨‍⚕️ {doctor}</p>}
                {ownerName && <p>👤 {ownerName}</p>}
              </div>
              <hr className="border-border" />
              <p className="text-xs text-muted-foreground">📋 {tr(t.booking.bringHealth)}</p>
              <p className="text-xs text-muted-foreground">🅿️ {tr(t.booking.parking)}</p>
              <a href="tel:+40720000000" className="block">
                <Button variant="destructive" size="sm" className="w-full rounded-full gap-1">
                  <Phone className="w-3 h-3" /> {tr(t.nav.emergency)}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgramarePage;
