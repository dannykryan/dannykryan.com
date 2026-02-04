import React from 'react'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dannykryan.com'),
  title: `Danny Ryan | Web Developer`,
  description: 'A website for web developer, Danny Ryan.',
  openGraph: {
    title: 'Danny Ryan | Web Developer',
    description: 'Portfolio website for web developer Danny Ryan',
    url: 'https://dannykryan.com',
    siteName: 'Danny Ryan Portfolio',
    images: [
      {
        url: '/public/dannykryan-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Danny Ryan Portfolio Preview',
      },
    ],
    locale: 'en_UK',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
