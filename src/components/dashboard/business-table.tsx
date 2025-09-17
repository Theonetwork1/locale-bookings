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
      <div className="p-6 border-b bg-card-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Business Management</h2>
            <p className="text-sm text-muted-foreground">Manage registered businesses and their subscriptions</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              148 Total Businesses
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setExportFormat('csv')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExportFormat('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-muted/20">
            <TableHead className="font-semibold">Business</TableHead>
            <TableHead className="font-semibold">Plan & Status</TableHead>
            <TableHead className="font-semibold">Contact</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold">Performance</TableHead>
            <TableHead className="font-semibold">Tags</TableHead>
            <TableHead className="font-semibold">Alerts</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBusinesses.map((business) => (
            <TableRow key={business.id} className="border-b hover:bg-muted/30 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
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
                <div className="space-y-1">
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
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{business.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{business.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{business.country}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">${business.balance}</div>
                  <div className="text-xs text-muted-foreground">
                    {business.totalAppointments} appointments
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {business.responseTime} avg response
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {business.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className={`text-xs ${getTagColor(tag)}`}
                    >
                      <Tag className="h-2 w-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {business.hasAlerts ? (
                  <div className="flex items-center gap-1">
                    {getAlertIcon(business.alertType)}
                    <span className="text-xs text-red-600 font-medium">
                      {business.alertType === 'missing_info' ? 'Missing Info' :
                       business.alertType === 'complaints' ? 'Complaints' :
                       business.alertType === 'suspicious_activity' ? 'Suspicious' : 'Alert'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">OK</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
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
                    <DropdownMenuItem className="text-orange-600">
                      <Pause className="h-4 w-4 mr-2" />
                      Suspend
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-600">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Renew
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Add Admin Note
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}