import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  UserPlus, 
  Mail, 
  Clock, 
  XCircle, 
  RefreshCw, 
  Send,
  Calendar,
  User,
  Shield,
  MapPin
} from "lucide-react";

interface PendingInvitation {
  id: string;
  email: string;
  role: string;
  region?: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'expired' | 'cancelled';
  customMessage?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
}

interface Region {
  id: string;
  name: string;
  code: string;
}

const mockRoles: Role[] = [
  { id: '1', name: 'Support Agent', description: 'Handle customer support tickets' },
  { id: '2', name: 'Content Manager', description: 'Manage platform content and moderation' },
  { id: '3', name: 'Regional Admin', description: 'Manage users and content in assigned region' },
  { id: '4', name: 'Analytics Specialist', description: 'Access and analyze platform data' },
  { id: '5', name: 'Business Manager', description: 'Manage business accounts and approvals' }
];

const mockRegions: Region[] = [
  { id: '1', name: 'North America', code: 'NA' },
  { id: '2', name: 'Europe', code: 'EU' },
  { id: '3', name: 'Asia Pacific', code: 'AP' },
  { id: '4', name: 'Latin America', code: 'LA' },
  { id: '5', name: 'Middle East & Africa', code: 'MEA' }
];

const mockPendingInvitations: PendingInvitation[] = [
  {
    id: '1',
    email: 'alex@bizli.com',
    role: 'Support Agent',
    region: 'North America',
    invitedBy: 'John Smith',
    invitedAt: '2024-01-14T10:00:00Z',
    expiresAt: '2024-01-21T10:00:00Z',
    status: 'pending',
    customMessage: 'Welcome to the team! Looking forward to working with you.'
  },
  {
    id: '2',
    email: 'lisa@bizli.com',
    role: 'Content Manager',
    region: 'Europe',
    invitedBy: 'Sarah Johnson',
    invitedAt: '2024-01-13T14:30:00Z',
    expiresAt: '2024-01-20T14:30:00Z',
    status: 'pending'
  },
  {
    id: '3',
    email: 'mike@bizli.com',
    role: 'Regional Admin',
    region: 'Asia Pacific',
    invitedBy: 'John Smith',
    invitedAt: '2024-01-10T09:15:00Z',
    expiresAt: '2024-01-17T09:15:00Z',
    status: 'expired'
  },
  {
    id: '4',
    email: 'sophie@bizli.com',
    role: 'Analytics Specialist',
    invitedBy: 'Sarah Johnson',
    invitedAt: '2024-01-12T16:45:00Z',
    expiresAt: '2024-01-19T16:45:00Z',
    status: 'cancelled'
  }
];

const InviteManagement: React.FC = () => {
  const [invitations, setInvitations] = useState<PendingInvitation[]>(mockPendingInvitations);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: '',
    role: '',
    region: '',
    customMessage: ''
  });

  const handleSendInvite = () => {
    if (!newInvite.email || !newInvite.role) return;

    const selectedRole = mockRoles.find(r => r.id === newInvite.role);
    const selectedRegion = mockRegions.find(r => r.id === newInvite.region);

    const invitation: PendingInvitation = {
      id: Date.now().toString(),
      email: newInvite.email,
      role: selectedRole?.name || '',
      region: selectedRegion?.name,
      invitedBy: 'Current User', // In real app, get from auth context
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      status: 'pending',
      customMessage: newInvite.customMessage
    };

    setInvitations(prev => [invitation, ...prev]);
    setNewInvite({ email: '', role: '', region: '', customMessage: '' });
    setShowInviteDialog(false);
  };

  const handleResendInvite = (inviteId: string) => {
    setInvitations(prev => prev.map(invite => 
      invite.id === inviteId 
        ? { 
            ...invite, 
            invitedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending'
          }
        : invite
    ));
  };

  const handleCancelInvite = (inviteId: string) => {
    setInvitations(prev => prev.map(invite => 
      invite.id === inviteId 
        ? { ...invite, status: 'cancelled' }
        : invite
    ));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      expired: { color: 'bg-red-100 text-red-800', icon: XCircle },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const getDaysUntilExpiry = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pendingInvites = invitations.filter(invite => invite.status === 'pending');
  const expiredInvites = invitations.filter(invite => invite.status === 'expired');
  const cancelledInvites = invitations.filter(invite => invite.status === 'cancelled');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invite Management</h2>
          <p className="text-gray-600">Send and manage team member invitations</p>
        </div>
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Send Invite
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="colleague@company.com"
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newInvite.role} onValueChange={(value) => setNewInvite(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-sm text-gray-500">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="region">Region (Optional)</Label>
                <Select value={newInvite.region} onValueChange={(value) => setNewInvite(prev => ({ ...prev, region: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRegions.map(region => (
                      <SelectItem key={region.id} value={region.id}>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {region.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Custom Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={newInvite.customMessage}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, customMessage: e.target.value }))}
                  placeholder="Add a personal message to the invitation..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setShowInviteDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendInvite}
                  disabled={!newInvite.email || !newInvite.role}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-blue-600">{pendingInvites.length}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{expiredInvites.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-600">{cancelledInvites.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invitations List */}
      <div className="space-y-4">
        {invitations.map(invite => {
          const daysUntilExpiry = getDaysUntilExpiry(invite.expiresAt);
          const isExpiredInvite = isExpired(invite.expiresAt);
          
          return (
            <Card key={invite.id} className={isExpiredInvite ? 'opacity-60' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{invite.email}</h3>
                      {getStatusBadge(invite.status)}
                      {invite.region && (
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {invite.region}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Role:</span> {invite.role}</p>
                        <p><span className="font-medium">Invited by:</span> {invite.invitedBy}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Sent:</span> {new Date(invite.invitedAt).toLocaleDateString()}</p>
                        <p className={isExpiredInvite ? 'text-red-600' : daysUntilExpiry <= 2 ? 'text-orange-600' : ''}>
                          <span className="font-medium">Expires:</span> {new Date(invite.expiresAt).toLocaleDateString()}
                          {invite.status === 'pending' && (
                            <span className="ml-2">
                              ({daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : 'Expired'})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    {invite.customMessage && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Message:</span> {invite.customMessage}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {invite.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResendInvite(invite.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Resend
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleCancelInvite(invite.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {invite.status === 'expired' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResendInvite(invite.id)}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {invitations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Invitations</h3>
            <p className="text-gray-600 mb-4">You haven't sent any invitations yet.</p>
            <Button 
              onClick={() => setShowInviteDialog(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Send First Invitation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InviteManagement;
