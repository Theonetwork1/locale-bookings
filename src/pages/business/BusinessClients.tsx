import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  User,
  Mail,
  Phone,
  Calendar,
  Star
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalAppointments: number;
  lastAppointment: string;
  rating: number;
  status: 'active' | 'inactive';
}

const BusinessClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockClients: Client[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@email.com',
          phone: '(555) 111-2222',
          totalAppointments: 12,
          lastAppointment: '2024-04-20',
          rating: 4.8,
          status: 'active'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@email.com',
          phone: '(555) 333-4444',
          totalAppointments: 5,
          lastAppointment: '2024-04-15',
          rating: 4.5,
          status: 'active'
        }
      ];
      setClients(mockClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading clients...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground">Manage your business clients</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground">{client.name}</CardTitle>
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                      {client.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{client.phone}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Appointments</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{client.totalAppointments}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Rating</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{client.rating}</p>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    Last appointment: {client.lastAppointment}
                  </p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View History
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No clients found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessClients;
