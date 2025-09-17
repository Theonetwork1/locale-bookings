import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LegalDocuments = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Legal Documents
          </h1>
          <p className="text-gray-600">
            Access our Terms of Service and Privacy Policy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border" onClick={() => navigate('/terms-of-service')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <FileText className="w-6 h-6 text-blue-600" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Read our terms and conditions for using the Bizli platform.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Terms of Service
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border" onClick={() => navigate('/privacy-policy')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Shield className="w-6 h-6 text-blue-600" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Learn how we collect, use, and protect your data.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Privacy Policy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LegalDocuments;
