'use client'

import { useState } from 'react'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1">
        <MainContent activeSection={activeSection} setActiveSection={setActiveSection} />
      </main>
      <Footer />
    </div>
  )
}
