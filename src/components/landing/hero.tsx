import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, CreditCard, Bell, Smartphone, Star, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

export function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();
=======

export function Hero() {
  const { t } = useLanguage();
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
  
  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(15, 15, 31, 0.7), rgba(15, 15, 31, 0.7)), url(/lovable-uploads/179bca6d-8bcc-4237-811b-4ad291f95a59.png)`
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
              {t.heroTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-white/80 max-w-md animate-fade-in">
              {t.heroSubtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button 
                size="lg" 
<<<<<<< HEAD
                onClick={() => navigate('/auth')}
                className="group bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
=======
                onClick={() => window.location.href = '/register'}
                className="group bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
              >
                {t.startFreeTrial}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
<<<<<<< HEAD
                onClick={() => {
                  const element = document.getElementById('overview');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
=======
                onClick={() => window.location.href = '#overview'}
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                {t.learnMore}
              </Button>
            </div>
            
            {/* App Store Buttons */}
            <div className="flex gap-4 animate-fade-in">
              <button className="group bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                <div className="text-2xl">📱</div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="group bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                <div className="text-2xl">▶️</div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
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