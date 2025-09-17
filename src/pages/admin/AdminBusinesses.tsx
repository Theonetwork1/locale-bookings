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
  Star
} from 'lucide-react';
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
    try {
      setBusinesses(businesses.filter(b => b.id !== businessId));
    } catch (error) {
      console.error('Error deleting business:', error);
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
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditingBusiness(business)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteBusiness(business.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
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
    </div>
  );
};

export default AdminBusinesses;
