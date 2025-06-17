
import { useState } from 'react';
import { ArrowLeft, Eye, Mail, Phone, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormSubmission {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  businessUrl: string;
  contactMethod: 'email' | 'whatsapp';
  message: string;
  submittedAt: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([
    {
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      businessUrl: 'https://johndoe.com',
      contactMethod: 'email',
      message: 'Looking for a professional website for my consulting business.',
      submittedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      businessUrl: '',
      contactMethod: 'whatsapp',
      message: 'Need an e-commerce website for my boutique.',
      submittedAt: '2024-01-14T14:22:00Z'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0000') {
      setIsAuthenticated(true);
      toast({
        title: "Welcome to Admin Dashboard",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="heading-luxury text-3xl text-charcoal mb-2">
              Admin Access
            </h2>
            <p className="text-charcoal/70">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-cream border-2 border-charcoal/20 text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              className="btn-luxury w-full text-lg py-4"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleBackToHome}
            className="btn-luxury-outline w-full text-lg py-4 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-luxury py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-luxury text-4xl text-charcoal">
            Admin Dashboard
          </h1>
          <button
            onClick={handleBackToHome}
            className="btn-luxury-outline flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>

        <div className="bg-charcoal/5 p-8 space-y-8">
          <div>
            <h2 className="heading-luxury text-2xl text-charcoal mb-6">
              Form Submissions ({submissions.length})
            </h2>
            
            {submissions.length === 0 ? (
              <p className="text-charcoal/70 text-center py-12">
                No form submissions yet.
              </p>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-cream p-6 border border-charcoal/20 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="heading-luxury text-lg text-charcoal">
                          {submission.name} {submission.surname}
                        </h3>
                        <p className="text-sm text-charcoal/60">
                          Submitted on {formatDate(submission.submittedAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-xs font-medium ${
                          submission.contactMethod === 'email' 
                            ? 'bg-charcoal text-cream' 
                            : 'bg-charcoal/20 text-charcoal'
                        }`}>
                          {submission.contactMethod === 'email' ? 'Email' : 'WhatsApp'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-charcoal/60" />
                        <span className="text-charcoal">{submission.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-charcoal/60" />
                        <span className="text-charcoal">{submission.phone}</span>
                      </div>
                      {submission.businessUrl && (
                        <div className="flex items-center space-x-2 md:col-span-2">
                          <Globe className="w-4 h-4 text-charcoal/60" />
                          <a 
                            href={submission.businessUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-charcoal hover:text-charcoal/70 underline"
                          >
                            {submission.businessUrl}
                          </a>
                        </div>
                      )}
                    </div>

                    {submission.message && (
                      <div>
                        <h4 className="text-sm font-medium text-charcoal mb-2">Message:</h4>
                        <p className="text-charcoal/70 text-sm bg-charcoal/5 p-3">
                          {submission.message}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
```

Now I'll update the App.tsx to include the Admin route:

<lov-write file_path="src/App.tsx">
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

Finally, I'll update the Navigation component to make the admin icon clickable and navigate to the admin page:

<lov-write file_path="src/components/Navigation.tsx">
import { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';

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

  const goToAdmin = () => {
    window.location.href = '/admin';
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

          {/* Admin Icon & Mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Admin Icon */}
            <button
              onClick={goToAdmin}
              className="text-charcoal hover:text-charcoal/70 p-2 transition-colors duration-200"
              title="Admin Access"
            >
              <Settings className="w-5 h-5" />
            </button>

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
            <button
              onClick={goToAdmin}
              className="text-charcoal hover:text-charcoal/70 flex items-center px-3 py-2 text-base font-medium w-full text-left"
              title="Admin Access"
            >
              <Settings className="w-5 h-5 mr-2" />
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
```
