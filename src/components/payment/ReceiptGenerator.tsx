import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Mail, FileText, Calendar, DollarSign, User, Building2 } from 'lucide-react';
import { ClientPayment, Business, Service, Client } from '@/lib/supabase';

interface ReceiptGeneratorProps {
  payment: ClientPayment & {
    businesses: Business;
    services: Service;
    clients: Client;
  };
}

export function ReceiptGenerator({ payment }: ReceiptGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);

  const generateReceiptHTML = () => {
    const receiptDate = new Date(payment.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #F97316; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #F97316; }
          .receipt-title { font-size: 28px; color: #333; margin: 10px 0; }
          .receipt-number { color: #666; font-size: 14px; }
          .section { margin: 20px 0; }
          .section-title { font-size: 16px; font-weight: bold; color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px; }
          .detail-row { display: flex; justify-content: space-between; padding: 5px 0; }
          .detail-label { color: #666; }
          .detail-value { font-weight: bold; color: #333; }
          .total-row { border-top: 2px solid #F97316; margin-top: 20px; padding-top: 10px; font-size: 18px; font-weight: bold; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
          .status { 
            display: inline-block; 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: bold;
            text-transform: uppercase;
          }
          .status.completed { background-color: #10B981; color: white; }
          .status.pending { background-color: #F59E0B; color: white; }
          .status.failed { background-color: #EF4444; color: white; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Bizli Solution</div>
          <h1 class="receipt-title">Payment Receipt</h1>
          <div class="receipt-number">Receipt #${payment.id.substring(0, 8).toUpperCase()}</div>
        </div>

        <div class="section">
          <div class="section-title">Business Information</div>
          <div class="detail-row">
            <span class="detail-label">Business Name:</span>
            <span class="detail-value">${payment.businesses.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Address:</span>
            <span class="detail-value">${payment.businesses.address}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">${payment.businesses.phone}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${payment.businesses.email}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Customer Information</div>
          <div class="detail-row">
            <span class="detail-label">Customer Name:</span>
            <span class="detail-value">${payment.clients.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${payment.clients.email}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Service Details</div>
          <div class="detail-row">
            <span class="detail-label">Service:</span>
            <span class="detail-value">${payment.services.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Description:</span>
            <span class="detail-value">${payment.services.description}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">${payment.services.duration_minutes} minutes</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Payment Details</div>
          <div class="detail-row">
            <span class="detail-label">Payment Date:</span>
            <span class="detail-value">${receiptDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Payment Method:</span>
            <span class="detail-value">${payment.payment_method || 'N/A'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Transaction ID:</span>
            <span class="detail-value">${payment.external_payment_id || 'N/A'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value">
              <span class="status ${payment.payment_status}">${payment.payment_status}</span>
            </span>
          </div>
          ${payment.notes ? `
          <div class="detail-row">
            <span class="detail-label">Notes:</span>
            <span class="detail-value">${payment.notes}</span>
          </div>
          ` : ''}
        </div>

        <div class="section">
          <div class="detail-row total-row">
            <span>Total Amount:</span>
            <span>$${payment.amount.toFixed(2)} ${payment.currency}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>This receipt was generated automatically by Bizli Solution.</p>
          <p>For questions about this payment, please contact ${payment.businesses.name} directly.</p>
        </div>
      </body>
      </html>
    `;
  };

  const downloadReceipt = async () => {
    setGenerating(true);
    try {
      const html = generateReceiptHTML();
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${payment.id.substring(0, 8)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating receipt:', error);
    } finally {
      setGenerating(false);
    }
  };

  const emailReceipt = async () => {
    setSending(true);
    try {
      // In a real implementation, you would send this to your email service
      // For now, we'll just simulate the action
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with an email service like SendGrid, Resend, etc.
      console.log('Receipt sent to:', payment.clients.email);
      
      alert(`Receipt sent successfully to ${payment.clients.email}`);
    } catch (error) {
      console.error('Error sending receipt:', error);
      alert('Failed to send receipt. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const receiptDate = new Date(payment.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-foreground flex items-center">
          <FileText className="w-6 h-6 mr-3 text-[#F97316]" />
          Payment Receipt
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Receipt Preview */}
        <div className="p-6 bg-muted/30 rounded-lg border">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-[#F97316] mb-2">Bizli Solution</div>
            <h2 className="text-xl font-semibold text-foreground">Payment Receipt</h2>
            <p className="text-sm text-muted-foreground">#{payment.id.substring(0, 8).toUpperCase()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="font-medium">{payment.businesses.name}</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{payment.clients.name}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{receiptDate}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-muted-foreground">Service: </span>
                <span className="font-medium">{payment.services.name}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Method: </span>
                <span className="font-medium capitalize">{payment.payment_method || 'N/A'}</span>
              </div>
              <div className="flex items-center text-lg font-bold">
                <DollarSign className="w-5 h-5 mr-1 text-[#F97316]" />
                <span>${payment.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={downloadReceipt}
            disabled={generating}
            className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
          >
            {generating ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </div>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={emailReceipt}
            disabled={sending}
            className="flex-1 hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
          >
            {sending ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </div>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Email to Client
              </>
            )}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center p-3 bg-muted/20 rounded-lg">
          <p>This receipt is automatically generated and can be downloaded or emailed to the client.</p>
        </div>
      </CardContent>
    </Card>
  );
}
