import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  User,
  Mail,
  Phone,
  Shield,
  Building2,
  Calendar,
  Lock
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'developer' | 'support' | 'moderator' | 'analyst';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
  permissions: {
    read: boolean;
    write: boolean;
    adminTools: boolean;
    manageBusinesses: boolean;
    manageUsers: boolean;
    viewPayments: boolean;
  };
}

const AdminUsers = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showInvite, setShowInvite] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'support' as TeamMember['role']
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mock: TeamMember[] = [
        {
          id: 'u1',
          name: 'Platform Owner',
          email: 'owner@bizli.com',
          role: 'owner',
          status: 'active',
          createdAt: '2024-01-01',
          lastLogin: '2024-04-26',
          permissions: {
            read: true,
            write: true,
            adminTools: true,
            manageBusinesses: true,
            manageUsers: true,
            viewPayments: true
          }
        },
        {
          id: 'u2',
          name: 'Dev Team',
          email: 'dev@bizli.com',
          role: 'developer',
          status: 'active',
          createdAt: '2024-02-15',
          lastLogin: '2024-04-25',
          permissions: {
            read: true,
            write: true,
            adminTools: true,
            manageBusinesses: false,
            manageUsers: false,
            viewPayments: false
          }
        },
        {
          id: 'u3',
          name: 'Support Agent',
          email: 'support@bizli.com',
          role: 'support',
          status: 'active',
          createdAt: '2024-03-05',
          lastLogin: '2024-04-20',
          permissions: {
            read: true,
            write: false,
            adminTools: false,
            manageBusinesses: false,
            manageUsers: false,
            viewPayments: false
          }
        }
      ];
      setMembers(mock);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      permissions: {
        read: true,
        write: false,
        adminTools: false,
        manageBusinesses: false,
        manageUsers: false,
        viewPayments: false
      }
    };
    setMembers([...members, newMember]);
    setInviteForm({ name: '', email: '', role: 'support' });
    setShowInvite(false);
  };

  const togglePermission = (id: string, key: keyof TeamMember['permissions']) => {
    setMembers(prev => prev.map(m => m.id === id ? {
      ...m,
      permissions: { ...m.permissions, [key]: !m.permissions[key] }
    } : m));
  };

  const updateRole = (id: string, role: TeamMember['role']) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));
  };

  const removeMember = (id: string) => setMembers(prev => prev.filter(m => m.id !== id));

  const filtered = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading team...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Team Members & Permissions</h1>
          <p className="text-gray-600">Manage internal collaborators and permissions</p>
        </div>
        <Dialog open={showInvite} onOpenChange={setShowInvite}>
            <DialogTrigger asChild>
              <Button className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Collaborator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="invite-name">Full Name</Label>
                  <Input id="invite-name" value={inviteForm.name} onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="invite-email">Email</Label>
                  <Input id="invite-email" type="email" value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select value={inviteForm.role} onValueChange={(v: TeamMember['role']) => setInviteForm({ ...inviteForm, role: v })}>
                    <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleInvite} className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">Send Invite</Button>
              </div>
            </DialogContent>
          </Dialog>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Filters */}
        <div className="mb-2 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search team..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Filter by role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="analyst">Analyst</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Card className="shadow-lg border-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left py-4 px-6 text-muted-foreground font-medium">Member</th>
                      <th className="text-left py-4 px-6 text-muted-foreground font-medium">Role</th>
                      <th className="text-left py-4 px-6 text-muted-foreground font-medium">Permissions</th>
                      <th className="text-left py-4 px-6 text-muted-foreground font-medium">Created</th>
                      <th className="text-left py-4 px-6 text-muted-foreground font-medium">Last Login</th>
                      <th className="text-left py-4 px-6 text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr>td]:align-top [&>tr>td]:break-words">
                    {filtered.map((m) => (
                      <tr key={m.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#4B2AAD]/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-[#4B2AAD]">{m.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-[#1A1A1A]">{m.name}</p>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span>{m.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Select value={m.role} onValueChange={(v: TeamMember['role']) => updateRole(m.id, v)}>
                            <SelectTrigger className="w-40 border-[#E5E7EB] focus:border-[#4B2AAD]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="owner">Owner</SelectItem>
                              <SelectItem value="developer">Developer</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="analyst">Analyst</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1 items-center max-w-80">
                            <Badge 
                              variant={m.permissions.read ? "default" : "secondary"}
                              className={`text-xs px-2 py-1 cursor-pointer transition-colors ${
                                m.permissions.read
                                  ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                                  : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                              }`}
                              onClick={() => togglePermission(m.id, 'read')}
                            >
                              Read
                            </Badge>
                            <Badge 
                              variant={m.permissions.write ? "default" : "secondary"}
                              className={`text-xs px-2 py-1 cursor-pointer transition-colors ${
                                m.permissions.write
                                  ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                                  : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                              }`}
                              onClick={() => togglePermission(m.id, 'write')}
                            >
                              Write
                            </Badge>
                            <Badge 
                              variant={m.permissions.adminTools ? "default" : "secondary"}
                              className={`text-xs px-2 py-1 cursor-pointer transition-colors ${
                                m.permissions.adminTools
                                  ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                                  : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                              }`}
                              onClick={() => togglePermission(m.id, 'adminTools')}
                            >
                              Admin Tools
                            </Badge>
                            <Badge 
                              variant={m.permissions.manageBusinesses ? "default" : "secondary"}
                              className={`text-xs px-2 py-1 cursor-pointer transition-colors ${
                                m.permissions.manageBusinesses
                                  ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                                  : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                              }`}
                              onClick={() => togglePermission(m.id, 'manageBusinesses')}
                            >
                              Businesses
                            </Badge>
                            <Badge 
                              variant={m.permissions.manageUsers ? "default" : "secondary"}
                              className={`text-xs px-2 py-1 cursor-pointer transition-colors ${
                                m.permissions.manageUsers
                                  ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                                  : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                              }`}
                              onClick={() => togglePermission(m.id, 'manageUsers')}
                            >
                              Users
                            </Badge>
                            <Badge 
                              variant={m.permissions.viewPayments ? "default" : "secondary"}
                              className={`text-xs px-2 py-1 cursor-pointer transition-colors ${
                                m.permissions.viewPayments
                                  ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                                  : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                              }`}
                              onClick={() => togglePermission(m.id, 'viewPayments')}
                            >
                              Payments
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">{m.createdAt}</td>
                        <td className="py-4 px-6 text-muted-foreground">{m.lastLogin ?? 'Never'}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 px-3 border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white transition-colors"
                              onClick={() => {
                                setEditingMember(m);
                                setShowEditModal(true);
                              }}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" 
                              onClick={() => removeMember(m.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filtered.map((m) => (
            <Card key={m.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="space-y-5">
                  {/* Member Header with Avatar and Basic Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#4B2AAD]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#4B2AAD] font-semibold text-sm">
                        {m.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1A1A1A] text-lg mb-1">{m.name}</h3>
                      <p className="text-[#64748B] text-sm mb-2 break-all">{m.email}</p>
                      <Badge 
                        variant="secondary" 
                        className="bg-[#EEF1FF] text-[#4B2AAD] border border-[#4B2AAD]/20"
                      >
                        {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Role Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#374151]">Role</label>
                    <Select value={m.role} onValueChange={(v: TeamMember['role']) => updateRole(m.id, v)}>
                      <SelectTrigger className="w-full h-10 border-[#E5E7EB] focus:border-[#4B2AAD]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Permissions Section with Badge Layout */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#374151]">Permissions</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant={m.permissions.read ? "default" : "secondary"}
                        className={`text-xs px-3 py-1 cursor-pointer transition-colors ${
                          m.permissions.read
                            ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                            : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                        }`}
                        onClick={() => togglePermission(m.id, 'read')}
                      >
                        Read
                      </Badge>
                      <Badge 
                        variant={m.permissions.write ? "default" : "secondary"}
                        className={`text-xs px-3 py-1 cursor-pointer transition-colors ${
                          m.permissions.write
                            ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                            : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                        }`}
                        onClick={() => togglePermission(m.id, 'write')}
                      >
                        Write
                      </Badge>
                      <Badge 
                        variant={m.permissions.adminTools ? "default" : "secondary"}
                        className={`text-xs px-3 py-1 cursor-pointer transition-colors ${
                          m.permissions.adminTools
                            ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                            : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                        }`}
                        onClick={() => togglePermission(m.id, 'adminTools')}
                      >
                        Admin Tools
                      </Badge>
                      <Badge 
                        variant={m.permissions.manageBusinesses ? "default" : "secondary"}
                        className={`text-xs px-3 py-1 cursor-pointer transition-colors ${
                          m.permissions.manageBusinesses
                            ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                            : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                        }`}
                        onClick={() => togglePermission(m.id, 'manageBusinesses')}
                      >
                        Businesses
                      </Badge>
                      <Badge 
                        variant={m.permissions.manageUsers ? "default" : "secondary"}
                        className={`text-xs px-3 py-1 cursor-pointer transition-colors ${
                          m.permissions.manageUsers
                            ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                            : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                        }`}
                        onClick={() => togglePermission(m.id, 'manageUsers')}
                      >
                        Users
                      </Badge>
                      <Badge 
                        variant={m.permissions.viewPayments ? "default" : "secondary"}
                        className={`text-xs px-3 py-1 cursor-pointer transition-colors ${
                          m.permissions.viewPayments
                            ? 'bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white'
                            : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] border border-[#E5E7EB]'
                        }`}
                        onClick={() => togglePermission(m.id, 'viewPayments')}
                      >
                        Payments
                      </Badge>
                    </div>
                  </div>

                  {/* Date Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9]">
                    <div>
                      <label className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Created Date</label>
                      <p className="text-sm text-[#1A1A1A] mt-1 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-[#4B2AAD]" />
                        {m.createdAt}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Last Login</label>
                      <p className="text-sm text-[#1A1A1A] mt-1 flex items-center">
                        <User className="w-4 h-4 mr-2 text-[#4B2AAD]" />
                        {m.lastLogin ?? 'Never'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 h-11 border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white font-medium transition-colors"
                      onClick={() => {
                        setEditingMember(m);
                        setShowEditModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Member
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-11 w-11 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                      onClick={() => removeMember(m.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No team members found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Edit Member Modal */}
        {editingMember && (
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input 
                    id="edit-name" 
                    value={editingMember.name} 
                    onChange={(e) => setEditingMember({...editingMember, name: e.target.value})} 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={editingMember.email} 
                    onChange={(e) => setEditingMember({...editingMember, email: e.target.value})} 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-role">Role</Label>
                  <Input 
                    id="edit-role" 
                    value={editingMember.role} 
                    onChange={(e) => setEditingMember({...editingMember, role: e.target.value as TeamMember['role']})} 
                    placeholder="Enter custom role..."
                  />
                </div>
                <Button 
                  onClick={() => {
                    // Update the member in the list
                    setMembers(prev => prev.map(m => m.id === editingMember.id ? editingMember : m));
                    setShowEditModal(false);
                    setEditingMember(null);
                  }} 
                  className="w-full bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white"
                >
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
