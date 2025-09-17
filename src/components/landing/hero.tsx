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
        backgroundImage: `linear-gradient(rgba(76, 42, 173, 0.6), rgba(15, 15, 31, 0.7)), url(/lovable-uploads/179bca6d-8bcc-4237-811b-4ad291f95a59.png)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-left space-y-8 z-10 relative">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium animate-fade-in">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Let's learn & grow together
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
              Simplify How You Manage Your Local Business
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-white/80 max-w-md animate-fade-in">
              Appointments, messaging, payments — everything your business needs, in one single app.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="group bg-[#4B2AAD] hover:bg-[#A68BFA] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t.startFreeTrial}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="group bg-[#4B2AAD] hover:bg-[#A68BFA] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Start Using Bizli Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* PWA Installation Hint */}
            <div className="animate-fade-in">
              <p className="text-sm text-white/60 hover:text-white/80 transition-colors cursor-pointer">
                Want quick access? Add Bizli to your home screen.
              </p>
            </div>
            
            {/* Learn More Button */}
            <div className="animate-fade-in">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const element = document.getElementById('overview');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                {t.learnMore}
              </Button>
            </div>
            
            {/* Pricing */}
            <div className="text-white animate-fade-in">
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