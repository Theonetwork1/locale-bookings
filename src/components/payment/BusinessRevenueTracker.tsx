import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Users, 
  Eye,
  Download,
  Filter,
  BarChart3
} from 'lucide-react';
import { 
  ClientPayment, 
  Client, 
  Service, 
  Appointment, 
  getClientPaymentsByBusiness,
  getBusinessRevenueSummary
} from '@/lib/supabase';

interface BusinessRevenueTrackerProps {
  businessId: string;
}

export function BusinessRevenueTracker({ businessId }: BusinessRevenueTrackerProps) {
  const [payments, setPayments] = useState<(ClientPayment & { 
    clients: Client; 
    services: Service; 
    appointments: Appointment 
  })[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('30d');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    fetchPayments();
  }, [businessId, timeFilter, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getClientPaymentsByBusiness(businessId);
      
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
      
      // Status filter
      if (statusFilter !== 'all') {
        filteredData = filteredData.filter(payment => 
          payment.payment_status === statusFilter
        );
      }
      
      setPayments(filteredData);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRevenueStats = () => {
    const completedPayments = payments.filter(p => p.payment_status === 'completed');
    const pendingPayments = payments.filter(p => p.payment_status === 'pending');
    
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const pendingRevenue = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
    const averageTransaction = completedPayments.length > 0 ? totalRevenue / completedPayments.length : 0;
    
    return {
      totalRevenue,
      pendingRevenue,
      completedCount: completedPayments.length,
      pendingCount: pendingPayments.length,
      averageTransaction
    };
  };

  const getMonthlyData = () => {
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
      .slice(-6); // Last 6 months
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

  const stats = getRevenueStats();
  const monthlyData = getMonthlyData();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-muted-foreground">Loading revenue data...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F97316]/5 to-[#F97316]/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
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
                <p className="text-sm font-medium text-muted-foreground mb-1">Completed Payments</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-warning/5 to-warning/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending Revenue</p>
                <p className="text-2xl font-bold text-foreground">${stats.pendingRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Transaction</p>
                <p className="text-2xl font-bold text-foreground">${stats.averageTransaction.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-foreground flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-[#F97316]" />
            Monthly Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map(([month, revenue]) => {
              const maxRevenue = Math.max(...monthlyData.map(([, r]) => r));
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

      {/* Filters and Payment List */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-bold text-foreground">Payment Transactions</CardTitle>
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
              
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No payments found</h3>
              <p className="text-muted-foreground">Payments from clients will appear here</p>
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
                      <h4 className="font-semibold text-foreground">{payment.clients?.name || 'Unknown Client'}</h4>
                      <p className="text-sm text-muted-foreground">{payment.services?.name}</p>
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
                    
                    <Badge 
                      variant={payment.payment_status === 'completed' ? 'default' : payment.payment_status === 'pending' ? 'secondary' : 'destructive'}
                    >
                      {payment.payment_status}
                    </Badge>
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
