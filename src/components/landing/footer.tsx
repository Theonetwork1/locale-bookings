import bizliLogo from "@/assets/bizli-logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0F0F1F] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left side - Logo and Contact */}
          <div className="flex flex-col mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <img 
                src={bizliLogo} 
                alt="Bizli Solution" 
                className="h-10 w-auto object-contain mr-3 bg-transparent"
              />
              <span className="text-white text-lg font-semibold">Bizli Solution</span>
            </div>
            
            {/* Contact Information */}
            <div className="text-white/80 text-sm space-y-1">
              <div>Phone: +1 774 506 9615</div>
              <div>Email: contact@bizlisolution.com</div>
            </div>
          </div>
          
          {/* Right side - Links */}
          <div className="flex space-x-6">
            <a 
              href="#privacy" 
              className="text-white hover:text-[#7C5FFF] transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-[#7C5FFF] transition-colors duration-300 text-sm"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">
            © {currentYear} Bizli Solution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}