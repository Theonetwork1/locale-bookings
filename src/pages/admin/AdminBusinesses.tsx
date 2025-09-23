import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  Pause,
  XCircle,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { supabase, Business } from '@/lib/supabase';

const AdminBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddBusiness, setShowAddBusiness] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);

  const [businessForm, setBusinessForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    category: ''
  });

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockBusinesses: Business[] = [
        {
          id: '1',
          name: 'Glo Salon',
          description: 'Professional hair salon with expert stylists',
          address: '123 Main St, City, State',
          phone: '(555) 123-4567',
          email: 'info@glosalon.com',
          category: 'Beauty',
          rating: 4.8,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Tech Solutions Inc',
          description: 'IT consulting and support services',
          address: '456 Tech Ave, City, State',
          phone: '(555) 987-6543',
          email: 'contact@techsolutions.com',
          category: 'Technology',
          rating: 4.5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setBusinesses(mockBusinesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBusiness = async () => {
    try {
      const newBusiness: Business = {
        id: Date.now().toString(),
        name: businessForm.name,
        description: businessForm.description,
        address: businessForm.address,
        phone: businessForm.phone,
        email: businessForm.email,
        category: businessForm.category,
        rating: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setBusinesses([...businesses, newBusiness]);
      setBusinessForm({ name: '', description: '', address: '', phone: '', email: '', category: '' });
      setShowAddBusiness(false);
    } catch (error) {
      console.error('Error adding business:', error);
    }
  };

  const handleDeleteBusiness = async (businessId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this business? This action cannot be undone.')) {
      try {
        setBusinesses(businesses.filter(b => b.id !== businessId));
        console.log('Business permanently deleted:', businessId);
      } catch (error) {
        console.error('Error deleting business:', error);
      }
    }
  };

  const handleSuspendBusiness = async (businessId: string) => {
    if (window.confirm('Are you sure you want to suspend this business? They will temporarily lose access to the platform.')) {
      try {
        setBusinesses(businesses.map(b => 
          b.id === businessId 
            ? { ...b, status: 'suspended' as any }
            : b
        ));
        console.log('Business suspended:', businessId);
      } catch (error) {
        console.error('Error suspending business:', error);
      }
    }
  };

  const handleCancelSubscription = async (businessId: string) => {
    if (window.confirm('Are you sure you want to cancel this business subscription? This will end their paid plan immediately.')) {
      try {
        setBusinesses(businesses.map(b => 
          b.id === businessId 
            ? { ...b, subscription_status: 'cancelled' as any, status: 'pending' as any }
            : b
        ));
        console.log('Subscription cancelled for business:', businessId);
      } catch (error) {
        console.error('Error cancelling subscription:', error);
      }
    }
  };

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading businesses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Business Management</h1>
            <p className="text-gray-600">Manage all businesses on the platform</p>
          </div>
          <Dialog open={showAddBusiness} onOpenChange={setShowAddBusiness}>
            <DialogTrigger asChild>
              <Button className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Business
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Business</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={businessForm.name}
                    onChange={(e) => setBusinessForm({...businessForm, name: e.target.value})}
                    placeholder="Enter business name"
                  />
                </div>
                <div>
                  <Label htmlFor="business-description">Description</Label>
                  <Textarea
                    id="business-description"
                    value={businessForm.description}
                    onChange={(e) => setBusinessForm({...businessForm, description: e.target.value})}
                    placeholder="Enter business description"
                  />
                </div>
                <div>
                  <Label htmlFor="business-address">Address</Label>
                  <Input
                    id="business-address"
                    value={businessForm.address}
                    onChange={(e) => setBusinessForm({...businessForm, address: e.target.value})}
                    placeholder="Enter business address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business-phone">Phone</Label>
                    <Input
                      id="business-phone"
                      value={businessForm.phone}
                      onChange={(e) => setBusinessForm({...businessForm, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-email">Email</Label>
                    <Input
                      id="business-email"
                      type="email"
                      value={businessForm.email}
                      onChange={(e) => setBusinessForm({...businessForm, email: e.target.value})}
                      placeholder="business@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="business-category">Category</Label>
                  <Select value={businessForm.category} onValueChange={(value) => setBusinessForm({...businessForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beauty">Beauty</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Food">Food & Dining</SelectItem>
                      <SelectItem value="Fitness">Fitness</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddBusiness} className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">
                  Add Business
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Businesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#EEF1FF] rounded-md flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[#4B2AAD]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-[#1A1A1A]">{business.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{business.category}</Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingBusiness(business)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Business
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-orange-600"
                        onClick={() => handleSuspendBusiness(business.id)}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Suspend Business
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleCancelSubscription(business.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel Subscription
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteBusiness(business.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Permanently
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">{business.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{business.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{business.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{business.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-[#4B2AAD] fill-current" />
                    <span className="text-sm font-medium text-[#1A1A1A]">{business.rating}</span>
                  </div>
                  <Badge variant={business.rating >= 4.5 ? 'default' : 'secondary'}>
                    {business.rating >= 4.5 ? 'Excellent' : 'Good'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No businesses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Edit Business Modal */}
      {editingBusiness && (
        <Dialog open={!!editingBusiness} onOpenChange={() => setEditingBusiness(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Business</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-business-name">Business Name</Label>
                <Input
                  id="edit-business-name"
                  value={editingBusiness.name}
                  onChange={(e) => setEditingBusiness({...editingBusiness, name: e.target.value})}
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <Label htmlFor="edit-business-description">Description</Label>
                <Textarea
                  id="edit-business-description"
                  value={editingBusiness.description}
                  onChange={(e) => setEditingBusiness({...editingBusiness, description: e.target.value})}
                  placeholder="Enter business description"
                />
              </div>
              <div>
                <Label htmlFor="edit-business-address">Address</Label>
                <Input
                  id="edit-business-address"
                  value={editingBusiness.address}
                  onChange={(e) => setEditingBusiness({...editingBusiness, address: e.target.value})}
                  placeholder="Enter business address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-business-phone">Phone</Label>
                  <Input
                    id="edit-business-phone"
                    value={editingBusiness.phone}
                    onChange={(e) => setEditingBusiness({...editingBusiness, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-business-email">Email</Label>
                  <Input
                    id="edit-business-email"
                    type="email"
                    value={editingBusiness.email}
                    onChange={(e) => setEditingBusiness({...editingBusiness, email: e.target.value})}
                    placeholder="business@email.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-business-category">Category</Label>
                <Select value={editingBusiness.category} onValueChange={(value) => setEditingBusiness({...editingBusiness, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Food">Food & Dining</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => {
                  // Update the business in the list
                  setBusinesses(prev => prev.map(b => b.id === editingBusiness.id ? editingBusiness : b));
                  setEditingBusiness(null);
                }} 
                className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminBusinesses;
