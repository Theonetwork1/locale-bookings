import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "14 days",
      description: "Perfect to get started",
      features: [
        "Full platform access",
        "Up to 20 bookings",
        "Basic customer management",
        "Email notifications",
        "Standard support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Monthly Plan",
      price: "$57.97",
      period: "per month",
      description: "Ideal for service providers of all sizes",
      features: [
        "Unlimited bookings",
        "Advanced customer management",
        "SMS & Email notifications",
        "Payment processing",
        "Custom branding",
        "Analytics dashboard",
        "Priority support"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Yearly Plan",
      price: "$665.64",
      period: "per year",
      description: "Best value – 1 month free included",
      features: [
        "All features in Monthly",
        "Advanced integrations",
        "Dedicated account manager",
        "Custom features",
        "24/7 phone support"
      ],
      cta: "Best Value",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include our core features with no hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
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
                  className="w-full" 
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include 24/7 customer support and a 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}