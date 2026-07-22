'use client'

import {
  AlertOctagon,
  ArrowLeftRight,
  CornerDownLeft,
  Play,
  RotateCcw,
  Undo2,
} from 'lucide-react'

const maneuvers = [
  {
    title: 'L Park',
    description: 'Dik park cebine geri geri giriş',
    icon: CornerDownLeft,
    difficulty: 'Orta',
    difficultyClass: 'bg-warning/15 text-warning-foreground',
    iconBg: 'bg-secondary text-primary',
  },
  {
    title: 'Paralel Park',
    description: 'İki araç arasına yanaşarak park',
    icon: ArrowLeftRight,
    difficulty: 'Zor',
    difficultyClass: 'bg-destructive/10 text-destructive',
    iconBg: 'bg-destructive/10 text-destructive',
  },
  {
    title: 'Ani Fren',
    description: '50 km/s hızdan güvenli duruş',
    icon: AlertOctagon,
    difficulty: 'Kolay',
    difficultyClass: 'bg-success/10 text-success',
    iconBg: 'bg-warning/15 text-warning-foreground',
  },
  {
    title: 'U Dönüşü',
    description: 'Dar alanda güvenli yön değiştirme',
    icon: RotateCcw,
    difficulty: 'Orta',
    difficultyClass: 'bg-warning/15 text-warning-foreground',
    iconBg: 'bg-success/10 text-success',
  },
  {
    title: '25 Metre Geri',
    description: 'Düz hat üzerinde geri gitme',
    icon: Undo2,
    difficulty: 'Kolay',
    difficultyClass: 'bg-success/10 text-success',
    iconBg: 'bg-secondary text-primary',
  },
]

export function SimulatorScreen() {
  return (
    <div className="flex flex-col gap-5 p-4 pb-8">
      <header className="pt-2">
        <h1 className="text-2xl font-extrabold text-balance">
          Direksiyon Sınavı
        </h1>
        <p className="text-sm font-semibold text-muted-foreground text-pretty">
          Manevra animasyonlarını izle ve kuralları öğren.
        </p>
      </header>

      {/* Hero: Full simulation */}
      <section
        aria-label="Tam sınav simülasyonu"
        className="flex flex-col items-center gap-4 rounded-3xl bg-success p-6 text-center text-success-foreground shadow-lg shadow-success/25"
      >
        <button
          type="button"
          aria-label="Simülasyonu başlat"
          className="flex h-20 w-20 items-center justify-center rounded-full bg-success-foreground/20 transition-transform active:scale-95"
        >
          <Play className="ml-1 h-9 w-9" fill="currentColor" />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-balance">
            Tam Sınav Simülasyonu
          </h2>
          <p className="mt-1 text-sm font-semibold opacity-85">
            Sınav güzergahını baştan sona deneyimle
          </p>
        </div>
      </section>

      {/* Maneuvers */}
      <section aria-label="Manevralar">
        <h2 className="mb-3 text-lg font-extrabold">Manevralar</h2>
        <div className="flex flex-col gap-3">
          {maneuvers.map((maneuver) => {
            const Icon = maneuver.icon
            return (
              <button
                key={maneuver.title}
                type="button"
                className="flex w-full items-center gap-4 rounded-3xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.98]"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${maneuver.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-extrabold">{maneuver.title}</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {maneuver.description}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold ${maneuver.difficultyClass}`}
                >
                  {maneuver.difficulty}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
