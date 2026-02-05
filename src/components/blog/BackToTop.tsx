'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
    onClick={scrollToTop}
    className={`fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center opacity-50 bg-orange dark:bg-green text-white rounded-full shadow-lg hover:opacity-100 hover:scale-110 transition-all duration-300 ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
    }`}
    aria-label="Back to top"
  >
    ↑
  </button>
  );
}