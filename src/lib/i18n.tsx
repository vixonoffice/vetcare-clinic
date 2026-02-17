import React, { createContext, useContext, useState, useCallback } from 'react';

type Lang = 'ro' | 'en';

const translations = {
  nav: {
    home: { ro: 'Acasă', en: 'Home' },
    services: { ro: 'Servicii', en: 'Services' },
    doctors: { ro: 'Medicii Noștri', en: 'Our Doctors' },
    adoptions: { ro: 'Adopții', en: 'Adoptions' },
    blog: { ro: 'Blog', en: 'Blog' },
    contact: { ro: 'Contact', en: 'Contact' },
    emergency: { ro: 'Urgențe 24/7', en: 'Emergency 24/7' },
    book: { ro: 'Programează', en: 'Book Now' },
    about: { ro: 'Despre Noi', en: 'About Us' },
  },
  hero: {
    badge: { ro: '🐾 Medicii care iubesc animalele', en: '🐾 Doctors who love animals' },
    title1: { ro: 'Îngrijire cu Dragoste', en: 'Care with Love' },
    title2: { ro: 'Pentru Prietenul Tău', en: 'For Your Best Friend' },
    subtitle: {
      ro: 'Servicii veterinare complete — consultații, vaccinări, chirurgie, urgențe 24/7. Pentru câini, pisici și animale exotice.',
      en: 'Complete veterinary services — consultations, vaccinations, surgery, 24/7 emergencies. For dogs, cats and exotic animals.',
    },
    bookBtn: { ro: '🗓️ Programează Consultație', en: '🗓️ Book Consultation' },
    emergencyBtn: { ro: '🚨 Urgență 24/7', en: '🚨 Emergency 24/7' },
    quickBook: { ro: 'Programare Rapidă', en: 'Quick Booking' },
    selectAnimal: { ro: 'Tip animal', en: 'Animal type' },
    dog: { ro: 'Câine', en: 'Dog' },
    cat: { ro: 'Pisică', en: 'Cat' },
    other: { ro: 'Alt animal', en: 'Other' },
    selectDate: { ro: 'Selectează data', en: 'Select date' },
    bookNow: { ro: 'Rezervă acum', en: 'Book now' },
    availableToday: { ro: '● Disponibil azi', en: '● Available today' },
    trust1: { ro: '🏥 Clinică autorizată ANSVSA', en: '🏥 ANSVSA Certified Clinic' },
    trust2: { ro: '⏰ Urgențe 24/7', en: '⏰ 24/7 Emergencies' },
    trust3: { ro: '💊 Farmacie veterinară proprie', en: '💊 In-house Veterinary Pharmacy' },
  },
  services: {
    label: { ro: 'Ce facem', en: 'What we do' },
    title: { ro: 'Servicii Complete pentru Animalul Tău', en: 'Complete Services for Your Pet' },
    items: [
      { icon: '🩺', title: { ro: 'Consultații & Vaccinări', en: 'Consultations & Vaccinations' }, desc: { ro: 'Anual sau la nevoie', en: 'Annual or as needed' } },
      { icon: '🔬', title: { ro: 'Analize & Diagnostic', en: 'Lab Tests & Diagnosis' }, desc: { ro: 'Laborator propriu, rezultate rapide', en: 'In-house lab, fast results' } },
      { icon: '🏥', title: { ro: 'Chirurgie & Sterilizări', en: 'Surgery & Spaying' }, desc: { ro: 'Echipament modern, recuperare sigură', en: 'Modern equipment, safe recovery' } },
      { icon: '💊', title: { ro: 'Farmacie Veterinară', en: 'Veterinary Pharmacy' }, desc: { ro: 'Medicamente și suplimente premium', en: 'Premium medication & supplements' } },
      { icon: '✂️', title: { ro: 'Toaletaj Profesional', en: 'Professional Grooming' }, desc: { ro: 'Spa pentru câini și pisici', en: 'Spa for dogs and cats' } },
      { icon: '🛎️', title: { ro: 'Hotel Animale', en: 'Pet Hotel' }, desc: { ro: 'Cazare sigură când ești plecat', en: 'Safe boarding while you\'re away' } },
    ],
  },
  emergencyBanner: {
    title: { ro: '🚨 Urgențe Veterinare — 24 ore / 7 zile', en: '🚨 Veterinary Emergencies — 24/7' },
    subtitle: { ro: 'Animalul tău are nevoie de ajutor imediat? Suntem disponibili non-stop.', en: 'Your pet needs immediate help? We\'re available around the clock.' },
    callBtn: { ro: '📞 Sună Acum: +40 720 XXX XXX', en: '📞 Call Now: +40 720 XXX XXX' },
    response: { ro: 'Timp mediu de răspuns: 10 minute', en: 'Average response time: 10 minutes' },
  },
  whyUs: {
    label: { ro: 'De ce noi', en: 'Why us' },
    title: { ro: 'Medicii care chiar iubesc animalele', en: 'Doctors who truly love animals' },
    items: [
      { title: { ro: 'Urgențe 24/7', en: '24/7 Emergencies' }, desc: { ro: 'Disponibili non-stop. Animale bolnave nu știu de program.', en: 'Available non-stop. Sick animals don\'t know schedules.' } },
      { title: { ro: 'Laborator Propriu', en: 'In-house Lab' }, desc: { ro: 'Analize complete în 2 ore. Nu trimitem probe în altă parte.', en: 'Full analysis in 2 hours. No outsourcing.' } },
      { title: { ro: 'Medici Pasionați', en: 'Passionate Doctors' }, desc: { ro: 'Toți medicii noștri au animale proprii. Nu e un job — e o vocație.', en: 'All our doctors have their own pets. It\'s not a job — it\'s a calling.' } },
      { title: { ro: 'Autorizat ANSVSA', en: 'ANSVSA Certified' }, desc: { ro: 'Clinică autorizată, medicamente certificate, protocoale UE.', en: 'Certified clinic, certified medication, EU protocols.' } },
    ],
  },
  doctors: {
    label: { ro: 'Echipa noastră', en: 'Our team' },
    title: { ro: 'Medicii în Care Ai Încredere', en: 'Doctors You Can Trust' },
    bookDirect: { ro: 'Programare directă →', en: 'Direct booking →' },
    petLabel: { ro: 'Animalul de companie', en: 'Pet companion' },
    experience: { ro: 'ani experiență', en: 'years experience' },
    items: [
      { name: 'Dr. Andrei Popa', spec: { ro: 'Medicina internă câini & pisici', en: 'Internal medicine dogs & cats' }, years: 10, pet: { ro: 'Nala (pisică siameză)', en: 'Nala (Siamese cat)' } },
      { name: 'Dr. Cristina Voicu', spec: { ro: 'Chirurgie veterinară', en: 'Veterinary surgery' }, years: 8, pet: { ro: 'Rex (ciobănesc german)', en: 'Rex (German shepherd)' } },
      { name: 'Dr. Bogdan Iliescu', spec: { ro: 'Animale exotice & reptile', en: 'Exotic animals & reptiles' }, years: 6, pet: { ro: 'Kiwi (papagal)', en: 'Kiwi (parrot)' } },
    ],
  },
  stats: {
    items: [
      { value: '8.000+', label: { ro: 'Animale tratate', en: 'Animals treated' } },
      { value: '10', label: { ro: 'Ani de activitate', en: 'Years of activity' } },
      { value: '5', label: { ro: 'Medici specialiști', en: 'Specialist doctors' } },
      { value: '24/7', label: { ro: 'Disponibilitate urgențe', en: 'Emergency availability' } },
    ],
  },
  adoptions: {
    label: { ro: 'Dă o șansă', en: 'Give a chance' },
    title: { ro: 'Animale care Caută o Familie', en: 'Animals Looking for a Family' },
    available: { ro: 'Disponibil', en: 'Available' },
    reserved: { ro: 'Rezervat', en: 'Reserved' },
    adoptBtn: { ro: '🐾 Adoptă pe', en: '🐾 Adopt' },
    viewAll: { ro: 'Vezi toate animalele disponibile →', en: 'View all available animals →' },
    vaccinated: { ro: 'Vaccinat', en: 'Vaccinated' },
    dewormed: { ro: 'Deparazitat', en: 'Dewormed' },
    microchip: { ro: 'Microcip', en: 'Microchip' },
  },
  testimonials: {
    label: { ro: 'Poveștile lor', en: 'Their stories' },
    title: { ro: 'Ce Spun Stăpânii', en: 'What Pet Owners Say' },
  },
  blogPreview: {
    label: { ro: 'Sfaturi', en: 'Tips' },
    title: { ro: 'Din Cabinetul Veterinar', en: 'From the Vet\'s Office' },
  },
  cta: {
    title: { ro: 'Animalul Tău Merită Cei Mai Buni Medici', en: 'Your Pet Deserves the Best Doctors' },
    subtitle: { ro: 'Programează o consultație azi — prima consultație la 80 RON.', en: 'Book a consultation today — first consultation at 80 RON.' },
    btn: { ro: '🗓️ Programează Acum →', en: '🗓️ Book Now →' },
    sub: { ro: '✓ Confirmare instant ✓ Anulare gratuită ✓ Urgențe 24/7', en: '✓ Instant confirmation ✓ Free cancellation ✓ 24/7 Emergencies' },
  },
  footer: {
    tagline: { ro: 'Medicii care iubesc animalele.', en: 'Doctors who love animals.' },
    quickServices: { ro: 'Servicii Rapide', en: 'Quick Services' },
    usefulInfo: { ro: 'Informații Utile', en: 'Useful Info' },
    contactTitle: { ro: 'Contact', en: 'Contact' },
    copyright: { ro: '© 2026 VetCare Clinic | Made with 🐾 in România', en: '© 2026 VetCare Clinic | Made with 🐾 in Romania' },
  },
  booking: {
    heroBadge: { ro: '● Disponibil pentru programări', en: '● Available for bookings' },
    title: { ro: 'Programează Consultația', en: 'Book Your Consultation' },
    subtitle: { ro: 'Rapid, simplu, confirmare instant.', en: 'Fast, simple, instant confirmation.' },
    step1: { ro: 'Animalul Tău', en: 'Your Pet' },
    step2: { ro: 'Tipul Consultației', en: 'Consultation Type' },
    step3: { ro: 'Data & Medicul', en: 'Date & Doctor' },
    step4: { ro: 'Datele Tale', en: 'Your Details' },
    petName: { ro: 'Cum îl cheamă?', en: 'Pet\'s name?' },
    petAge: { ro: 'Vârstă aproximativă', en: 'Approximate age' },
    chooseDoctor: { ro: 'Aleg medicul', en: 'Choose doctor' },
    firstAvailable: { ro: 'Primul disponibil', en: 'First available' },
    ownerName: { ro: 'Nume proprietar', en: 'Owner name' },
    phone: { ro: 'Telefon', en: 'Phone' },
    email: { ro: 'Email', en: 'Email' },
    newClient: { ro: 'Ești client nou?', en: 'Are you a new client?' },
    symptoms: { ro: 'Descrie simptomele sau motivul vizitei', en: 'Describe symptoms or visit reason' },
    smsReminder: { ro: 'Doresc reminder SMS', en: 'I want SMS reminder' },
    confirm: { ro: '✅ Confirmă Programarea', en: '✅ Confirm Booking' },
    next: { ro: 'Continuă →', en: 'Continue →' },
    back: { ro: '← Înapoi', en: '← Back' },
    successTitle: { ro: '🐾 Programare Confirmată!', en: '🐾 Booking Confirmed!' },
    bringHealth: { ro: 'Ce să aduci: carnetul de sănătate al animalului', en: 'What to bring: pet health booklet' },
    parking: { ro: 'Parcare disponibilă', en: 'Parking available' },
    summary: { ro: 'Sumar programare', en: 'Booking summary' },
  },
  adoptionPage: {
    heroBadge: { ro: '🐾 Dă o șansă', en: '🐾 Give a chance' },
    title: { ro: 'Fiecare Animal Merită O Familie', en: 'Every Animal Deserves a Family' },
    subtitle: { ro: 'Animale abandonate, salvate și îngrijite — în căutarea unei case cu dragoste.', en: 'Abandoned, rescued and cared for animals — looking for a loving home.' },
    all: { ro: 'Toți', en: 'All' },
    dogs: { ro: 'Câini', en: 'Dogs' },
    cats: { ro: 'Pisici', en: 'Cats' },
    others: { ro: 'Alții', en: 'Others' },
    puppy: { ro: 'Pui', en: 'Puppy' },
    adult: { ro: 'Adult', en: 'Adult' },
    senior: { ro: 'Senior', en: 'Senior' },
    small: { ro: 'Mic', en: 'Small' },
    medium: { ro: 'Mediu', en: 'Medium' },
    large: { ro: 'Mare', en: 'Large' },
    adoptForm: { ro: '❤️ Vreau să-l Adopt', en: '❤️ I Want to Adopt' },
    howItWorks: { ro: 'Cum Funcționează Adopția', en: 'How Adoption Works' },
    step1: { ro: 'Completezi formularul', en: 'Fill in the form' },
    step2a: { ro: 'Venim în vizită', en: 'We visit you' },
    step3a: { ro: 'Aduci animalul acasă', en: 'Take your pet home' },
    sponsor: { ro: 'Nu poți adopta? Sponsorizează îngrijirea unui animal — de la 50 RON/lună.', en: 'Can\'t adopt? Sponsor an animal\'s care — from 50 RON/month.' },
    sponsorBtn: { ro: 'Sponsorizează', en: 'Sponsor' },
  },
  servicesPage: {
    title: { ro: 'Servicii & Prețuri', en: 'Services & Pricing' },
  },
  contactPage: {
    title: { ro: 'Contact', en: 'Contact' },
    about: { ro: 'Despre Noi', en: 'About Us' },
    aboutText: { ro: 'VetCare Clinic a fost fondată în 2014 din pasiune pentru animale. Oferim servicii veterinare complete cu echipament de ultimă generație.', en: 'VetCare Clinic was founded in 2014 out of passion for animals. We offer complete veterinary services with state-of-the-art equipment.' },
    sendMessage: { ro: 'Trimite Mesaj', en: 'Send Message' },
    name: { ro: 'Nume', en: 'Name' },
    message: { ro: 'Mesajul tău', en: 'Your message' },
    send: { ro: 'Trimite', en: 'Send' },
    schedule: { ro: 'Program', en: 'Schedule' },
    weekdays: { ro: 'Luni - Vineri: 08:00 - 20:00', en: 'Monday - Friday: 08:00 - 20:00' },
    weekend: { ro: 'Sâmbătă - Duminică: 09:00 - 17:00', en: 'Saturday - Sunday: 09:00 - 17:00' },
    emergencyAlways: { ro: 'Urgențe: Non-stop 24/7', en: 'Emergencies: 24/7 Non-stop' },
  },
} as const;

type Translations = typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({ lang: 'ro', setLang: () => {}, t: translations });

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('ro');
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

// Helper to get translated string
export const useTr = () => {
  const { lang } = useI18n();
  return useCallback((obj: { ro: string; en: string }) => obj[lang], [lang]);
};
