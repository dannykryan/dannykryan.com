"use client"
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-offWhite dark:bg-charcoal border-b border-[#8d8d8d]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium">Danny Ryan</div>
          <div className="flex items-center gap-4">
            <ul className="gap-10 lg:gap-8 hidden md:flex">
              <Link href="#hero"><li className="menuLink">Home</li></Link>
              <Link href="#projects"><li className="menuLink">Projects</li></Link>
              <Link href="#skills"><li className="menuLink">Skills</li></Link>
              <Link href="#testimonials"><li className="menuLink">Testimonials</li></Link>
            </ul>
            <button
              onClick={toggleDarkMode}
              className="navbar-button"
            >
              {isDarkMode ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="navbar-button-icon"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="navbar-button-icon"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              )}
            </button>
          </div>
          <AiOutlineMenu className="md:hidden" size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
