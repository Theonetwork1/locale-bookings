import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft, Zap, Building2, Crown, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const BusinessSubscriptionSetup = () => {
  const [selectedPlan, setSelectedPlan] = useState<'Free Trial' | 'Monthly Plan' | 'Yearly Plan' | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      period: '/14 days',
      description: 'Perfect to get started',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      features: [
        'Full platform access',
        'Up to 20 bookings',
        'Basic customer management',
        'Email notifications',
        'Standard support'
      ],
      popular: false
    },
    {
      name: 'Monthly Plan',
      price: '$57.97',
      period: '/per month',
      description: 'Ideal for service providers of all sizes',
      icon: Building2,
      color: 'text-[#F97316]',
      bgColor: 'bg-[#F97316]/10',
      borderColor: 'border-[#F97316]/20',
      features: [
        'Unlimited bookings',
        'Advanced customer management',
        'SMS & Email notifications',
        'Payment processing',
        'Custom branding',
        'Analytics dashboard',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Yearly Plan',
      price: '$665.64',
      period: '/per year',
      description: 'Best value - 1 month free included',
      icon: Crown,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      features: [
        'All features in Monthly',
        'Advanced integrations',
        'Dedicated account manager',
        'Custom features',
        '24/7 phone support',
        '1 month free included'
      ],
      popular: false
    }
  ];

  const handlePlanSelect = (planName: 'Free Trial' | 'Monthly Plan' | 'Yearly Plan') => {
    setSelectedPlan(planName);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast({
        title: 'Plan Required',
        description: 'Please select a subscription plan to continue.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      // Here you would integrate with your Stripe checkout or existing subscription system
      // For now, we'll simulate the process
      
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Subscription Activated!',
        description: `Welcome to Bizli Solution ${selectedPlan} plan. Your business account is ready.`
      });

      // Redirect to business dashboard
      navigate('/business-dashboard');
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Subscription Failed',
        description: 'Unable to process subscription. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkipForNow = () => {
    toast({
      title: 'Trial Started',
      description: 'You can start with a free trial and upgrade later.'
    });
    navigate('/business-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/register')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration
          </Button>
          <div className="text-white text-sm">
            Welcome, {user?.name}!
          </div>
        </div>

        <div className="text-center text-white mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-[#F97316]" />
            Almost there! Choose your business plan
          </div>
          <h1 className="text-4xl font-bold mb-4">Select Your Business Plan</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose the perfect plan to manage your business, accept bookings, and grow your revenue
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan === plan.name;
            
            return (
              <Card
                key={plan.name}
                className={`relative cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  isSelected 
                    ? 'border-[#F97316] bg-[#F97316]/5 shadow-2xl' 
                    : plan.popular 
                    ? 'border-[#F97316]/50 shadow-xl' 
                    : 'border-white/20 hover:border-white/40'
                } ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                onClick={() => handlePlanSelect(plan.name as 'Free Trial' | 'Monthly Plan' | 'Yearly Plan')}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#F97316] text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isSelected && (
                    <div className="text-center">
                      <div className="w-6 h-6 bg-[#F97316] rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm text-[#F97316] font-medium mt-2">Selected</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button
            onClick={handleSubscribe}
            disabled={!selectedPlan || loading}
            className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-8 py-3 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Setting up...
              </div>
            ) : (
              `Subscribe to ${selectedPlan || 'Selected Plan'}`
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleSkipForNow}
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-3"
          >
            Start Free Trial
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-white/60 text-sm mt-8 max-w-2xl mx-auto">
          <p className="mb-2">
            🔒 Secure payment processing • 📞 Cancel anytime • 💳 All plans include 14-day free trial
          </p>
          <p>
            Need help choosing?{' '}
            <button 
              onClick={() => {
                const phoneNumber = '7745069615';
                const message = encodeURIComponent('Hello! I need help choosing the right business plan for my company.');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              className="text-[#F97316] hover:underline cursor-pointer"
            >
              Contact our sales team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSubscriptionSetup;
