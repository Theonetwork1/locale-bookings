import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
              <Shield className="w-6 h-6 text-blue-600" />
              Privacy Policy
            </CardTitle>
            <p className="text-gray-600">
              Effective Date: [Insert Date]
            </p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                Bizli Solution LLC ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal and business data.
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-2">1. Data We Collect</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Business and user registration info (name, email, business name, phone)</li>
                  <li>Location data if enabled</li>
                  <li>Stripe payment link (if provided)</li>
                  <li>Usage data (login history, appointment activity)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. How We Use Data</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To operate the Bizli platform and provide services</li>
                  <li>To help customers find businesses based on categories and location</li>
                  <li>To send platform updates and support communication</li>
                  <li>To ensure business accounts comply with Bizli standards</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Third-Party Services</h3>
                <p>
                  We use third-party tools like Stripe for payment and Firebase/GitHub for hosting. These services may process limited user data under their own privacy terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
                <p>
                  We implement reasonable security measures to protect your data, including encryption and secure authentication.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
                <p>
                  You may request access, modification, or deletion of your data by contacting us.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">6. Data Retention</h3>
                <p>
                  We retain your data as long as your account is active or as required by law.
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium">
                  For more information, contact:{" "}
                  <a href="mailto:privacy@bizlisolution.com" className="text-primary hover:underline">
                    privacy@bizlisolution.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
