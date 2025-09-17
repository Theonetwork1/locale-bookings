import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-gray-900">
              <FileText className="w-6 h-6 text-blue-600" />
              Terms of Service
            </CardTitle>
            <p className="text-gray-600">
              Effective Date: [Insert Date]
            </p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                Welcome to Bizli Solution LLC. These Terms of Service ("Terms") govern your access and use of our web-based platform ("Bizli" or "the Service"), which allows businesses to manage bookings, online payments, and client interactions. By creating an account or using our platform, you agree to these Terms.
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-2">1. Eligibility</h3>
                <p>You must be at least 18 years old or of legal age in your country to use Bizli.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Account Responsibility</h3>
                <p>You are responsible for all activity under your account. You agree to provide accurate business and contact information and to keep it up to date.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Subscription & Payments</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Bizli operates on a monthly or annual subscription model.</li>
                  <li>Businesses may also collect client payments via Stripe links embedded in their profiles.</li>
                  <li>Bizli does not store or process payment information directly.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Service Usage</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You may not use Bizli for illegal or abusive purposes.</li>
                  <li>We reserve the right to suspend any business profile that violates these Terms or posts misleading information.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">5. Intellectual Property</h3>
                <p>All content, branding, and platform code are the property of Bizli Solution LLC. You may not copy or redistribute platform elements without permission.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">6. Limitation of Liability</h3>
                <p>Bizli Solution LLC is not responsible for business-client disputes, third-party payment issues, or damages resulting from misuse of the platform.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">7. Modifications</h3>
                <p>Bizli may update these Terms. Users will be notified of material changes.</p>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium">
                  For questions, contact us at{" "}
                  <a href="mailto:support@bizlisolution.com" className="text-primary hover:underline">
                    support@bizlisolution.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
