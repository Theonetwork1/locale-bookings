import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Users, 
  Eye,
  Download,
  Building2,
  CreditCard,
  BarChart3,
  PieChart
} from 'lucide-react';
import { 
  PlatformPayment, 
  Business, 
  Subscription, 
  getPlatformPayments
} from '@/lib/supabase';

export function AdminPaymentDashboard() {
  const [payments, setPayments] = useState<(PlatformPayment & { 
    businesses: Business; 
    subscriptions: Subscription 
  })[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('30d');
  const [planFilter, setPlanFilter] = useState<'all' | 'Pro' | 'Business' | 'Enterprise'>('all');
  const [selectedPayment, setSelectedPayment] = useState<PlatformPayment | null>(null);

  useEffect(() => {
    fetchPayments();
  }, [timeFilter, planFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getPlatformPayments();
      
      // Apply filters
      let filteredData = data;
      
      // Time filter
      if (timeFilter !== 'all') {
        const days = {
          '7d': 7,
          '30d': 30,
          '90d': 90,
          '1y': 365
        }[timeFilter];
        
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        filteredData = filteredData.filter(payment => 
          new Date(payment.created_at) >= cutoffDate
        );
      }
      
      // Plan filter
      if (planFilter !== 'all') {
        filteredData = filteredData.filter(payment => 
          payment.subscriptions?.plan === planFilter
        );
      }
      
      setPayments(filteredData);
    } catch (error) {
      console.error('Error fetching platform payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformStats = () => {
    const completedPayments = payments.filter(p => p.payment_status === 'completed');
    const pendingPayments = payments.filter(p => p.payment_status === 'pending');
    
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const monthlyRecurring = completedPayments
      .filter(p => {
        const date = new Date(p.created_at);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      })
      .reduce((sum, p) => sum + p.amount, 0);
    
    const uniqueBusinesses = new Set(completedPayments.map(p => p.business_id)).size;
    
    return {
      totalRevenue,
      monthlyRecurring,
      completedCount: completedPayments.length,
      pendingCount: pendingPayments.length,
      uniqueBusinesses
    };
  };

  const getPlanBreakdown = () => {
    const planCounts: { [key: string]: { count: number; revenue: number } } = {};
    
    payments
      .filter(p => p.payment_status === 'completed')
      .forEach(payment => {
        const plan = payment.subscriptions?.plan || 'Unknown';
        if (!planCounts[plan]) {
          planCounts[plan] = { count: 0, revenue: 0 };
        }
        planCounts[plan].count++;
        planCounts[plan].revenue += payment.amount;
      });
    
    return planCounts;
  };

  const getMonthlyGrowth = () => {
    const monthlyRevenue: { [key: string]: number } = {};
    
    payments
      .filter(p => p.payment_status === 'completed')
      .forEach(payment => {
        const date = new Date(payment.created_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + payment.amount;
      });
    
    return Object.entries(monthlyRevenue)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12); // Last 12 months
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

  const stats = getPlatformStats();
  const planBreakdown = getPlanBreakdown();
  const monthlyGrowth = getMonthlyGrowth();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-muted-foreground">Loading platform revenue data...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Platform Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F97316]/5 to-[#F97316]/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Platform Revenue</p>
                <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-[#F97316]/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#F97316]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Recurring Revenue</p>
                <p className="text-2xl font-bold text-foreground">${stats.monthlyRecurring.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Businesses</p>
                <p className="text-2xl font-bold text-foreground">{stats.uniqueBusinesses}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Subscriptions</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-[#F97316]" />
              Monthly Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyGrowth.slice(-6).map(([month, revenue]) => {
                const maxRevenue = Math.max(...monthlyGrowth.map(([, r]) => r));
                const percentage = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;
                
                return (
                  <div key={month} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium text-muted-foreground">
                      {new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-3 relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-20 text-sm font-semibold text-foreground text-right">
                      ${revenue.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground flex items-center">
              <PieChart className="w-6 h-6 mr-3 text-[#F97316]" />
              Subscription Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(planBreakdown).map(([plan, data]) => (
                <div key={plan} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      plan === 'Pro' ? 'bg-primary' :
                      plan === 'Business' ? 'bg-[#F97316]' :
                      plan === 'Enterprise' ? 'bg-secondary' : 'bg-muted-foreground'
                    }`}></div>
                    <span className="font-medium text-foreground">{plan}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{data.count} subs</div>
                    <div className="text-sm text-muted-foreground">${data.revenue.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Subscription Payments */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-bold text-foreground">Recent Subscription Payments</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={timeFilter} onValueChange={(value: any) => setTimeFilter(value)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={planFilter} onValueChange={(value: any) => setPlanFilter(value)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No subscription payments found</h3>
              <p className="text-muted-foreground">Business subscription payments will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.slice(0, 10).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{payment.businesses?.name || 'Unknown Business'}</h4>
                      <p className="text-sm text-muted-foreground">{payment.businesses?.email}</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(payment.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-foreground">${payment.amount}</div>
                      <Badge variant="secondary" className="text-xs">
                        {payment.subscriptions?.plan}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={payment.payment_status === 'completed' ? 'default' : payment.payment_status === 'pending' ? 'secondary' : 'destructive'}
                      >
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
                            <DialogTitle className="text-xl font-bold text-foreground">Subscription Payment Details</DialogTitle>
                          </DialogHeader>
                          {selectedPayment && (
                            <div className="space-y-4">
                              <div className="p-4 bg-muted/30 rounded-lg">
                                <div className="space-y-3 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Business:</span>
                                    <span className="font-medium text-foreground">{selectedPayment.businesses?.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Plan:</span>
                                    <span className="font-medium text-foreground">{selectedPayment.subscriptions?.plan}</span>
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
                                    <Badge variant={selectedPayment.payment_status === 'completed' ? 'default' : 'secondary'}>
                                      {selectedPayment.payment_status}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Date:</span>
                                    <span className="font-medium text-foreground">{formatDate(selectedPayment.created_at)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Billing Period:</span>
                                    <span className="font-medium text-foreground">
                                      {new Date(selectedPayment.billing_period_start).toLocaleDateString()} - {new Date(selectedPayment.billing_period_end).toLocaleDateString()}
                                    </span>
                                  </div>
                                  {selectedPayment.external_payment_id && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Reference:</span>
                                      <span className="font-mono text-xs text-foreground">{selectedPayment.external_payment_id}</span>
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
    </div>
  );
}
