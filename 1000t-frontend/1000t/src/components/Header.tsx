import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path || (path === '/home' && location.pathname === '/');
    return isActive 
      ? "text-gray-900 font-medium text-sm bg-orange-100 py-2 px-4 rounded-full hover:bg-orange-200 transition-colors"
      : "text-gray-600 font-normal text-sm hover:text-gray-900 transition-colors";
  };

  const getMobileNavLinkClass = (path: string) => {
    const isActive = location.pathname === path || (path === '/home' && location.pathname === '/');
    return isActive 
      ? "text-gray-900 font-medium text-base bg-orange-100 py-3 px-4 rounded-lg hover:bg-orange-200 transition-colors block"
      : "text-gray-600 font-normal text-base hover:text-gray-900 transition-colors block py-3 px-4";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <header className="bg-white py-3 md:py-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="logo flex-shrink-0">
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <img 
              src="/assets/1000 tonguessss 1.png" 
              alt="1000 Tongues" 
              className="h-6 sm:h-7 md:h-8 w-auto" 
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex gap-4 xl:gap-8 items-center">
          <Link to="/home" className={getNavLinkClass('/')}>Home</Link>
          <Link to="/join-choir" className={getNavLinkClass('/join-choir')}>Join Choir</Link>
          {/* <Link to="/tickets" className={getNavLinkClass('/tickets')}>Tickets</Link> */}
          <Link to="/partnership" className={getNavLinkClass('/partnership')}>Donate</Link>
          <Link to="/volunteer" className={getNavLinkClass('/volunteer')}>Volunteer</Link>
          {/* <Link to="/programme" className={getNavLinkClass('/programme')}>Programme</Link> */}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex gap-3 items-center flex-shrink-0">
          {/* <Link 
            to="/tickets" 
            className="bg-white text-gray-900 border border-gray-300 py-2 px-3 lg:px-4 rounded-lg font-normal text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <img src="/assets/Ticket.png" alt="Ticket" className="w-4 h-4" />
            <span className="hidden lg:inline">Get Tickets</span>
            <span className="lg:hidden">Tickets</span>
          </Link> */}
          <Link
            to="https://1000t-admin-69g6o09a2-1000t-admin.vercel.app"
            className="bg-blue-950 text-white py-2 px-3 lg:px-4 rounded-lg font-normal text-sm hover:bg-blue-900 transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors touch-target"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <img src="/assets/1000 tonguessss 1.png" alt="1000 Tongues" className="h-6" />
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <Link to="/home" className={getMobileNavLinkClass('/home')} onClick={closeMobileMenu}>Home</Link>
            <Link to="/join-choir" className={getMobileNavLinkClass('/join-choir')} onClick={closeMobileMenu}>Join Choir</Link>
            {/* <Link to="/tickets" className={getMobileNavLinkClass('/tickets')} onClick={closeMobileMenu}>Tickets</Link> */}
            <Link to="/partnership" className={getMobileNavLinkClass('/partnership')} onClick={closeMobileMenu}>Donate</Link>
            <Link to="/volunteer" className={getMobileNavLinkClass('/volunteer')} onClick={closeMobileMenu}>Volunteer</Link>
            {/* <Link to="/programme" className={getMobileNavLinkClass('/programme')} onClick={closeMobileMenu}>Programme</Link> */}
          </nav>

          {/* Mobile Action Buttons */}
          <div className="p-4 border-t border-gray-100 space-y-3">
            {/* <Link 
              to="/tickets"
              onClick={closeMobileMenu}
              className="w-full bg-white text-gray-900 border border-gray-300 py-3 px-4 rounded-lg font-normal text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <img src="/assets/Ticket.png" alt="Ticket" className="w-4 h-4" />
              Get Tickets
            </Link> */}
            <Link
              to="https://1000t-admin-69g6o09a2-1000t-admin.vercel.app"
              onClick={closeMobileMenu}
              className="w-full bg-blue-950 text-white py-3 px-4 rounded-lg font-normal text-sm hover:bg-blue-900 transition-colors text-center block"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
