import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Download, 
  Eye, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { ClientPayment, Business, Service, Appointment, getClientPaymentsByClient } from '@/lib/supabase';

interface PaymentHistoryProps {
  clientId: string;
}

export function PaymentHistory({ clientId }: PaymentHistoryProps) {
  const [payments, setPayments] = useState<(ClientPayment & { 
    businesses: Business; 
    services: Service; 
    appointments: Appointment 
  })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<ClientPayment | null>(null);

  useEffect(() => {
    fetchPayments();
  }, [clientId]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getClientPaymentsByClient(clientId);
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4 text-muted-foreground" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'refunded':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalSpent = () => {
    return payments
      .filter(p => p.payment_status === 'completed')
      .reduce((total, payment) => total + payment.amount, 0);
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-muted-foreground">Loading payment history...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground flex items-center">
            <CreditCard className="w-6 h-6 mr-3 text-[#F97316]" />
            Payment History
          </CardTitle>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Spent</div>
            <div className="text-xl font-bold text-[#F97316]">${getTotalSpent().toFixed(2)}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {payments.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No payments yet</h3>
            <p className="text-muted-foreground">Your payment history will appear here after making payments</p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{payment.services?.name || 'Service Payment'}</h4>
                    <p className="text-sm text-muted-foreground">{payment.businesses?.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(payment.created_at)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${payment.amount}</div>
                    <div className="text-sm text-muted-foreground capitalize">{payment.payment_method}</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusVariant(payment.payment_status)} className="flex items-center gap-1">
                      {getStatusIcon(payment.payment_status)}
                      {payment.payment_status}
                    </Badge>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPayment(payment)}
                          className="hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-foreground">Payment Details</DialogTitle>
                        </DialogHeader>
                        {selectedPayment && (
                          <div className="space-y-4">
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Service:</span>
                                  <span className="font-medium text-foreground">{selectedPayment.services?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Business:</span>
                                  <span className="font-medium text-foreground">{selectedPayment.businesses?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Amount:</span>
                                  <span className="font-medium text-foreground">${selectedPayment.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Payment Method:</span>
                                  <span className="font-medium text-foreground capitalize">{selectedPayment.payment_method}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <Badge variant={getStatusVariant(selectedPayment.payment_status)} className="flex items-center gap-1">
                                    {getStatusIcon(selectedPayment.payment_status)}
                                    {selectedPayment.payment_status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Date:</span>
                                  <span className="font-medium text-foreground">{formatDate(selectedPayment.created_at)}</span>
                                </div>
                                {selectedPayment.external_payment_id && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Reference:</span>
                                    <span className="font-mono text-xs text-foreground">{selectedPayment.external_payment_id}</span>
                                  </div>
                                )}
                                {selectedPayment.notes && (
                                  <div>
                                    <span className="text-muted-foreground">Notes:</span>
                                    <p className="font-medium text-foreground mt-1">{selectedPayment.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {selectedPayment.receipt_url && (
                              <Button 
                                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
                                onClick={() => window.open(selectedPayment.receipt_url, '_blank')}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download Receipt
                              </Button>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
