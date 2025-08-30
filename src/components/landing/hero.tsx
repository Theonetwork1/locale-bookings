import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, CreditCard, Bell } from "lucide-react";
import bizliLogo from "@/assets/bizli-logo.png";
import heroBackground from "@/assets/hero-background.png";

export function Hero() {
  return (
    <div className="relative min-h-screen bg-[var(--gradient-hero)] overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <img 
                src={bizliLogo} 
                alt="Bizli Solution" 
                className="h-24 w-auto object-contain"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Streamline Your Local Business with
              <span className="block bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
                Bizli Solution
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              The complete business management platform for restaurants, salons, hotels, and service providers. 
              Manage bookings, customers, and payments all in one place.
            </p>
            
            {/* CTA Button with Animation */}
            <div className="flex justify-center lg:justify-start mb-6">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Pricing */}
            <div className="mb-12 text-white">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center text-lg font-medium">
                <span className="text-white/90">$57.97/mo</span>
                <span className="hidden sm:block text-white/50">•</span>
                <span className="text-white/90">$665.64/year</span>
              </div>
            </div>
            
            {/* Feature Icons */}
            <div className="grid grid-cols-2 gap-8 max-w-md">
              <div className="flex flex-col items-center lg:items-start text-white/80">
                <Calendar className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Smart Booking</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-white/80">
                <Users className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Customer Management</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-white/80">
                <CreditCard className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Payment Processing</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-white/80">
                <Bell className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Smart Notifications</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src={heroBackground} 
              alt="Bizli Solution Dashboard" 
              className="max-w-full h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
}