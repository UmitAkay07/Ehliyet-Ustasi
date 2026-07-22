'use client'

import {
  ChevronRight,
  Clapperboard,
  HeartPulse,
  Play,
  Sparkles,
  TrafficCone,
  Trophy,
  Wrench,
} from 'lucide-react'

const categories = [
  {
    title: 'Trafik ve Çevre',
    icon: TrafficCone,
    iconBg: 'bg-secondary text-primary',
  },
  {
    title: 'Motor ve Araç Tekniği',
    icon: Wrench,
    iconBg: 'bg-warning/15 text-warning-foreground',
  },
  {
    title: 'İlk Yardım',
    icon: HeartPulse,
    iconBg: 'bg-destructive/10 text-destructive',
  },
  {
    title: 'Trafik Adabı',
    icon: Sparkles,
    iconBg: 'bg-success/10 text-success',
  },
]

export function QuizzesScreen() {
  return (
    <div className="flex flex-col gap-5 p-4 pb-8">
      <header className="pt-2">
        <h1 className="text-2xl font-extrabold text-balance">Test Çöz</h1>
        <p className="text-sm font-semibold text-muted-foreground">
          Pratik yap, kendini dene
        </p>
      </header>

      {/* Hero: Full mock exam */}
      <section
        aria-label="Gerçek sınav provası"
        className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/25"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-extrabold">
            50 Soru
          </span>
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-extrabold">
            45 Dakika
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-balance">
          Gerçek Sınav Provası
        </h2>
        <p className="mt-1 text-sm font-semibold opacity-80">
          Gerçek sınav formatında kendini test et. 70 puan ve üzeri geçer!
        </p>
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-card py-3.5 text-base font-extrabold text-primary shadow-md transition-transform active:scale-95"
        >
          <Play className="h-5 w-5" fill="currentColor" />
          Başla
        </button>
      </section>

      {/* Last result */}
      <section
        aria-label="Son sonucun"
        className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-success/10">
          <Trophy className="h-6 w-6 text-success" />
        </div>
        <div className="flex-1">
          <p className="font-extrabold">Sonucun: 85 Puan</p>
          <p className="text-xs font-semibold text-muted-foreground">
            Son sınav provası &middot; 2 gün önce
          </p>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-extrabold text-success">
          Geçtin!
        </span>
      </section>

      {/* Scenario tests */}
      <button
        type="button"
        className="flex w-full items-center gap-4 rounded-3xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.98]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-warning/15">
          <Clapperboard className="h-6 w-6 text-warning-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-extrabold">Senaryo Testi</p>
          <p className="text-xs font-semibold text-muted-foreground">
            Animasyonlu trafik senaryolarını çöz
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Category quizzes */}
      <section aria-label="Konu testleri">
        <h2 className="mb-3 text-lg font-extrabold">Konu Testleri</h2>
        <div className="flex flex-col gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.title}
                type="button"
                className="flex w-full items-center gap-4 rounded-3xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.98]"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${category.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-extrabold">{category.title}</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    10 soruluk hızlı test
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
