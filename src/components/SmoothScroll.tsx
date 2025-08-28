"use client"
import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Get all anchor links that point to IDs
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      
      if (!href) return;
      
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) return;
      
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
      const headerOffset = 73;
      const elementPosition = offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    };
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleClick);
    });
    
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, []);
  
  return null;
}