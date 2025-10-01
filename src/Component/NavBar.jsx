import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogOut from './LogOut'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        {/* Left side - App name or logo */}
        <div className="text-xl font-bold">
          <Link to="/">Learn Link</Link>
        </div>

        {/* Hamburger menu button - visible only on mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-x-6 text-sm">
          <Link to="/resources" className="text-black transition hover:text-blue-600 hover:font-semibold">
            Resources
          </Link>
          <Link to="/articles" className="text-black transition hover:text-blue-600 hover:font-semibold">
            Articles
          </Link>
          <Link to="/aboutus" className="text-black transition hover:text-blue-600 hover:font-semibold">
            About Us
          </Link>
          <Link to="/mysaved" className="text-black transition hover:text-blue-600 hover:font-semibold">
            Saved
          </Link>
          <LogOut />
        </div>
      </div>

      {/* Mobile Navigation - dropdown menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col gap-4 px-4 py-4 bg-gray-50 border-t">
          <Link 
            to="/resources" 
            className="text-black transition hover:text-blue-600 hover:font-semibold py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
          <Link 
            to="/articles" 
            className="text-black transition hover:text-blue-600 hover:font-semibold py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Articles
          </Link>
          <Link 
            to="/aboutus" 
            className="text-black transition hover:text-blue-600 hover:font-semibold py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/mysaved" 
            className="text-black transition hover:text-blue-600 hover:font-semibold py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Saved
          </Link>
          <div className="py-2">
            <LogOut />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar