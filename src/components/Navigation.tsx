
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold text-charcoal tracking-tight">
              Syntax Studio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-charcoal hover:text-charcoal/70 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-charcoal hover:text-charcoal/70 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-charcoal hover:text-charcoal/70 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-luxury"
              >
                Book Your Website
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-cream p-2 inline-flex items-center justify-center text-charcoal hover:text-charcoal/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-charcoal"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-charcoal/10">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-cream">
            <button
              onClick={() => scrollToSection('home')}
              className="text-charcoal hover:text-charcoal/70 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-charcoal hover:text-charcoal/70 block px-3 py-2 text-base font-medium w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-charcoal hover:text-charcoal/70 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-luxury w-full mt-4"
            >
              Book Your Website
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
