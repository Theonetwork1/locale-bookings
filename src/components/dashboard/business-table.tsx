import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, ExternalLink, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Business {
  id: string;
  name: string;
  software: string;
  status: 'active' | 'pending' | 'offline' | 'closed';
  lastSync: string;
  balance: number;
  cpa: number;
  ctr: number;
  epc: number;
  avatar: string;
  progress: number;
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
    progress: 85
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
    progress: 95
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
    progress: 30
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
    progress: 75
  },
  {
    id: "5",
    name: "Law Firm Associates",
    software: "Annual",
    status: "closed",
    lastSync: "2024-12-20 10:15h",
    balance: 665.64,
    cpa: 0,
    ctr: 0,
    epc: 0,
    avatar: "L",
    progress: 0
  }
];

export function BusinessTable() {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6 border-b bg-card-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Business Management</h2>
            <p className="text-sm text-muted-foreground">Manage registered businesses and their subscriptions</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success-light text-success">
              148 Total Businesses
            </Badge>
            <Button size="sm" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Export
            </Button>
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
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {business.avatar}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{business.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`text-xs ${
                  business.software === 'Annual' ? 'bg-success-light border-success/20 text-success' :
                  business.software === 'Monthly' ? 'bg-accent-light border-accent/20 text-accent' :
                  'bg-warning-light border-warning/20 text-warning'
                }`}>
                  {business.software}
                </Badge>
              </TableCell>
              <TableCell>
                <StatusBadge status={business.status}>
                  {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                </StatusBadge>
              </TableCell>
              <TableCell className="text-muted-foreground font-mono text-sm">
                {business.lastSync}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {business.name.toLowerCase().includes('salon') ? 'salon@beautique.com' :
                 business.name.toLowerCase().includes('restaurant') ? 'contact@legourmet.com' :
                 business.name.toLowerCase().includes('auto') ? 'info@autogaragepro.com' :
                 business.name.toLowerCase().includes('hotel') ? 'reservations@hotelparadise.com' :
                 'legal@lawfirmassociates.com'}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {business.name.toLowerCase().includes('salon') ? '+1 555 0123' :
                 business.name.toLowerCase().includes('restaurant') ? '+1 555 0456' :
                 business.name.toLowerCase().includes('auto') ? '+1 555 0789' :
                 business.name.toLowerCase().includes('hotel') ? '+1 555 0321' :
                 '+1 555 0654'}
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                ${business.balance}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                    Suspend
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                    Renew
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}