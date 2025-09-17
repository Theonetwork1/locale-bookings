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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
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
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
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

        {/* Team Table */}
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
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-muted-foreground">{m.name.charAt(0)}</span>
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
                          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
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
                        <div className="flex flex-wrap gap-2 items-center">
                          <Button variant={m.permissions.read ? 'default' : 'outline'} size="sm" onClick={() => togglePermission(m.id, 'read')}>
                            <Lock className="w-4 h-4 mr-1" /> Read
                          </Button>
                          <Button variant={m.permissions.write ? 'default' : 'outline'} size="sm" onClick={() => togglePermission(m.id, 'write')}>
                            <Lock className="w-4 h-4 mr-1" /> Write
                          </Button>
                          <Button variant={m.permissions.adminTools ? 'default' : 'outline'} size="sm" onClick={() => togglePermission(m.id, 'adminTools')}>
                            <Shield className="w-4 h-4 mr-1" /> Admin Tools
                          </Button>
                          <Button variant={m.permissions.manageBusinesses ? 'default' : 'outline'} size="sm" onClick={() => togglePermission(m.id, 'manageBusinesses')}>
                            <Building2 className="w-4 h-4 mr-1" /> Businesses
                          </Button>
                          <Button variant={m.permissions.manageUsers ? 'default' : 'outline'} size="sm" onClick={() => togglePermission(m.id, 'manageUsers')}>
                            <User className="w-4 h-4 mr-1" /> Users
                          </Button>
                          <Button variant={m.permissions.viewPayments ? 'default' : 'outline'} size="sm" onClick={() => togglePermission(m.id, 'viewPayments')}>
                            <Calendar className="w-4 h-4 mr-1" /> Payments
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{m.createdAt}</td>
                      <td className="py-4 px-6 text-muted-foreground">{m.lastLogin ?? 'Never'}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => removeMember(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No team members found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
