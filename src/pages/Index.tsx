import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, profile, loading } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (!loading && user && profile) {
      switch (profile.role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'business':
          navigate('/business-dashboard');
          break;
        case 'client':
          navigate('/client-dashboard');
          break;
        default:
          break;
      }
    }
  }, [user, profile, loading, navigate]);

  return (
    <div className="min-h-screen">
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
            className="bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white hover:scale-105 transition-transform duration-300"
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
