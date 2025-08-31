import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, CreditCard, Bell } from "lucide-react";
import bizliLogo from "@/assets/bizli-logo.png";
import heroBackground from "@/assets/hero-background.png";

export function Hero() {
  return (
    <div className="relative min-h-screen bg-[var(--gradient-hero)] overflow-hidden flex items-center justify-center">
      {/* Content - Centered Layout */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <div className="bg-[#FF6B6B] p-4 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16">
              <div className="text-white font-bold text-2xl">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-1.5 bg-white rounded mb-1"></div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded"></div>
                    <div className="w-4 h-2 bg-white rounded-tr-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Bizli Solution
        </h1>
        
        {/* CTA Button with Animation */}
        <div className="flex justify-center mb-8">
          <Button 
            size="lg" 
            className="text-xl px-12 py-6 bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white shadow-2xl hover:shadow-3xl transition-all duration-300 animate-fade-in hover:scale-105 rounded-xl"
          >
            Start Free Trial
          </Button>
        </div>
        
        {/* Pricing */}
        <div className="text-white">
          <div className="flex flex-row gap-8 justify-center items-center text-2xl font-medium">
            <span className="text-white">$57.97/mo</span>
            <span className="text-white/50">|</span>
            <span className="text-white">$665.64/year</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
}