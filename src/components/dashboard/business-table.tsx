import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  ExternalLink, 
  TrendingUp, 
  Eye, 
  Bell, 
  Pause, 
  RefreshCw, 
  FileText,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Tag,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Business {
  id: string;
  name: string;
  software: string;
  status: 'active' | 'pending' | 'suspended' | 'closed';
  lastSync: string;
  balance: number;
  cpa: number;
  ctr: number;
  epc: number;
  avatar: string;
  progress: number;
  email: string;
  phone: string;
  country: string;
  category: string;
  tags: string[];
  hasAlerts: boolean;
  alertType?: 'missing_info' | 'complaints' | 'suspicious_activity';
  responseTime: string;
  renewalDate: string;
  totalAppointments: number;
}

const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Salon Beautique",
    software: "Monthly",
    status: "active",
    lastSync: "2024-12-28 09:15h",
    balance: 57.97,
    cpa: 0,
    ctr: 0,
    epc: 0,
    avatar: "S",
    progress: 85,
    email: "salon@beautique.com",
    phone: "+1 555 0123",
    country: "Haiti",
    category: "Beauty Salon",
    tags: ["VIP", "Premium"],
    hasAlerts: false,
    responseTime: "1.2h",
    renewalDate: "2025-01-15",
    totalAppointments: 127
  },
  {
    id: "2", 
    name: "Restaurant Le Gourmet",
    software: "Annual",
    status: "active",
    lastSync: "2024-12-27 14:22h",
    balance: 665.64,
    cpa: 0,
    ctr: 0,
    epc: 0,
    avatar: "R",
    progress: 95,
    email: "contact@legourmet.com",
    phone: "+1 555 0456",
    country: "France",
    category: "Restaurant",
    tags: ["Premium"],
    hasAlerts: false,
    responseTime: "0.8h",
    renewalDate: "2025-06-15",
    totalAppointments: 89
  },
  {
    id: "3",
    name: "Auto Garage Pro",
    software: "Trial",
    status: "pending",
    lastSync: "2024-12-28 16:45h",
    balance: 0,
    cpa: 0,
    ctr: 0,
    epc: 0,
    avatar: "A",
    progress: 30,
    email: "info@autogaragepro.com",
    phone: "+1 555 0789",
    country: "USA",
    category: "Auto Repair",
    tags: ["New"],
    hasAlerts: true,
    alertType: "missing_info",
    responseTime: "3.5h",
    renewalDate: "2025-01-05",
    totalAppointments: 12
  },
  {
    id: "4",
    name: "Hotel Paradise",
    software: "Monthly",
    status: "active",
    lastSync: "2024-12-27 20:30h",
    balance: 57.97,
    cpa: 0,
    ctr: 0,
    epc: 0,
    avatar: "H",
    progress: 75,
    email: "reservations@hotelparadise.com",
    phone: "+1 555 0321",
    country: "Canada",
    category: "Hotel",
    tags: ["Standard"],
    hasAlerts: true,
    alertType: "complaints",
    responseTime: "2.1h",
    renewalDate: "2025-01-20",
    totalAppointments: 203
  },
  {
    id: "5",
    name: "Law Firm Associates",
    software: "Annual",
    status: "suspended",
    lastSync: "2024-12-20 10:15h",
    balance: 665.64,
    cpa: 0,
    ctr: 0,
    epc: 0,
    avatar: "L",
    progress: 0,
    email: "legal@lawfirmassociates.com",
    phone: "+1 555 0654",
    country: "Brazil",
    category: "Law Firm",
    tags: ["High Risk"],
    hasAlerts: true,
    alertType: "suspicious_activity",
    responseTime: "5.2h",
    renewalDate: "2025-03-15",
    totalAppointments: 45
  }
];

export function BusinessTable() {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'suspended':
        return <Pause className="h-4 w-4 text-red-600" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertIcon = (alertType?: string) => {
    switch (alertType) {
      case 'missing_info':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'complaints':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'suspicious_activity':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Premium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'New':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'High Risk':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Standard':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'At Risk':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="p-6 border-b bg-card-header">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Business Management</h2>
              <p className="text-sm text-muted-foreground">Manage registered businesses and their subscriptions</p>
            </div>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-muted/20">
              <TableHead className="font-semibold">Business Name</TableHead>
              <TableHead className="font-semibold">Subscription Plan</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Last Login</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Revenue</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBusinesses.map((business) => (
              <TableRow key={business.id} className="border-b hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4B2AAD]/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-[#4B2AAD]">
                        {business.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{business.name}</div>
                      <div className="text-sm text-muted-foreground">{business.category}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${
                    business.software === 'Annual' ? 'bg-green-100 border-green-200 text-green-800' :
                    business.software === 'Monthly' ? 'bg-blue-100 border-blue-200 text-blue-800' :
                    'bg-yellow-100 border-yellow-200 text-yellow-800'
                  }`}>
                    {business.software}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(business.status)}
                    <span className="text-sm font-medium capitalize">{business.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{business.lastSync}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{business.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{business.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">${business.balance}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-3 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition-colors"
                    >
                      <Pause className="w-3 h-3 mr-1" />
                      Suspend
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-3 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Renew
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell className="h-4 w-4 mr-2" />
                          Send Notification
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Add Admin Note
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="p-4 border-b bg-card-header">
          <h2 className="text-lg font-semibold text-foreground">Business Management</h2>
          <p className="text-sm text-muted-foreground">Manage registered businesses</p>
        </div>
        
        <div className="space-y-4 p-4">
          {mockBusinesses.map((business) => (
            <div key={business.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow rounded-lg border border-gray-200">
              <div className="p-4">
                <div className="space-y-4">
                  {/* Business Header */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#4B2AAD]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#4B2AAD] font-semibold text-sm">
                        {business.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1A1A1A] text-lg mb-1">{business.name}</h3>
                      <p className="text-[#64748B] text-sm mb-2">{business.category}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${
                          business.software === 'Annual' ? 'bg-green-100 border-green-200 text-green-800' :
                          business.software === 'Monthly' ? 'bg-blue-100 border-blue-200 text-blue-800' :
                          'bg-yellow-100 border-yellow-200 text-yellow-800'
                        }`}>
                          {business.software}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(business.status)}
                          <span className="text-xs font-medium capitalize">{business.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9]">
                    <div>
                      <label className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Email</label>
                      <p className="text-sm text-[#1A1A1A] mt-1 break-all">{business.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Phone</label>
                      <p className="text-sm text-[#1A1A1A] mt-1">{business.phone}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Last Login</label>
                      <p className="text-sm text-[#1A1A1A] mt-1">{business.lastSync}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Revenue</label>
                      <p className="text-sm font-medium text-[#1A1A1A] mt-1">${business.balance}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 h-9 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition-colors"
                    >
                      <Pause className="w-3 h-3 mr-1" />
                      Suspend
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 h-9 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Renew
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-[#64748B] text-[#64748B] hover:border-[#4B2AAD] hover:text-[#4B2AAD]">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell className="h-4 w-4 mr-2" />
                          Send Notification
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Add Admin Note
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}