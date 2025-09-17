import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const navItems = [
    { name: t.pricing, href: "#pricing" },
    { name: t.overview, href: "#overview" }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };
  return (
    <nav className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-accent p-2 rounded-lg">
                <span className="h-6 w-6 text-white font-bold text-lg flex items-center justify-center">BS</span>
              </div>
              <span className="text-xl font-bold text-white">Bizli Solution</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white hover:text-[#F97316] px-3 py-2 text-sm font-medium transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#F97316] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Language Switcher & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-medium rounded transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-[#F97316] text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 text-sm font-medium rounded transition-all duration-300 ${
                  language === 'fr' 
                    ? 'bg-[#F97316] text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:text-[#F97316] hover:bg-white/10 transition-colors duration-300"
              onClick={() => navigate('/auth')}
            >
              {t.signIn}
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate('/auth')}
              className="hover:scale-105 transition-transform duration-300"
            >
              {t.getStarted}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-white hover:text-[#F97316] block px-3 py-2 text-base font-medium transition-colors duration-300 w-full text-left"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-center mb-3">
                <div className="flex items-center bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-sm font-medium rounded transition-all duration-300 ${
                      language === 'en' 
                        ? 'bg-[#F97316] text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 text-sm font-medium rounded transition-all duration-300 ${
                      language === 'fr' 
                        ? 'bg-[#F97316] text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    FR
                  </button>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="w-full text-white hover:text-[#F97316] hover:bg-white/10 transition-colors duration-300"
                onClick={() => navigate('/auth')}
              >
                {t.signIn}
              </Button>
              <Button 
                variant="secondary" 
                className="w-full hover:scale-105 transition-transform duration-300"
                onClick={() => navigate('/auth')}
              >
                {t.getStarted}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}