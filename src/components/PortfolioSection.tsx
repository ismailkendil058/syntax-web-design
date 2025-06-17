
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
  liveUrl: string;
}

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'E-commerce', 'Portfolio', 'Corporate', 'Blog'];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Luxury Fashion Store',
      category: 'E-commerce',
      description: 'A sophisticated e-commerce platform for a high-end fashion boutique',
      image: '/placeholder.svg',
      features: ['Custom Product Configurator', 'Advanced Filtering', 'Payment Integration', 'Inventory Management'],
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '#'
    },
    {
      id: 2,
      title: 'Creative Agency Portfolio',
      category: 'Portfolio',
      description: 'Minimalist portfolio showcasing creative work and services',
      image: '/placeholder.svg',
      features: ['Interactive Gallery', 'Case Study Pages', 'Contact Forms', 'Blog Integration'],
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Contentful'],
      liveUrl: '#'
    },
    {
      id: 3,
      title: 'Tech Startup Landing',
      category: 'Corporate',
      description: 'Modern landing page for an innovative tech startup',
      image: '/placeholder.svg',
      features: ['Animated Sections', 'Lead Generation', 'Team Showcase', 'Investor Relations'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      liveUrl: '#'
    },
    {
      id: 4,
      title: 'Culinary Blog Platform',
      category: 'Blog',
      description: 'Food blog with recipe management and social features',
      image: '/placeholder.svg',
      features: ['Recipe Calculator', 'Social Sharing', 'Newsletter Integration', 'Comment System'],
      technologies: ['WordPress', 'Custom PHP', 'MySQL', 'Mailchimp'],
      liveUrl: '#'
    }
  ];

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-32 bg-charcoal/5">
      <div className="container-luxury">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-luxury text-5xl md:text-6xl text-charcoal mb-6">
            Selected Works
          </h2>
          <p className="text-luxury text-xl text-charcoal/70 max-w-2xl mx-auto">
            Discover our latest projects and see how we bring ambitious brands to life
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 border ${
                activeCategory === category
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-transparent text-charcoal border-charcoal/20 hover:border-charcoal'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              onClick={() => setSelectedProject(item)}
            >
              <div className="bg-cream border border-charcoal/10 overflow-hidden transition-all duration-300 group-hover:border-charcoal/30">
                <div className="aspect-video bg-charcoal/10 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-8 h-8 text-cream" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-sm text-charcoal/60 mb-2">{item.category}</div>
                  <h3 className="heading-luxury text-2xl text-charcoal mb-3">{item.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-cream max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-sm text-charcoal/60 mb-2">{selectedProject.category}</div>
                    <h3 className="heading-luxury text-3xl text-charcoal">{selectedProject.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-charcoal/60 hover:text-charcoal text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="aspect-video bg-charcoal/10 mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="heading-luxury text-xl text-charcoal mb-4">Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-charcoal/70">• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="heading-luxury text-xl text-charcoal mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-charcoal/10 text-charcoal text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={selectedProject.liveUrl}
                    className="btn-luxury text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Demo
                  </a>
                  <button
                    onClick={scrollToContact}
                    className="btn-luxury-outline text-center"
                  >
                    Book Similar Website
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
