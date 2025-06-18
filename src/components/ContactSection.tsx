
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormSubmissions } from '@/hooks/useFormSubmissions';

interface FormData {
  name: string;
  surname: string;
  phone: string;
  email: string;
  businessUrl: string;
  contactMethod: 'email' | 'whatsapp';
  message: string;
}

const ContactSection = () => {
  const { toast } = useToast();
  const { addSubmission } = useFormSubmissions();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    phone: '',
    email: '',
    businessUrl: '',
    contactMethod: 'email',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Form submitted:', formData);
      
      // Save form submission
      addSubmission(formData);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Thank you for your inquiry!",
        description: "We'll get back to you within 24 hours to discuss your project.",
      });
      
      // Reset form
      setFormData({
        name: '',
        surname: '',
        phone: '',
        email: '',
        businessUrl: '',
        contactMethod: 'email',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-cream">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="animate-fade-in">
            <h2 className="heading-luxury text-5xl md:text-6xl text-charcoal mb-8">
              Let's Create
              <br />
              Something Amazing
            </h2>
            <div className="w-24 h-1 bg-charcoal mb-8"></div>
            <p className="text-luxury text-lg text-charcoal/80 mb-8 leading-relaxed">
              Ready to elevate your brand with a website that converts? Tell us about your project and let's bring your vision to life.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="heading-luxury text-xl text-charcoal mb-2">What to Expect</h3>
                <ul className="space-y-2 text-charcoal/70">
                  <li>• Free consultation and project assessment</li>
                  <li>• Custom proposal within 48 hours</li>
                  <li>• Transparent pricing and timeline</li>
                  <li>• Dedicated project management</li>
                </ul>
              </div>
              
              <div>
                <h3 className="heading-luxury text-xl text-charcoal mb-2">Get in Touch</h3>
                <p className="text-charcoal/70 mb-2">hello@syntaxstudio.com</p>
                <p className="text-charcoal/70">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <form onSubmit={handleSubmit} className="bg-charcoal/5 p-8 lg:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-charcoal mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="businessUrl" className="block text-sm font-medium text-charcoal mb-2">
                  Current Website (Optional)
                </label>
                <input
                  type="url"
                  id="businessUrl"
                  name="businessUrl"
                  value={formData.businessUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label htmlFor="contactMethod" className="block text-sm font-medium text-charcoal mb-2">
                  Preferred Contact Method *
                </label>
                <select
                  id="contactMethod"
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-charcoal transition-colors resize-vertical"
                  placeholder="Describe your project, goals, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Book Your Website'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
