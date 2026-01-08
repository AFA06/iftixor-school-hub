import { Check, X, Sparkles, Shield, Crown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'silver',
    name: 'SILVER',
    label: 'Core Teacher System',
    badge: 'Tavsiya etiladi',
    badgeTone: 'bg-slate-100 text-slate-900',
    icon: Sparkles,
    price: '$18,000 – $22,000',
    duration: '4-6 oy',
    accentBorder: 'border-slate-600',
    accentGlow: 'shadow-[0_18px_45px_rgba(15,23,42,0.45)]',
    includesTitle: 'Nimalar kiradi',
    excludesTitle: 'Nimalar kirmaydi',
    includes: [
      'Mobil ilova: O‘quvchi / O‘qituvchi / Ota-ona',
      'Admin Web panel: foydalanuvchi, sinf, fan, rollar boshqaruvi',
      'O‘qituvchi uchun “Smart doska”ga qulay kontent: PDF/rasm/prezentatsiya yuklash va ko‘rsatish',
      'Uy vazifalari: berish, topshirish, tekshirish, baholash',
      'Baholash: fan bo‘yicha baholar + izohlar',
      'Bildirishnomalar: uy vazifa / baho holati (ilova ichida)',
      'Coin/Token tizimi: faollik uchun ball berish',
      'Mini-market (virtual): coin evaziga sovg‘a/bonusni “redeem” qilish (oddiy approval bilan)',
      'Elektron kutubxona: kitob va materiallar (sinf/fan bo‘yicha)',
    ],
    excludes: [
      'Moliya (to‘lovlar, qarzlar, kassa)',
      'Oshxona moduli',
      'Kompyuter xonasini masofadan boshqarish',
      'Hikvision integratsiyasi',
      'Payment gateway (Click/Payme)',
      'Kengaytirilgan analytics / katta hisobotlar',
    ],
    bonus: [
      '3 oy bepul bug-fix (launchdan keyin)',
      '1 ta admin + 1 ta o‘qituvchilar uchun trening sessiyasi',
      'Uzbek + Rus tilini yoqish',
    ],
  },
  {
    id: 'gold',
    name: 'GOLD',
    label: 'Full School Platform',
    badge: 'Maktab miqyosida',
    badgeTone: 'bg-amber-100 text-amber-900',
    icon: Shield,
    price: '$30,000 – $40,000',
    duration: '8–10 oy',
    accentBorder: 'border-amber-400',
    accentGlow: 'shadow-[0_20px_55px_rgba(180,83,9,0.5)]',
    includesTitle: 'Nimalar kiradi',
    excludesTitle: 'Nimalar kirmaydi',
    includes: [
      'Silver’dagi hamma narsa',
      'To‘liq mobil tajriba: push notification',
      'Kengaytirilgan ota-ona ko‘rinishi: progress, tarix, statistikalar',
      'Admin dashboard: hisobotlar, eksport (PDF/Excel)',
      'Manual attendance (o‘qituvchi belgilaydi) + hisobotlar',
      'Kengaytirilgan ruxsatlar (permissions)',
      'Ilova ichida chat (o‘qituvchi ↔ ota-ona, o‘qituvchi ↔ o‘qituvchi)',
    ],
    excludes: [
      'Hikvision yuz tanish integratsiyasi (alohida)',
      'Payment integratsiyasi (alohida)',
      'Real device management (kompyuter lab) (alohida)',
    ],
    bonus: ['6–12 oy support (shartnoma bo‘yicha kelishiladi)'],
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    label: 'Enterprise + Integrations',
    badge: 'Strategik maktablar uchun',
    badgeTone: 'bg-violet-100 text-violet-900',
    icon: Crown,
    price: '$50,000',
    duration: '10–12 oy',
    accentBorder: 'border-violet-400',
    accentGlow: 'shadow-[0_20px_55px_rgba(76,29,149,0.6)]',
    includesTitle: 'Nimalar kiradi',
    excludesTitle: 'Nimalar kirmaydi',
    includes: [
      'Gold’dagi hamma narsa',
      'Hikvision integratsiyasi (attendance)',
      'Payment integratsiyasi (Click/Payme va h.k.)',
      '“Imtihon rejimi” (anti-cheat): imtihon vaqtida ilova/sahifa cheklanadi, aldash imkoniyati keskin kamaydi',
      'Kundalik.com integratsiyasi (API mavjud bo‘lsa)',
      'Avtobus GPS tracking: avtobus qayerda ekanini real vaqt ko‘rsatish',
      'AI analytics & AI assistant: tahlil + tavsiyalar (strategiya, samaradorlik, daromadni oshirish bo‘yicha)',
      'Security hardening + audit log + monitoring',
      'Multi-branch scalability (kelajak uchun)',
      'SLA: tezkor support + oylik texnik hisobot',
    ],
    excludes: [],
    bonus: [],
  },
];

const bulletBase = 'flex items-start gap-2 text-sm';

const PricingPlans = () => {
  const { toast } = useToast();

  const handleSelect = (planName: string) => {
    toast({
      title: 'Demo: Tanlandi',
      description: `${planName} tarif rejasi tanlandi (faqat taqdimot uchun).`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto py-6 md:py-10 lg:py-12">
        <header className="text-center mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300 mb-4">
            IFTIXOR SCHOOL PLATFORM
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-white">
            Iftixor School — Tarif rejalari
          </h1>
          <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto">
            Maktab uchun raqamli platforma: variantni tanlang va taqdimot davomida qaysi daraja
            sizga eng mos kelishini birgalikda muhokama qilamiz.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`relative h-full flex flex-col border bg-slate-900 ${plan.accentBorder} ${plan.accentGlow}`}
              >
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-800 border border-slate-500">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg tracking-wide text-white">{plan.name}</CardTitle>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                          {plan.label}
                        </p>
                      </div>
                    </div>
                    {plan.id === 'silver' && (
                      <Badge className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${plan.badgeTone}`}>
                        {plan.badge}
                      </Badge>
                    )}
                    {plan.id === 'gold' && (
                      <Badge variant="outline" className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${plan.badgeTone}`}>
                        Balansli tanlov
                      </Badge>
                    )}
                    {plan.id === 'platinum' && (
                      <Badge variant="outline" className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${plan.badgeTone}`}>
                        Strategik maktablar uchun
                      </Badge>
                    )}
                  </div>

                  <CardDescription className="mt-2 text-slate-100">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-slate-100 font-semibold">Narx oralig‘i</span>
                      <span className="text-lg font-bold text-emerald-300">{plan.price}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200">Taxminiy joriy etish muddati: {plan.duration}</p>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col gap-4 pb-4">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Check className="h-4 w-4 text-emerald-300" />
                      <span className="text-xs font-semibold text-emerald-200 uppercase tracking-[0.18em]">
                        {plan.includesTitle}
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {plan.includes.map((item) => (
                        <li key={item} className={bulletBase}>
                          <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/70">
                            <Check className="h-3 w-3 text-emerald-200" />
                          </span>
                          <span className="text-slate-100 text-[13px] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.id !== 'platinum' && (
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <X className="h-4 w-4 text-rose-300" />
                        <span className="text-xs font-semibold text-rose-200 uppercase tracking-[0.18em]">
                          {plan.excludesTitle}
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {plan.excludes.map((item) => (
                          <li key={item} className={bulletBase}>
                            <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-500/20 border border-rose-400/70">
                              <X className="h-3 w-3 text-rose-100" />
                            </span>
                            <span className="text-slate-100 text-[13px] leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {plan.bonus.length > 0 && (
                    <div className="mt-1 rounded-md border border-amber-400/60 bg-amber-500/10 px-3 py-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="h-4 w-4 text-amber-200" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                          Bonuslar
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {plan.bonus.map((item) => (
                          <li key={item} className="text-[13px] text-amber-50 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-0 pb-5 px-6 mt-auto flex flex-col gap-2">
                  <Button
                    className="w-full h-10 text-sm font-semibold tracking-wide shadow-lg shadow-emerald-500/30"
                    variant={plan.id === 'silver' ? 'default' : 'outline'}
                    onClick={() => handleSelect(plan.name)}
                  >
                    Tanlash
                  </Button>
                  <p className="text-[11px] text-slate-300 text-center">
                    Bu sahifa faqat taqdimot uchun mo‘ljallangan. Haqiqiy tijorat shartlari alohida
                    kelishiladi.
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
