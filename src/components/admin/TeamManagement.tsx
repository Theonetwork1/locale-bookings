import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  UserPlus, 
  Shield, 
  Eye, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Clock, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  Phone,
  Calendar,
  Activity,
  Settings,
  Trash2,
  Edit,
  Key,
  Smartphone,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Types
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  lastLogin: string;
  loginHistory: LoginHistory[];
  twoFactorEnabled: boolean;
  region?: string;
  joinedDate: string;
  avatar?: string;
}

// Define permission structure for table columns
interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const PERMISSIONS: Permission[] = [
  { id: 'read', name: 'Read', description: 'View data and information', category: 'Basic' },
  { id: 'write', name: 'Write', description: 'Create and edit content', category: 'Basic' },
  { id: 'admin_tools', name: 'Admin Tools', description: 'Access admin panel and tools', category: 'Administration' },
  { id: 'manage_businesses', name: 'Businesses', description: 'Manage business accounts', category: 'Business' },
  { id: 'manage_users', name: 'Users', description: 'Manage user accounts', category: 'User Management' },
  { id: 'access_payments', name: 'Payments', description: 'Access payment information', category: 'Financial' },
  { id: 'view_analytics', name: 'Analytics', description: 'View analytics and reports', category: 'Analytics' },
  { id: 'manage_content', name: 'Content', description: 'Manage platform content', category: 'Content' }
];

interface LoginHistory {
  id: string;
  timestamp: string;
  device: string;
  ip: string;
  location: string;
}

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
  isCustom: boolean;
}

interface PendingInvitation {
  id: string;
  email: string;
  role: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
}

// Production data structures - ready for real data
const teamMembers: TeamMember[] = [];
const roles: Role[] = [
  {
    id: '1',
    name: 'Owner',
    permissions: ['read', 'write', 'admin_tools', 'manage_businesses', 'manage_users', 'access_payments', 'view_analytics', 'manage_content'],
    description: 'Full access to all platform features and settings',
    isCustom: false
  },
  {
    id: '2',
    name: 'Admin',
    permissions: ['read', 'write', 'manage_businesses', 'manage_users', 'view_analytics'],
    description: 'Administrative access to manage businesses and users',
    isCustom: false
  },
  {
    id: '3',
    name: 'Support Agent',
    permissions: ['read', 'write', 'manage_content'],
    description: 'Support and content management capabilities',
    isCustom: false
  },
  {
    id: '4',
    name: 'Content Manager',
    permissions: ['read', 'write', 'manage_content'],
    description: 'Content creation and management',
    isCustom: false
  }
];
const pendingInvitations: PendingInvitation[] = [];
const auditLogs: AuditLog[] = [];

const TeamManagement: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Load data from API in production
  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchTeamMembers();
    // fetchPendingInvitations();
    // fetchAuditLogs();
  }, []);

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Suspended</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const handleStatusToggle = (memberId: string, newStatus: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, status: newStatus as any } : member
    ));
  };

  const handleResendInvite = (inviteId: string) => {
    // TODO: Implement API call to resend invitation
    // API call will be implemented here
  };

  const handleCancelInvite = (inviteId: string) => {
    setPendingInvitations(prev => prev.filter(invite => invite.id !== inviteId));
  };

  const handlePermissionToggle = (memberId: string, permissionId: string) => {
    setTeamMembers(prev => prev.map(member => {
      if (member.id === memberId) {
        const hasPermission = member.permissions.includes(permissionId);
        return {
          ...member,
          permissions: hasPermission 
            ? member.permissions.filter(p => p !== permissionId)
            : [...member.permissions, permissionId]
        };
      }
      return member;
    }));
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const canEditPermissions = (member: TeamMember) => {
    // In a real app, this would check if current user has permission to edit
    return true; // For demo purposes
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600">Manage team members, roles, and permissions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setShowRoleDialog(true)}
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Shield className="w-4 h-4 mr-2" />
            Manage Roles
          </Button>
          <Button 
            onClick={() => setShowInviteDialog(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Invites</p>
                <p className="text-2xl font-bold text-gray-900">{pendingInvitations.length}</p>
              </div>
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">2FA Enabled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.twoFactorEnabled).length}
                </p>
              </div>
              <Key className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invitations">Pending Invitations</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="members" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search team members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow>
                        <TableHead className="w-64 min-w-64 sticky left-0 bg-white z-20 border-r">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Team Member
                          </div>
                        </TableHead>
                        <TableHead className="w-32 min-w-32">Role</TableHead>
                        <TableHead className="w-24 min-w-24">Status</TableHead>
                        {PERMISSIONS.map(permission => (
                          <TableHead key={permission.id} className="w-20 min-w-20 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xs font-medium">{permission.name}</span>
                              <span className="text-xs text-gray-500">{permission.category}</span>
                            </div>
                          </TableHead>
                        ))}
                        <TableHead className="w-16 min-w-16">2FA</TableHead>
                        <TableHead className="w-20 min-w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map(member => (
                        <TableRow key={member.id} className="hover:bg-gray-50">
                          {/* Member Info - Sticky Column */}
                          <TableCell className="sticky left-0 bg-white z-10 border-r">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                {member.avatar ? (
                                  <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                                ) : (
                                  <span className="text-purple-600 font-medium text-sm">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-gray-900 truncate">{member.name}</h3>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{member.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {member.region && (
                                    <span className="text-xs text-gray-500 flex items-center">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {member.region}
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {new Date(member.lastLogin).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          {/* Role */}
                          <TableCell>
                            <Select 
                              value={member.role} 
                              onValueChange={(value) => handleRoleChange(member.id, value)}
                              disabled={!canEditPermissions(member)}
                            >
                              <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map(role => (
                                  <SelectItem key={role.id} value={role.name}>
                                    {role.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            {getStatusBadge(member.status)}
                          </TableCell>

                          {/* Permission Columns */}
                          {PERMISSIONS.map(permission => (
                            <TableCell key={permission.id} className="text-center">
                              <Checkbox
                                checked={member.permissions.includes(permission.id)}
                                onCheckedChange={() => handlePermissionToggle(member.id, permission.id)}
                                disabled={!canEditPermissions(member)}
                                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                              />
                            </TableCell>
                          ))}

                          {/* 2FA Status */}
                          <TableCell className="text-center">
                            {member.twoFactorEnabled ? (
                              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                <Key className="w-3 h-3 mr-1" />
                                Enabled
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                                Disabled
                              </Badge>
                            )}
                          </TableCell>

                          {/* Actions */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedMember(member);
                                  setShowAuditLogs(true);
                                }}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Activity
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedMember(member);
                                  setShowLoginHistory(true);
                                }}>
                                  <Activity className="w-4 h-4 mr-2" />
                                  Login History
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Profile
                                </DropdownMenuItem>
                                {member.status === 'active' ? (
                                  <DropdownMenuItem onClick={() => handleStatusToggle(member.id, 'suspended')}>
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    Suspend
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleStatusToggle(member.id, 'active')}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredMembers.map(member => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Member Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                          ) : (
                            <span className="text-purple-600 font-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedMember(member);
                            setShowAuditLogs(true);
                          }}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Activity
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedMember(member);
                            setShowLoginHistory(true);
                          }}>
                            <Activity className="w-4 h-4 mr-2" />
                            Login History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </DropdownMenuItem>
                          {member.status === 'active' ? (
                            <DropdownMenuItem onClick={() => handleStatusToggle(member.id, 'suspended')}>
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusToggle(member.id, 'active')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Role and Status */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label className="text-xs text-gray-500">Role</Label>
                        <Select 
                          value={member.role} 
                          onValueChange={(value) => handleRoleChange(member.id, value)}
                          disabled={!canEditPermissions(member)}
                        >
                          <SelectTrigger className="w-full h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.id} value={role.name}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Status</Label>
                        <div className="mt-1">
                          {getStatusBadge(member.status)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">2FA</Label>
                        <div className="mt-1">
                          {member.twoFactorEnabled ? (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                              <Key className="w-3 h-3 mr-1" />
                              On
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                              Off
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Permissions Grid */}
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block">Permissions</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {PERMISSIONS.map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              checked={member.permissions.includes(permission.id)}
                              onCheckedChange={() => handlePermissionToggle(member.id, permission.id)}
                              disabled={!canEditPermissions(member)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <Label className="text-xs text-gray-700 flex-1">
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
                      {member.region && (
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {member.region}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Last login: {new Date(member.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' || roleFilter !== 'all' 
                    ? 'Try adjusting your search or filters.' 
                    : 'Get started by inviting your first team member.'}
                </p>
                <Button 
                  onClick={() => setShowInviteDialog(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Team Member
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Other tabs content would go here */}
        <TabsContent value="invitations" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending invitations</h3>
              <p className="text-gray-600 mb-4">All invitations have been processed or expired.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Role Management</h3>
              <p className="text-gray-600 mb-4">Manage roles and permissions for your team.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Logs</h3>
              <p className="text-gray-600 mb-4">View system activity and user actions.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamManagement;