'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export default function ImpressumPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Startseite
            </button>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Impressum
          </h1>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="whitespace-pre-line">
                Andreas Michael Fleckl
                Johnstraße 7/6
                1140 Vienna
                Austria / Europe
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Kontakt
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>E-Mail:</strong>{' '}
                  <a 
                    href="mailto:andreas.fleckl@bubuit.net" 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    andreas.fleckl@bubuit.net
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a 
                    href="https://bubuit.net" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    bubuit.net
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Haftungsausschluss
              </h2>
              <p className="text-sm leading-relaxed">
                Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. 
                Der Betreiber übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit 
                und Aktualität der bereitgestellten Inhalte.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Urheberrecht
              </h2>
              <p className="text-sm leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts 
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Datenschutz
              </h2>
              <p className="text-sm leading-relaxed">
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener 
                Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise 
                Name, Adresse oder E-Mail-Adressen) erhoben werden, erfolgt dies stets auf 
                freiwilliger Basis.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
