import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { ArrowRight, Search, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  // Redirect authenticated users to their appropriate dashboard (disabled for testing)
  // useEffect(() => {
  //   if (!loading && user) {
  //     switch (user.role) {
  //       case 'admin':
  //         navigate('/dashboard');
  //         break;
  //       case 'business':
  //         navigate('/business-dashboard');
  //         break;
  //       case 'client':
  //         navigate('/client-dashboard');
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, [user, loading, navigate]);

  // Debug: Afficher le statut de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading Bizli Solution...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Pricing />
      
      {/* Quick Demo Access */}
      <section id="overview" className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {t.experiencePlatform}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t.experienceDesc}
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/client-dashboard')}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t.viewDemoDashboard}
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;