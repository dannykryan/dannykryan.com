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
    <div className="fixed top-0 left-0 w-full z-50 bg-offWhite dark:bg-charcoal border-b-2 border-orange dark:border-greenDark">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center pb-4">
          <Link href="/" className="hover:text-orange dark:hover:text-green transition-colors duration-200">
            <div className="text-xl font-bold">dannykryan.com</div>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-10 lg:gap-8">
              <Link href="#hero"><li className="menuLink">Home</li></Link>
              <Link href="#projects"><li className="menuLink">Projects</li></Link>
              <Link href="#skills"><li className="menuLink">Skills</li></Link>
              <Link href="#testimonials"><li className="menuLink">Testimonials</li></Link>
            </ul>
            <DarkModeToggle />
            <Link 
              href="https://github.com/dannykryan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-button"
            >
              <AiOutlineGithub size={"24px"} className="navbar-button-icon"/>
            </Link>
          </div>
          <button 
            onClick={toggleMenu} 
            className="md:hidden hover:text-orange dark:hover:text-green transition-colors duration-200"
          >
            {isMenuOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-4 items-end md:hidden bg-charcoalLight dark:bg-charcoal rounded-lg px-4 py-4 mb-4">
            <ul className="flex flex-col gap-4 text-right">
              <Link href="#hero" onClick={toggleMenu}><li className="menuLink">Home</li></Link>
              <Link href="#projects" onClick={toggleMenu}><li className="menuLink">Projects</li></Link>
              <Link href="#skills" onClick={toggleMenu}><li className="menuLink">Skills</li></Link>
              <Link href="#testimonials" onClick={toggleMenu}><li className="menuLink">Testimonials</li></Link>
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