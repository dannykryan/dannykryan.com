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
  title: `Danny Ryan's Portfolio`,
  description: 'A website for software developer, Danny Ryan.',
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
