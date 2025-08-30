import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Pricing />
      
      {/* Quick Demo Access */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Experience the Platform
          </h3>
          <p className="text-muted-foreground mb-6">
            Take a look at our admin dashboard and see how Bizli Solution can transform your business operations.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/dashboard')}
            className="bg-[#7C5FFF] hover:bg-[#6B4FE0] text-white"
          >
            View Demo Dashboard
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
