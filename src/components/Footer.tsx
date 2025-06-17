
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream py-16">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="heading-luxury text-2xl mb-6">Syntax Studio</h3>
            <p className="text-cream/70 leading-relaxed mb-6">
              Crafting premium websites for ambitious brands. Your vision, our expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                Twitter
              </a>
              <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="heading-luxury text-lg mb-6">Services</h4>
            <ul className="space-y-3 text-cream/70">
              <li><a href="#" className="hover:text-cream transition-colors">Web Design</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">E-commerce</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Maintenance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="heading-luxury text-lg mb-6">Contact</h4>
            <div className="space-y-3 text-cream/70">
              <p>hello@syntaxstudio.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Available Monday - Friday<br />9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream/20 pt-8 text-center">
          <p className="text-cream/60">
            © {currentYear} Syntax Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
