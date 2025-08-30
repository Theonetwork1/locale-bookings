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
  balance: string;
  cpa: string;
  ctr: string;
  epc: string;
  avatar: string;
  progress: number;
}

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: '7Bit Partners',
    software: 'Proprietary',
    status: 'active',
    lastSync: '2024-06-21 11:17h',
    balance: '$45,000',
    cpa: '$0.25',
    ctr: '20%',
    epc: '0.87',
    avatar: '/api/placeholder/32/32',
    progress: 85
  },
  {
    id: '2', 
    name: 'Rex Affiliates',
    software: 'Proprietary',
    status: 'active',
    lastSync: '2024-06-21 10:26h',
    balance: '$32,500',
    cpa: '$1.20',
    ctr: '12%',
    epc: '0.45',
    avatar: '/api/placeholder/32/32',
    progress: 60
  },
  {
    id: '3',
    name: 'Top One Partners',
    software: 'MyAffiliates',
    status: 'active',
    lastSync: '2024-06-21 21:21h',
    balance: '$34,675',
    cpa: '$3.25',
    ctr: '22%',
    epc: '1.23',
    avatar: '/api/placeholder/32/32',
    progress: 95
  },
  {
    id: '4',
    name: 'CryptoWild Bros',
    software: 'MyAffiliates',
    status: 'active',
    lastSync: '2024-06-21 20:54h',
    balance: '$12,000',
    cpa: '$0.75',
    ctr: '30%',
    epc: '0.89',
    avatar: '/api/placeholder/32/32',
    progress: 45
  },
  {
    id: '5',
    name: 'Revenue Partners',
    software: 'Proprietary',
    status: 'offline',
    lastSync: '2024-06-21 16:25h',
    balance: '$75,200',
    cpa: '$1.12',
    ctr: '17%',
    epc: '0.67',
    avatar: '/api/placeholder/32/32',
    progress: 0
  }
];

export function BusinessTable() {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6 border-b bg-card-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Business Overview</h2>
            <p className="text-sm text-muted-foreground">Manage and monitor your service providers</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success-light text-success">
              10/10 Programs connected
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
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Software</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Last Sync</TableHead>
            <TableHead className="font-semibold">Balance</TableHead>
            <TableHead className="font-semibold">CPA</TableHead>
            <TableHead className="font-semibold">CTR %</TableHead>
            <TableHead className="font-semibold">EPC</TableHead>
            <TableHead className="font-semibold">CR Goals</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBusinesses.map((business) => (
            <TableRow key={business.id} className="border-b hover:bg-muted/30 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {business.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{business.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
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
              <TableCell className="font-semibold text-foreground">
                {business.balance}
              </TableCell>
              <TableCell className="font-medium">{business.cpa}</TableCell>
              <TableCell className="font-medium">{business.ctr}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{business.epc}</span>
                  <TrendingUp className="h-3 w-3 text-success" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Progress value={business.progress} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {business.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}