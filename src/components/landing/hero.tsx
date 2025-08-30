import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, CreditCard, Bell } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Streamline Your Local Business with
            <span className="block bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
              ServiceSync
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            The complete business management platform for restaurants, salons, hotels, and service providers. 
            Manage bookings, customers, and payments all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10">
              Watch Demo
            </Button>
          </div>
          
          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-white/80">
              <Calendar className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Smart Booking</span>
            </div>
            <div className="flex flex-col items-center text-white/80">
              <Users className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Customer Management</span>
            </div>
            <div className="flex flex-col items-center text-white/80">
              <CreditCard className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Payment Processing</span>
            </div>
            <div className="flex flex-col items-center text-white/80">
              <Bell className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Smart Notifications</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
}