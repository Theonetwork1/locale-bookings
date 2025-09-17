import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  MapPin,
  Monitor,
  Smartphone
} from "lucide-react";

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
}

interface LoginHistory {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  success: boolean;
  failureReason?: string;
}

interface SecurityEvent {
  id: string;
  type: 'failed_login' | 'suspicious_activity' | 'permission_escalation' | 'data_export' | 'admin_action';
  userId: string;
  userName: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip: string;
  resolved: boolean;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    action: 'Created Business',
    details: 'Created new business "Beauty Salon Pro" with ID biz_123',
    timestamp: '2024-01-15T10:30:00Z',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'medium',
    category: 'Business Management'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    action: 'Updated User Permissions',
    details: 'Modified permissions for user mike@bizli.com',
    timestamp: '2024-01-15T09:15:00Z',
    ip: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    severity: 'high',
    category: 'User Management'
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Smith',
    action: 'Deleted User',
    details: 'Deleted user account for test@example.com',
    timestamp: '2024-01-14T15:45:00Z',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'critical',
    category: 'User Management'
  },
  {
    id: '4',
    userId: '3',
    userName: 'Mike Chen',
    action: 'Exported Data',
    details: 'Exported business analytics data (CSV format)',
    timestamp: '2024-01-14T11:20:00Z',
    ip: '192.168.1.106',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    severity: 'high',
    category: 'Data Export'
  },
  {
    id: '5',
    userId: '2',
    userName: 'Sarah Johnson',
    action: 'Updated System Settings',
    details: 'Modified email notification preferences',
    timestamp: '2024-01-13T16:30:00Z',
    ip: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    severity: 'medium',
    category: 'System Configuration'
  }
];

const mockLoginHistory: LoginHistory[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    timestamp: '2024-01-15T10:30:00Z',
    device: 'Desktop',
    browser: 'Chrome 120.0',
    os: 'Windows 10',
    ip: '192.168.1.100',
    location: 'New York, US',
    success: true
  },
  {
    id: '2',
    userId: '1',
    userName: 'John Smith',
    timestamp: '2024-01-14T15:45:00Z',
    device: 'Mobile',
    browser: 'Safari 17.0',
    os: 'iOS 17.2',
    ip: '192.168.1.101',
    location: 'New York, US',
    success: true
  },
  {
    id: '3',
    userId: '2',
    userName: 'Sarah Johnson',
    timestamp: '2024-01-15T09:15:00Z',
    device: 'Desktop',
    browser: 'Firefox 121.0',
    os: 'macOS 14.2',
    ip: '192.168.1.103',
    location: 'Toronto, CA',
    success: true
  },
  {
    id: '4',
    userId: '3',
    userName: 'Mike Chen',
    timestamp: '2024-01-10T16:20:00Z',
    device: 'Desktop',
    browser: 'Chrome 119.0',
    os: 'macOS 14.1',
    ip: '192.168.1.106',
    location: 'Vancouver, CA',
    success: true
  },
  {
    id: '5',
    userId: '4',
    userName: 'Alex Wilson',
    timestamp: '2024-01-15T08:45:00Z',
    device: 'Desktop',
    browser: 'Edge 120.0',
    os: 'Windows 11',
    ip: '192.168.1.110',
    location: 'Unknown',
    success: false,
    failureReason: 'Invalid password'
  }
];

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'failed_login',
    userId: '4',
    userName: 'Alex Wilson',
    description: 'Multiple failed login attempts detected',
    timestamp: '2024-01-15T08:45:00Z',
    severity: 'high',
    ip: '192.168.1.110',
    resolved: false
  },
  {
    id: '2',
    type: 'suspicious_activity',
    userId: '3',
    userName: 'Mike Chen',
    description: 'Unusual data export activity detected',
    timestamp: '2024-01-14T11:20:00Z',
    severity: 'medium',
    ip: '192.168.1.106',
    resolved: true
  },
  {
    id: '3',
    type: 'admin_action',
    userId: '1',
    userName: 'John Smith',
    description: 'Critical user deletion performed',
    timestamp: '2024-01-14T15:45:00Z',
    severity: 'critical',
    ip: '192.168.1.100',
    resolved: true
  }
];

const AuditLogs: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>(mockLoginHistory);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [userFilter, setUserFilter] = useState<string>('all');

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      medium: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      high: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
      critical: { color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    
    const config = severityConfig[severity as keyof typeof severityConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Created')) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (action.includes('Updated') || action.includes('Modified')) return <Edit className="w-4 h-4 text-blue-600" />;
    if (action.includes('Deleted')) return <Trash2 className="w-4 h-4 text-red-600" />;
    if (action.includes('Exported')) return <Download className="w-4 h-4 text-purple-600" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const getDeviceIcon = (device: string) => {
    if (device === 'Mobile') return <Smartphone className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const getSecurityEventIcon = (type: string) => {
    switch (type) {
      case 'failed_login': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'suspicious_activity': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'permission_escalation': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'data_export': return <Download className="w-4 h-4 text-blue-600" />;
      case 'admin_action': return <User className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesUser = userFilter === 'all' || log.userId === userFilter;
    
    return matchesSearch && matchesSeverity && matchesCategory && matchesUser;
  });

  const filteredLoginHistory = loginHistory.filter(login => {
    const matchesSearch = login.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         login.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         login.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = userFilter === 'all' || login.userId === userFilter;
    
    return matchesSearch && matchesUser;
  });

  const filteredSecurityEvents = securityEvents.filter(event => {
    const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;
    const matchesUser = userFilter === 'all' || event.userId === userFilter;
    
    return matchesSearch && matchesSeverity && matchesUser;
  });

  const uniqueUsers = Array.from(new Set([
    ...auditLogs.map(log => ({ id: log.userId, name: log.userName })),
    ...loginHistory.map(login => ({ id: login.userId, name: login.userName })),
    ...securityEvents.map(event => ({ id: event.userId, name: event.userName }))
  ])).filter((user, index, self) => 
    index === self.findIndex(u => u.id === user.id)
  );

  const categories = Array.from(new Set(auditLogs.map(log => log.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit & Security</h2>
          <p className="text-gray-600">Monitor user activities and security events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Actions</p>
                <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Events</p>
                <p className="text-2xl font-bold text-red-600">
                  {securityEvents.filter(e => !e.resolved).length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Logins</p>
                <p className="text-2xl font-bold text-orange-600">
                  {loginHistory.filter(l => !l.success).length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {uniqueUsers.length}
                </p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search actions, users, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="audit" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="login">Login History</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
        </TabsList>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-4">
          <div className="space-y-4">
            {filteredAuditLogs.map(log => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getActionIcon(log.action)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{log.action}</h3>
                          {getSeverityBadge(log.severity)}
                          <Badge variant="outline" className="text-xs">
                            {log.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {log.userName}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {log.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Login History Tab */}
        <TabsContent value="login" className="space-y-4">
          <div className="space-y-4">
            {filteredLoginHistory.map(login => (
              <Card key={login.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getDeviceIcon(login.device)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{login.userName}</h3>
                          {login.success ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {login.device} • {login.browser} • {login.os}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {login.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(login.timestamp).toLocaleString()}
                          </span>
                          <span>IP: {login.ip}</span>
                        </div>
                        {!login.success && login.failureReason && (
                          <p className="text-xs text-red-600 mt-1">
                            Failure: {login.failureReason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Security Events Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="space-y-4">
            {filteredSecurityEvents.map(event => (
              <Card key={event.id} className={event.resolved ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getSecurityEventIcon(event.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{event.description}</h3>
                          {getSeverityBadge(event.severity)}
                          {event.resolved && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Resolved
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {event.userName}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!event.resolved && (
                      <Button variant="outline" size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditLogs;
