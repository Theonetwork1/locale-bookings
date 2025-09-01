import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Pricing() {
  const { t } = useLanguage();
  
  const plans = [
    {
      name: t.freeTrial,
      price: "$0",
      period: "14 days",
      description: t.freeTrialDesc,
      features: [
        t.fullPlatformAccess,
        t.upTo20Bookings,
        t.basicCustomerMgmt,
        t.emailNotifications,
        t.standardSupport
      ],
      cta: t.startFreeTrial,
      popular: false
    },
    {
      name: t.monthlyPlan,
      price: "$57.97",
      period: "per month",
      description: t.monthlyPlanDesc,
      features: [
        t.unlimitedBookings,
        t.advancedCustomerMgmt,
        t.smsEmailNotifications,
        t.paymentProcessing,
        t.customBranding,
        t.analyticsDashboard,
        t.prioritySupport
      ],
      cta: t.getStarted,
      popular: true
    },
    {
      name: t.yearlyPlan,
      price: "$665.64",
      period: "per year",
      description: t.yearlyPlanDesc,
      features: [
        t.allFeaturesMonthly,
        t.advancedIntegrations,
        t.dedicatedAccountManager,
        t.customFeatures,
        t.phoneSupport247
      ],
      cta: t.bestValue,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t.pricingTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.pricingSubtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {t.mostPopular}
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full hover:scale-105 transition-transform duration-300" 
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => {
                    if (plan.name === t.freeTrial) {
                      window.location.href = '/dashboard';
                    } else {
                      window.location.href = '#contact';
                    }
                  }}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {t.pricingFooter}
          </p>
        </div>
      </div>
    </section>
  );
}