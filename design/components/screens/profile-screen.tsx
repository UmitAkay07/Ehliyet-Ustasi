'use client'

import {
  CalendarDays,
  ChevronRight,
  Flame,
  Library,
  Moon,
  Target,
  Trash2,
  Trophy,
} from 'lucide-react'

const stats = [
  {
    label: 'Çözülen Soru',
    value: '1.240',
    icon: Target,
    iconColor: 'text-primary',
    iconBg: 'bg-secondary',
  },
  {
    label: 'Başarı Oranı',
    value: '%82',
    icon: Trophy,
    iconColor: 'text-success',
    iconBg: 'bg-success/10',
  },
  {
    label: 'Seri',
    value: '5 Gün',
    icon: Flame,
    iconColor: 'text-warning',
    iconBg: 'bg-warning/15',
  },
]

export function ProfileScreen() {
  return (
    <div className="flex flex-col gap-5 p-4 pb-8">
      <header className="pt-2">
        <h1 className="text-2xl font-extrabold text-balance">
          Profil ve Ayarlar
        </h1>
      </header>

      {/* User card */}
      <section
        aria-label="Kullanıcı bilgileri"
        className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-sm"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-primary-foreground">
          EK
        </div>
        <div>
          <p className="text-lg font-extrabold">Emre Kaya</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-secondary-foreground">
              Seviye 7
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              2.450 Puan
            </span>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section aria-label="İstatistikler" className="grid grid-cols-3 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-3xl bg-card p-4 text-center shadow-sm"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </span>
              <span className="text-base font-extrabold leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground">
                {stat.label}
              </span>
            </div>
          )
        })}
      </section>

      {/* Exam date */}
      <section
        aria-label="Sınav tarihi"
        className="rounded-3xl bg-card p-5 shadow-sm"
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-extrabold">Sınav Tarihin</p>
            <p className="text-xs font-semibold text-muted-foreground">
              Geri sayım için tarihini ayarla
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
          <span className="text-sm font-extrabold">6 Ağustos 2026</span>
          <button
            type="button"
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-extrabold text-primary-foreground transition-transform active:scale-95"
          >
            Değiştir
          </button>
        </div>
      </section>

      {/* Settings */}
      <section aria-label="Ayarlar" className="overflow-hidden rounded-3xl bg-card shadow-sm">
        <button
          type="button"
          className="flex w-full items-center gap-4 border-b border-border p-4 text-left transition-colors hover:bg-muted"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary">
            <Moon className="h-5 w-5 text-primary" />
          </div>
          <span className="flex-1 text-sm font-extrabold">
            Tema (Koyu / Açık)
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-4 border-b border-border p-4 text-left transition-colors hover:bg-muted"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-success/10">
            <Library className="h-5 w-5 text-success" />
          </div>
          <span className="flex-1 text-sm font-extrabold">Bilgi Bankası</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-destructive/5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/10">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <span className="flex-1 text-sm font-extrabold text-destructive">
            Verileri Sıfırla
          </span>
          <ChevronRight className="h-5 w-5 text-destructive/50" />
        </button>
      </section>
    </div>
  )
}
