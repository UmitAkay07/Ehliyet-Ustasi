'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { HomeScreen } from '@/components/screens/home-screen'
import { LessonsScreen } from '@/components/screens/lessons-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { QuizzesScreen } from '@/components/screens/quizzes-screen'
import { SimulatorScreen } from '@/components/screens/simulator-screen'

export type Tab = 'home' | 'lessons' | 'quizzes' | 'simulator' | 'profile'

const screens: Record<Tab, React.ComponentType> = {
  home: HomeScreen,
  lessons: LessonsScreen,
  quizzes: QuizzesScreen,
  simulator: SimulatorScreen,
  profile: ProfileScreen,
}

export function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const Screen = screens[activeTab]

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      <main className="flex-1 pb-24">
        <Screen />
      </main>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
