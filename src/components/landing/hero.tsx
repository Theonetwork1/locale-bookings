import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, CreditCard, Bell, Smartphone, Star, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(76, 42, 173, 0.7), rgba(15, 15, 31, 0.8)), url(/lovable-uploads/179bca6d-8bcc-4237-811b-4ad291f95a59.png)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center lg:items-center items-start pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-left lg:text-left text-center space-y-8 z-10 relative">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium animate-fade-in">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Let's learn & grow together
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
              <span className="lg:hidden">Book services, chat with your provider, and pay—all in one place.</span>
              <span className="hidden lg:block">Simplify How You Manage Your Local Business</span>
            </h1>
            
            {/* Subtitle - Only visible on desktop */}
            <p className="text-lg text-white/80 max-w-md mx-auto lg:mx-0 animate-fade-in hidden lg:block">
              Appointments, messaging, payments — everything your business needs, in one single app.
            </p>
            
            {/* CTA Button */}
            <div className="animate-fade-in">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="group bg-[#4B2AAD] hover:bg-[#A68BFA] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl active:shadow-lg"
              >
                Start Using Bizli Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Pricing - Hidden on mobile */}
            <div className="text-white animate-fade-in hidden lg:block">
              <div className="flex flex-row gap-6 items-center text-lg font-medium">
                <span className="text-white">{t.monthlyPrice}</span>
                <span className="text-white/50">|</span>
                <span className="text-white">{t.yearlyPrice}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
}