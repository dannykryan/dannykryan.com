"use client"
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { AiOutlineGithub } from 'react-icons/ai';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-charcoal/70 backdrop-blur-md border-b-2 border-orange dark:border-greenDark">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-charcoal dark:text-white hover:text-orange dark:hover:text-green transition-colors duration-300">
            <div className="text-xl font-bold">dannykryan.com</div>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-10 lg:gap-8">
              <li><Link href="#hero" className="menuLink">Home</Link></li>
              <li><Link href="#projects" className="menuLink">Projects</Link></li>
              <li><Link href="#skills" className="menuLink">Skills</Link></li>
              <li><Link href="#testimonials" className="menuLink">Testimonials</Link></li>
            </ul>
            <DarkModeToggle />
            <Link 
              aria-label="Visit Danny's Github page"
              href="https://github.com/dannykryan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-button"
            >
              <AiOutlineGithub 
                size={"24px"} 
                className="navbar-button-icon"
              />
            </Link>
          </div>
          <button 
            aria-label='toggle mobile navigation menu'
            onClick={toggleMenu} 
            className="md:hidden hover:text-orange dark:hover:text-green transition-colors duration-200"
          >
            {isMenuOpen ? (
              <AiOutlineClose 
                size={30}
              />
            ) : (
              <AiOutlineMenu 
                size={30}
              />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-4 items-end md:hidden bg-charcoalLight rounded-lg pt-4">
            <ul className="flex flex-col gap-4 text-right">
              <li><Link href="#hero" onClick={toggleMenu} className="menuLink">Home</Link></li>
              <li><Link href="#projects" onClick={toggleMenu} className="menuLink">Projects</Link></li>
              <li><Link href="#skills" onClick={toggleMenu} className="menuLink">Skills</Link></li>
              <li><Link href="#testimonials" onClick={toggleMenu} className="menuLink">Testimonials</Link></li>
            </ul>
            <div className="flex gap-2 items-center">
              <DarkModeToggle padding={"p-0"}/>
              <Link 
                href="https://github.com/dannykryan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="navbar-button"
              >
                <AiOutlineGithub size={"24px"} className="navbar-button-icon"/>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;