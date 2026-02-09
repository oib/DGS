'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              DGS Lernplattform
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Deutsche Gebärdensprache lernen - Eine interaktive Plattform zum Erlernen der deutschen Gebärdensprache.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/oib/DGS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://bubuit.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  bubuit.net
                </a>
              </li>
              <li>
                <a 
                  href="https://windsurf.com/refer?referral_code=4j75hl1x7ibz3yj8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Built with Windsurf
                </a>
              </li>
              <li>
                <Link 
                  href="/impressum" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Kontakt
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <a 
                  href="mailto:andreas.fleckl@bubuit.net" 
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  andreas.fleckl@bubuit.net
                </a>
              </p>
              <p className="whitespace-pre-line">
                Andreas Michael Fleckl
                Johnstraße 7/6
                1140 Vienna
                Austria / Europe
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
