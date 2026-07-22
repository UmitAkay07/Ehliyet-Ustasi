'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  HeartPulse,
  Sparkles,
  TrafficCone,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const subjects = [
  {
    id: 'trafik',
    title: 'Trafik ve Çevre',
    icon: TrafficCone,
    iconBg: 'bg-secondary text-primary',
    completed: 5,
    topics: [
      { title: 'Trafik İşaretleri', done: true },
      { title: 'Kavşaklar ve Geçiş Hakkı', done: true },
      { title: 'Hız Limitleri', done: true },
      { title: 'Şerit Kullanımı', done: true },
      { title: 'Park Etme Kuralları', done: true },
      { title: 'Alkol ve Trafik', done: false },
      { title: 'Çevre Bilgisi', done: false },
    ],
  },
  {
    id: 'ilkyardim',
    title: 'İlk Yardım',
    icon: HeartPulse,
    iconBg: 'bg-destructive/10 text-destructive',
    completed: 3,
    topics: [
      { title: 'Temel Yaşam Desteği', done: true },
      { title: 'Kanamalar', done: true },
      { title: 'Kırık ve Çıkıklar', done: true },
      { title: 'Yanıklar', done: false },
      { title: 'Bilinç Kaybı', done: false },
    ],
  },
  {
    id: 'motor',
    title: 'Motor ve Araç Tekniği',
    icon: Wrench,
    iconBg: 'bg-warning/15 text-warning-foreground',
    completed: 2,
    topics: [
      { title: 'Motorun Yapısı', done: true },
      { title: 'Yağlama Sistemi', done: true },
      { title: 'Soğutma Sistemi', done: false },
      { title: 'Elektrik Sistemi', done: false },
      { title: 'Fren Sistemi', done: false },
      { title: 'Lastikler', done: false },
    ],
  },
  {
    id: 'adab',
    title: 'Trafik Adabı',
    icon: Sparkles,
    iconBg: 'bg-success/10 text-success',
    completed: 4,
    topics: [
      { title: 'Empati ve Saygı', done: true },
      { title: 'Öfke Yönetimi', done: true },
      { title: 'Yaya Hakları', done: true },
      { title: 'Trafik Kültürü', done: true },
    ],
  },
]

export function LessonsScreen() {
  const [openId, setOpenId] = useState<string | null>('trafik')

  return (
    <div className="flex flex-col gap-5 p-4 pb-8">
      <header className="pt-2">
        <h1 className="text-2xl font-extrabold text-balance">Ders Çalış</h1>
        <p className="text-sm font-semibold text-muted-foreground">
          Konuları öğren, sınava hazır ol
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {subjects.map((subject) => {
          const Icon = subject.icon
          const isOpen = openId === subject.id
          const total = subject.topics.length
          return (
            <div
              key={subject.id}
              className="overflow-hidden rounded-3xl bg-card shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : subject.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${subject.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-extrabold">{subject.title}</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {subject.completed}/{total} konu tamamlandı
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <ul className="flex flex-col border-t border-border">
                  {subject.topics.map((topic) => (
                    <li key={topic.title}>
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-muted"
                      >
                        {topic.done ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        ) : (
                          <Circle className="h-5 w-5 shrink-0 text-border" />
                        )}
                        <span
                          className={cn(
                            'text-sm font-bold',
                            topic.done
                              ? 'text-muted-foreground'
                              : 'text-foreground',
                          )}
                        >
                          {topic.title}
                        </span>
                        {topic.done && (
                          <span className="ml-auto rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-extrabold text-success">
                            Bitti
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
