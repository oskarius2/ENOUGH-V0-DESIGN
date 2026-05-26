'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Är ENOUGH säker och privatmässigt?',
      answer: 'Ja, ENOUGH är byggd med integritet i fokus. Alla data är krypterad end-to-end, lagras i Sverige enligt GDPR, och vi säljer aldrig data till tredje part. Barn kan inte använda VPN för att kringgå appen.'
    },
    {
      question: 'Vilket åldersintervall är ENOUGH lämplig för?',
      answer: 'ENOUGH är designad för barn från 6 till 18 år. Vi erbjuder åldersbaserade inställningar så att begränsningar blir allt mindre strikta när barnet växer upp.'
    },
    {
      question: 'Kan mitt barn ta bort appen?',
      answer: 'Nej. Appen kan bara avinstalleras från förälderns konto. Detta säkerställer att skyddet inte kan kringgås av barnet.'
    },
    {
      question: 'Hur mycket kostar ENOUGH?',
      answer: 'ENOUGH erbjuds helt kostnadsfritt med grundläggande funktioner. Vi planerar premiumfunktioner framöver, men basutbudet kommer alltid att vara gratis.'
    },
    {
      question: 'Vilka enheter stöds?',
      answer: 'ENOUGH stöder iOS 12+ och Android 8+. Vi arbetar också på PC och Mac-versioner som kommer snart.'
    },
    {
      question: 'Vad gör ENOUGH om det hittar något farligt?',
      answer: 'Appen varnar föräldern direkt via push-notifikation. Du kan då välja att blockera innehållet, sätta gränser eller bara ta upp det med ditt barn beroende på situationen.'
    },
  ]

  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-900/30/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-4">
            Vanliga frågor
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Svar på det föräldrar ofta undrar
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 dark:border-gray-800 bg-background overflow-hidden hover:border-primary transition-colors"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 dark:bg-gray-900/50 transition-colors"
              >
                <span className="font-bold font-bold text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                    open === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === index && (
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4 animate-in fade-in duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
