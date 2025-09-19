import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  User,
  Mail,
  Phone,
  Calendar,
  Star,
  Filter,
  SortAsc,
  SortDesc,
  MessageCircle,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users,
  Activity,
  Clock,
  TrendingUp
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  totalAppointments: number;
  lastAppointment: string;
  rating: number;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  joinDate: string;
  totalSpent: number;
  lastActivity: string;
  preferredServices: string[];
}

const BusinessClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'appointments' | 'rating' | 'lastActivity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending' | 'blocked'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      // Enhanced mock data for demo
      const mockClients: Client[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '(555) 111-2222',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          totalAppointments: 12,
          lastAppointment: '2024-04-20',
          rating: 4.8,
          status: 'active',
          joinDate: '2024-01-15',
          totalSpent: 450,
          lastActivity: '2024-04-20',
          preferredServices: ['Haircut', 'Styling']
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '(555) 333-4444',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          totalAppointments: 5,
          lastAppointment: '2024-04-15',
          rating: 4.5,
          status: 'active',
          joinDate: '2024-02-10',
          totalSpent: 280,
          lastActivity: '2024-04-15',
          preferredServices: ['Manicure', 'Facial']
        },
        {
          id: '3',
          name: 'Michael Brown',
          email: 'michael.brown@email.com',
          phone: '(555) 555-6666',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          totalAppointments: 8,
          lastAppointment: '2024-04-18',
          rating: 4.9,
          status: 'pending',
          joinDate: '2024-03-05',
          totalSpent: 320,
          lastActivity: '2024-04-18',
          preferredServices: ['Massage', 'Wellness']
        },
        {
          id: '4',
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '(555) 777-8888',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          totalAppointments: 15,
          lastAppointment: '2024-04-22',
          rating: 4.7,
          status: 'active',
          joinDate: '2023-12-20',
          totalSpent: 675,
          lastActivity: '2024-04-22',
          preferredServices: ['Haircut', 'Color', 'Treatment']
        },
        {
          id: '5',
          name: 'David Wilson',
          email: 'david.wilson@email.com',
          phone: '(555) 999-0000',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
          totalAppointments: 3,
          lastAppointment: '2024-03-10',
          rating: 4.2,
          status: 'inactive',
          joinDate: '2024-01-08',
          totalSpent: 150,
          lastActivity: '2024-03-10',
          preferredServices: ['Beard Trim']
        }
      ];
      setClients(mockClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced filtering and sorting
  const filteredAndSortedClients = () => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.phone?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort clients
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'appointments':
          aValue = a.totalAppointments;
          bValue = b.totalAppointments;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'lastActivity':
          aValue = new Date(a.lastActivity).getTime();
          bValue = new Date(b.lastActivity).getTime();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  };

  const filteredClients = filteredAndSortedClients();
  
  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading clients...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] flex items-center gap-3">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#4B2AAD]" />
                Clients
              </h1>
              <p className="text-[#64748B] mt-1">Manage your business clients and relationships</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <Activity className="w-4 h-4" />
              <span>{filteredClients.length} total clients</span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Controls */}
      <div className="px-4 sm:px-6 py-4 bg-white border-b">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-[#E5E7EB] focus:border-[#4B2AAD]"
              />
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            {/* Status Filter */}
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full sm:w-40 h-10">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full sm:w-40 h-10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="appointments">Appointments</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="lastActivity">Last Activity</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="h-10 px-3"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Enhanced Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paginatedClients.map((client) => (
            <Card key={client.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-4 sm:p-6">
                {/* Client Header with Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12 sm:w-14 sm:h-14 ring-2 ring-[#4B2AAD]/20">
                    <AvatarImage src={client.avatar_url} alt={client.name} />
                    <AvatarFallback className="bg-[#4B2AAD]/10 text-[#4B2AAD] font-semibold text-lg">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#1A1A1A] truncate">{client.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs font-medium border ${getStatusColor(client.status)}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-[#374151]">{client.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <a 
                    href={`mailto:${client.email}`}
                    className="flex items-center gap-3 text-sm text-[#64748B] hover:text-[#4B2AAD] transition-colors group"
                  >
                    <Mail className="w-4 h-4 group-hover:text-[#4B2AAD]" />
                    <span className="break-all">{client.email}</span>
                  </a>
                  {client.phone && (
                    <a 
                      href={`tel:${client.phone}`}
                      className="flex items-center gap-3 text-sm text-[#64748B] hover:text-[#4B2AAD] transition-colors group"
                    >
                      <Phone className="w-4 h-4 group-hover:text-[#4B2AAD]" />
                      <span>{client.phone}</span>
                    </a>
                  )}
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-[#F8FAFC] rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="w-3 h-3 text-[#64748B]" />
                      <span className="text-xs text-[#64748B]">Appointments</span>
                    </div>
                    <p className="text-lg font-bold text-[#1A1A1A]">{client.totalAppointments}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-[#64748B]" />
                      <span className="text-xs text-[#64748B]">Total Spent</span>
                    </div>
                    <p className="text-lg font-bold text-[#1A1A1A]">${client.totalSpent}</p>
                  </div>
                </div>

                {/* Client Details */}
                <div className="space-y-2 mb-4 text-xs text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Joined:</span>
                    <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Activity:</span>
                    <span className="font-medium">{new Date(client.lastActivity).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Preferred Services */}
                {client.preferredServices.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-[#374151] mb-2">Preferred Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {client.preferredServices.slice(0, 2).map((service, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-[#EEF1FF] text-[#4B2AAD] text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {client.preferredServices.length > 2 && (
                        <span className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">
                          +{client.preferredServices.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 h-9 text-xs border-[#E5E7EB] hover:border-[#4B2AAD] hover:text-[#4B2AAD]"
                    onClick={() => {
                      // Navigate to client appointments history
                      navigate(`/business/appointments?client=${client.id}`);
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">View</span>
                    <span className="sm:hidden">History</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 h-9 text-xs border-[#E5E7EB] hover:border-[#4B2AAD] hover:text-[#4B2AAD]"
                    onClick={() => {
                      // Navigate to chat with client
                      navigate('/business/chat');
                    }}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Message</span>
                    <span className="sm:hidden">Chat</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 px-2 border-[#E5E7EB] hover:border-[#4B2AAD] hover:text-[#4B2AAD]"
                    onClick={() => {
                      // Show more options - could open a dropdown or modal
                      alert(`More options for ${client.name}:\n\n• Edit Client Info\n• Block/Unblock Client\n• View Full Profile\n• Export Data\n• Send Email\n• Schedule Appointment`);
                    }}
                  >
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredClients.length === 0 && !loading && (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 sm:p-12 text-center">
              <Users className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No clients found</h3>
              <p className="text-[#64748B] mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search criteria or filters'
                  : 'Start building relationships with your first clients'
                }
              </p>
              {(searchTerm || filterStatus !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setCurrentPage(1);
                  }}
                  className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-[#64748B]">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-9"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-9 w-9 ${
                        currentPage === pageNum 
                          ? 'bg-[#4B2AAD] text-white' 
                          : 'border-[#E5E7EB] hover:border-[#4B2AAD]'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="px-2 text-[#64748B]">...</span>
                    <Button
                      variant={currentPage === totalPages ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      className={`h-9 w-9 ${
                        currentPage === totalPages 
                          ? 'bg-[#4B2AAD] text-white' 
                          : 'border-[#E5E7EB] hover:border-[#4B2AAD]'
                      }`}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-9"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessClients;
