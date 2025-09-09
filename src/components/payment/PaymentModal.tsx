import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, DollarSign, Clock, MapPin, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Business, Service, ClientPayment, createClientPayment } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  business: Business;
  service: Service;
  clientId: string;
  appointmentId?: string;
  onPaymentSuccess?: (payment: ClientPayment) => void;
}

export function PaymentModal({
  open,
  onOpenChange,
  business,
  service,
  clientId,
  appointmentId,
  onPaymentSuccess
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'in_person'>('online');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handlePayment = async () => {
    if (paymentMethod === 'online') {
      await handleOnlinePayment();
    } else {
      await handleInPersonPayment();
    }
  };

  const handleOnlinePayment = async () => {
    setLoading(true);
    setPaymentStatus('processing');

    try {
      // If business has a client payment URL, redirect to it
      if (business.client_payment_url) {
        // Create pending payment record
        const payment = await createClientPayment({
          client_id: clientId,
          business_id: business.id,
          service_id: service.id,
          appointment_id: appointmentId,
          amount: service.price,
          currency: 'USD',
          payment_method: 'stripe',
          payment_status: 'pending',
          notes: notes || undefined
        });

        // Redirect to business's Stripe payment page
        const paymentUrl = new URL(business.client_payment_url);
        paymentUrl.searchParams.set('amount', (service.price * 100).toString()); // Stripe expects cents
        paymentUrl.searchParams.set('description', `${service.name} - ${business.name}`);
        paymentUrl.searchParams.set('client_reference_id', payment.id);
        
        window.open(paymentUrl.toString(), '_blank');
        
        setPaymentStatus('success');
        toast({
          title: 'Payment Initiated',
          description: 'You have been redirected to the secure payment page.'
        });

        onPaymentSuccess?.(payment);
        onOpenChange(false);
      } else {
        throw new Error('Business has not configured online payments');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      toast({
        title: 'Payment Failed',
        description: 'Unable to process online payment. Please try again or pay in person.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInPersonPayment = async () => {
    setLoading(true);
    setPaymentStatus('processing');

    try {
      // Create payment record for in-person payment
      const payment = await createClientPayment({
        client_id: clientId,
        business_id: business.id,
        service_id: service.id,
        appointment_id: appointmentId,
        amount: service.price,
        currency: 'USD',
        payment_method: 'in_person',
        payment_status: 'pending',
        notes: notes || undefined
      });

      setPaymentStatus('success');
      toast({
        title: 'Payment Scheduled',
        description: 'Payment will be collected in person at your appointment.'
      });

      onPaymentSuccess?.(payment);
      onOpenChange(false);
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      toast({
        title: 'Error',
        description: 'Unable to schedule payment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setPaymentMethod('online');
    setPaymentStatus('idle');
    setNotes('');
    setLoading(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetModal();
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center">
            <CreditCard className="w-6 h-6 mr-3 text-[#F97316]" />
            Payment Options
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Summary */}
          <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">Service Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration_minutes} min
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {business.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#F97316]">${service.price}</div>
                  <div className="text-sm text-muted-foreground">USD</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">Choose Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Online Payment Option */}
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === 'online'
                      ? 'border-[#F97316] bg-[#F97316]/5'
                      : 'border-border hover:border-[#F97316]/50'
                  } ${!service.online_payment_enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => service.online_payment_enabled && setPaymentMethod('online')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-[#F97316]" />
                      <span className="font-medium text-foreground">Pay Online</span>
                    </div>
                    {paymentMethod === 'online' && (
                      <CheckCircle className="w-5 h-5 text-[#F97316]" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {service.online_payment_enabled
                      ? 'Secure payment via business\'s payment system'
                      : 'Online payment not available for this service'
                    }
                  </p>
                  {business.client_payment_url && (
                    <Badge variant="secondary" className="mt-2">
                      Stripe Enabled
                    </Badge>
                  )}
                </div>

                {/* In-Person Payment Option */}
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === 'in_person'
                      ? 'border-[#F97316] bg-[#F97316]/5'
                      : 'border-border hover:border-[#F97316]/50'
                  }`}
                  onClick={() => setPaymentMethod('in_person')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-[#F97316]" />
                      <span className="font-medium text-foreground">Pay In Person</span>
                    </div>
                    {paymentMethod === 'in_person' && (
                      <CheckCircle className="w-5 h-5 text-[#F97316]" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pay at your appointment with cash or card
                  </p>
                </div>
              </div>

              {/* Payment Notes */}
              <div className="space-y-2">
                <Label htmlFor="payment-notes">Notes (Optional)</Label>
                <Textarea
                  id="payment-notes"
                  placeholder="Any special instructions or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium text-foreground">{business.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{business.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{business.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{business.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status Messages */}
          {paymentStatus === 'processing' && (
            <Card className="border-[#F97316] bg-[#F97316]/5">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin mr-3"></div>
                  <span className="font-medium text-foreground">Processing payment...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentStatus === 'error' && (
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-destructive mr-3" />
                  <span className="font-medium text-destructive">Payment failed. Please try again.</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 hover:bg-muted transition-colors"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading || paymentStatus === 'processing'}
              className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-200 hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : paymentMethod === 'online' ? (
                'Pay Online Now'
              ) : (
                'Schedule In-Person Payment'
              )}
            </Button>
          </div>

          {/* Payment Security Notice */}
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="w-4 h-4 mr-1 text-success" />
              <span className="font-medium">Secure Payment</span>
            </div>
            <p>
              {paymentMethod === 'online'
                ? 'Your payment is processed securely through the business\'s payment system.'
                : 'Your appointment is confirmed. Payment will be collected safely in person.'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
