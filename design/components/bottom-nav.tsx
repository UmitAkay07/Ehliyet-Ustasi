'use client'

import { BookOpen, Car, ClipboardList, Home, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Tab } from '@/components/app-shell'

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Ana Sayfa', icon: Home },
  { id: 'lessons', label: 'Konular', icon: BookOpen },
  { id: 'quizzes', label: 'Testler', icon: ClipboardList },
  { id: 'simulator', label: 'Direksiyon', icon: Car },
  { id: 'profile', label: 'Profil', icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <nav
      aria-label="Ana gezinme"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md border-t border-border bg-card pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-stretch justify-between px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-2 transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-12 items-center justify-center rounded-full transition-colors',
                  isActive && 'bg-secondary',
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              </span>
              <span
                className={cn(
                  'text-[10px] font-bold',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
