'use client'

import {
  AlertTriangle,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  Gauge,
  HeartPulse,
  NotebookPen,
  Sparkles,
  TrafficCone,
  Wrench,
} from 'lucide-react'

const subjects = [
  {
    title: 'Trafik ve Çevre',
    icon: TrafficCone,
    progress: 78,
    color: 'bg-primary',
    iconBg: 'bg-secondary text-primary',
  },
  {
    title: 'İlk Yardım',
    icon: HeartPulse,
    progress: 52,
    color: 'bg-destructive',
    iconBg: 'bg-destructive/10 text-destructive',
  },
  {
    title: 'Motor ve Araç Tekniği',
    icon: Wrench,
    progress: 34,
    color: 'bg-warning',
    iconBg: 'bg-warning/15 text-warning-foreground',
  },
  {
    title: 'Trafik Adabı',
    icon: Sparkles,
    progress: 90,
    color: 'bg-success',
    iconBg: 'bg-success/10 text-success',
  },
]

const quickActions = [
  {
    title: 'Sınav Provası',
    subtitle: '50 soru',
    icon: ClipboardCheck,
    className: 'bg-primary text-primary-foreground',
  },
  {
    title: 'Hata Defteri',
    subtitle: '12 soru',
    icon: NotebookPen,
    className: 'bg-destructive text-destructive-foreground',
  },
  {
    title: 'Trafik İşaretleri',
    subtitle: '214 işaret',
    icon: TrafficCone,
    className: 'bg-success text-success-foreground',
  },
  {
    title: 'Trafik Cezaları',
    subtitle: 'Güncel liste',
    icon: AlertTriangle,
    className: 'bg-warning text-warning-foreground',
  },
]

function ProgressRing({ value }: { value: number }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-secondary"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-primary">{value}%</span>
      </div>
    </div>
  )
}

export function HomeScreen() {
  return (
    <div className="flex flex-col gap-5 p-4 pb-8">
      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-extrabold text-balance">Günaydın!</h1>
          <p className="text-sm font-semibold text-muted-foreground">
            Bugün de harika gidiyorsun
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-warning/15 px-4 py-2">
          <Flame className="h-5 w-5 text-warning" fill="currentColor" />
          <span className="text-sm font-extrabold text-warning-foreground">
            5 Gün
          </span>
        </div>
      </header>

      {/* Exam countdown */}
      <section
        aria-label="Sınav geri sayımı"
        className="flex items-center gap-4 rounded-3xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/25"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15">
          <CalendarDays className="h-7 w-7" />
        </div>
        <div>
          <p className="text-lg font-extrabold text-balance">
            Sınava 15 Gün Kaldı!
          </p>
          <p className="text-sm font-semibold opacity-80">
            Hedefine çok yaklaştın, devam et!
          </p>
        </div>
      </section>

      {/* Question of the day */}
      <section
        aria-label="Günün sorusu"
        className="flex items-center justify-between gap-3 rounded-3xl bg-card p-5 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-extrabold">Günün Sorusu</p>
            <p className="text-sm font-semibold text-muted-foreground">
              Bugünkü meydan okumayı çöz!
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1.5 text-xs font-extrabold text-success">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Tamamlandı
        </span>
      </section>

      {/* Overall progress */}
      <section
        aria-label="Genel ilerleme"
        className="flex items-center gap-5 rounded-3xl bg-card p-5 shadow-sm"
      >
        <ProgressRing value={65} />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-extrabold text-balance">Sınava Hazırlık</p>
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Gauge className="h-4 w-4 text-primary" />
            <span>1.240 soru çözüldü</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <BookOpenCheck className="h-4 w-4 text-success" />
            <span>18 ders okundu</span>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section aria-label="Hızlı erişim">
        <h2 className="mb-3 text-lg font-extrabold">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.title}
                type="button"
                className={`flex aspect-square flex-col items-start justify-between rounded-3xl p-4 text-left shadow-md transition-transform active:scale-95 ${action.className}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-base font-extrabold leading-tight text-balance">
                    {action.title}
                  </span>
                  <span className="block text-xs font-semibold opacity-80">
                    {action.subtitle}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Subject progress */}
      <section aria-label="Konu ilerlemesi">
        <h2 className="mb-3 text-lg font-extrabold">Konu İlerlemen</h2>
        <div className="flex flex-col gap-3">
          {subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <div
                key={subject.title}
                className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${subject.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-sm font-extrabold">{subject.title}</p>
                    <span className="text-xs font-extrabold text-muted-foreground">
                      {subject.progress}%
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={subject.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${subject.title} ilerlemesi`}
                    className="h-2.5 overflow-hidden rounded-full bg-muted"
                  >
                    <div
                      className={`h-full rounded-full ${subject.color}`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
