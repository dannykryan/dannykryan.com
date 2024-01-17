import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="container pt-8">
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium">Danny Ryan</div>
        <ul className="gap-10 lg:gap-16 hidden md:flex">
            <Link href="#hero"><li className="menuLink">Home</li></Link>
            <Link href="#projects"><li className="menuLink">Projects</li></Link>
            <Link href="#skills"><li className="menuLink">Skills</li></Link>
            <Link href="#testimonials"><li className="menuLink">Testimonials</li></Link>
            {/* <Link href="#contact"><li className="menuLink">Contact</li></Link> */}
        </ul>
        <AiOutlineMenu className="md:hidden" size={30} />
      </div>
    </div>
  );
};

export default Navbar;
