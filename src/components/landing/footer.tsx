import bizliLogo from "@/assets/bizli-logo.png";

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={bizliLogo} 
              alt="Bizli Solution" 
              className="h-8 w-auto object-contain mr-3"
            />
            <span className="text-white text-lg font-semibold">Bizli Solution</span>
          </div>
          
          {/* Right side - Links */}
          <div className="flex space-x-6">
            <a 
              href="#privacy" 
              className="text-white hover:text-[#7C5FFF] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-[#7C5FFF] transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">
            © 2024 Bizli Solution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}