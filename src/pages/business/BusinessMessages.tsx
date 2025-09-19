import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardSection, 
  DashboardContent 
} from '@/components/layout/DashboardLayout';
import { 
  Search,
  MessageSquare,
  Clock,
  User,
  Check,
  Trash2,
  Star,
  Calendar,
  Megaphone,
  Settings,
  Building2,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAvatar?: string;
  businessLogo?: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  reply?: string;
  type: 'appointment' | 'inquiry' | 'complaint' | 'compliment' | 'system';
  priority: 'low' | 'medium' | 'high';
  starred?: boolean;
}

const BusinessMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'appointment' | 'inquiry' | 'starred'>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const mockMessages: Message[] = [
        {
          id: '1',
          clientName: 'John Smith',
          clientEmail: 'john.smith@email.com',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          subject: 'Appointment Reschedule Request',
          content: 'Hi, I have a question about my appointment tomorrow. Can I reschedule it to 3 PM instead of 2 PM?',
          timestamp: '2024-04-26 10:30',
          read: false,
          type: 'appointment',
          priority: 'high',
          starred: false
        },
        {
          id: '2',
          clientName: 'Sarah Johnson',
          clientEmail: 'sarah.johnson@email.com',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          subject: 'Hair Coloring Services Inquiry',
          content: 'Hello, I would like to know more about your hair coloring services and pricing.',
          timestamp: '2024-04-25 15:45',
          read: true,
          type: 'inquiry',
          priority: 'medium',
          reply: 'Thank you for your inquiry! Our hair coloring services start at $120...',
          starred: true
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const toggleStar = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-[#4B2AAD]" />;
      case 'inquiry':
        return <MessageSquare className="w-4 h-4 text-[#4B2AAD]" />;
      case 'complaint':
        return <MessageSquare className="w-4 h-4 text-[#4B2AAD]" />;
      case 'compliment':
        return <Star className="w-4 h-4 text-[#4B2AAD]" />;
      case 'system':
        return <Settings className="w-4 h-4 text-[#4B2AAD]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[#4B2AAD]" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#EF4444] text-white';
      case 'medium':
        return 'bg-[#F59E0B] text-white';
      case 'low':
        return 'bg-[#64748B] text-white';
      default:
        return 'bg-[#64748B] text-white';
    }
  };

  const getBorderColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-[#EF4444]';
      case 'medium':
        return 'border-l-[#F59E0B]';
      case 'low':
        return 'border-l-[#64748B]';
      default:
        return 'border-l-[#64748B]';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'unread' && !message.read) ||
      (activeFilter === 'starred' && message.starred) ||
      message.type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getFilterCount = (filterType: string) => {
    switch (filterType) {
      case 'all':
        return messages.length;
      case 'unread':
        return messages.filter(m => !m.read).length;
      case 'starred':
        return messages.filter(m => m.starred).length;
      default:
        return messages.filter(m => m.type === filterType).length;
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#4B2AAD] animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium text-[#1A1A1A]">Loading messages...</div>
          <div className="text-sm text-[#64748B] mt-1">Fetching your client communications</div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Messages"
        subtitle="Communicate with your clients"
        actions={
          unreadCount > 0 ? (
            <Badge className="bg-[#EF4444] text-white border-0 px-3 py-1">
              {unreadCount} unread
            </Badge>
          ) : undefined
        }
      />

      {/* Filter Tabs */}
      <DashboardSection variant="minimal" padding="sm">
        <Tabs value={activeFilter} onValueChange={(value: any) => setActiveFilter(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-12 bg-[#F8FAFC]">
            <TabsTrigger value="all" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              All ({getFilterCount('all')})
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Unread ({getFilterCount('unread')})
            </TabsTrigger>
            <TabsTrigger value="appointment" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Appointments ({getFilterCount('appointment')})
            </TabsTrigger>
            <TabsTrigger value="inquiry" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Inquiries ({getFilterCount('inquiry')})
            </TabsTrigger>
            <TabsTrigger value="starred" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              Starred ({getFilterCount('starred')})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </DashboardSection>

      <DashboardContent>
        {/* Search */}
        <DashboardSection title="Search & Filter" variant="card" padding="md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <Input
              placeholder="Search messages, clients, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 border-[#E5E7EB] focus:border-[#4B2AAD]"
            />
          </div>
        </DashboardSection>

        {/* Messages List - Clean Design */}
        <DashboardSection title="Messages" variant="card" padding="sm">
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <div key={message.id} className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex">
                  {/* Left Border - Priority Color */}
                  <div className={`w-1 ${getBorderColor(message.priority)} bg-current`}></div>
                  
                  {/* Main Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage 
                          src={message.businessLogo || message.clientAvatar} 
                          alt={message.clientName}
                        />
                        <AvatarFallback className="bg-[#F3F4F6] text-[#64748B] font-semibold text-sm">
                          {message.clientName === 'System' ? (
                            <Building2 className="w-4 h-4" />
                          ) : (
                            message.clientName.split(' ').map(n => n[0]).join('')
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-1">
                          {getTypeIcon(message.type)}
                          <h3 className="font-semibold text-[#1A1A1A] text-sm">
                            {message.subject}
                          </h3>
                          {!message.read && (
                            <div className="w-2 h-2 bg-[#4B2AAD] rounded-full"></div>
                          )}
                          {message.starred && (
                            <Star className="w-3 h-3 text-[#F59E0B] fill-current" />
                          )}
                        </div>

                        {/* Client and Time */}
                        <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2">
                          <span className="font-medium">{message.clientName}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{new Date(message.timestamp).toLocaleString()}</span>
                        </div>

                        {/* Message Preview */}
                        <p className="text-sm text-[#374151] line-clamp-2 mb-2">
                          {message.content}
                        </p>

                        {/* Priority and Actions */}
                        <div className="flex items-center justify-between">
                          <Badge className={`${getPriorityColor(message.priority)} text-xs px-2 py-1`}>
                            {message.priority} priority
                          </Badge>
                          
                          <div className="flex gap-2">
                            {!message.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(message.id)}
                                className="h-8 w-8 p-0 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#10B981]"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStar(message.id)}
                              className={`h-8 w-8 p-0 ${message.starred ? 'text-[#F59E0B]' : 'text-[#64748B]'} hover:bg-[#F8FAFC]`}
                            >
                              <Star className={`w-3 h-3 ${message.starred ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMessage(message.id)}
                              className="h-8 w-8 p-0 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#EF4444]"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardSection>

        {/* Empty State */}
        {filteredMessages.length === 0 && !loading && (
          <DashboardSection title="No Messages" variant="card" padding="lg">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No messages found</h3>
              <p className="text-[#64748B] mb-6">
                {searchTerm || activeFilter !== 'all'
                  ? 'No messages match your current filters.'
                  : 'When clients send you messages, they will appear here.'
                }
              </p>
            </div>
          </DashboardSection>
        )}

        {/* Message Detail Modal */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedMessage && getTypeIcon(selectedMessage.type)}
                {selectedMessage?.subject}
              </DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[#64748B]" />
                    <span className="font-medium">{selectedMessage.clientName}</span>
                    <span className="text-[#64748B]">({selectedMessage.clientEmail})</span>
                  </div>
                  <p className="text-[#374151]">{selectedMessage.content}</p>
                </div>
                
                {selectedMessage.reply && (
                  <div className="p-4 border border-[#4B2AAD]/20 bg-[#4B2AAD]/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-[#4B2AAD]" />
                      <span className="font-medium">Your Reply</span>
                    </div>
                    <p className="text-[#374151]">{selectedMessage.reply}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default BusinessMessages;
