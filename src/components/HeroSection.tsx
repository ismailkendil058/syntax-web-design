
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="container-luxury">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="heading-luxury text-6xl md:text-8xl lg:text-9xl text-charcoal mb-8 leading-none">
              Syntax
              <br />
              Studio
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="text-luxury text-xl md:text-2xl text-charcoal/80 mb-12 max-w-2xl mx-auto">
              Tailored Websites for Ambitious Brands
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={scrollToContact}
                className="btn-luxury text-lg px-12 py-5"
              >
                Book Your Website
              </button>
              <button 
                onClick={scrollToAbout}
                className="btn-luxury-outline text-lg px-12 py-5"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout} className="text-charcoal/60 hover:text-charcoal transition-colors">
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
