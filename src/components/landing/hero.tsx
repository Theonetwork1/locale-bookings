import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, CreditCard, Bell, Smartphone, Star, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  
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
                onClick={() => window.location.href = '#pricing'}
                className="group bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t.startFreeTrial}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '#overview'}
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
          
          {/* Right Content - Interactive Visual */}
          <div className="relative lg:block hidden">
            {/* Main Character Area */}
            <div className="relative">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
              
              {/* Central Figure Placeholder */}
              <div className="relative z-10 w-96 h-96 mx-auto bg-gradient-to-br from-emerald-300 via-blue-300 to-purple-300 rounded-3xl flex items-center justify-center">
                <div className="text-white text-6xl">👩‍💼</div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute top-12 -right-8 w-20 h-20 bg-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                <div className="text-2xl">💖</div>
              </div>
              
              <div className="absolute -bottom-4 left-8 w-14 h-14 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce">
                <Users className="w-7 h-7 text-white" />
              </div>
              
              <div className="absolute bottom-16 -right-6 w-12 h-12 bg-yellow-500/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute top-1/2 -left-8 w-10 h-10 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                <Zap className="w-5 h-5 text-white" />
              </div>
              
              {/* Dotted Path */}
              <div className="absolute bottom-0 right-1/4 w-32 h-16">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  <path 
                    d="M10,40 Q30,10 50,25 T90,15" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeDasharray="5,5" 
                    fill="none" 
                    opacity="0.5"
                  />
                </svg>
              </div>
              
              {/* Stats Circles */}
              <div className="absolute top-1/4 right-0 flex space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse delay-100"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse delay-200"></div>
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