import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardSection, 
  DashboardStats, 
  DashboardContent 
} from '@/components/layout/DashboardLayout';
import { 
  Search,
  MessageSquare,
  Send,
  User,
  Clock,
  Calendar,
  Megaphone,
  Settings,
  Filter,
  Check,
  Trash2,
  Star,
  Reply,
  Archive,
  MoreVertical,
  Building2,
  Loader2,
  ArrowUp,
  ChevronDown,
  AlertCircle
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
  archived?: boolean;
}

const BusinessMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'appointment' | 'inquiry' | 'starred'>('all');
  const [swipeStates, setSwipeStates] = useState<{[key: string]: { x: number, action: 'none' | 'read' | 'delete' | 'star' }}>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Enhanced mock data for demo
      const mockMessages: Message[] = [
        {
          id: '1',
          clientName: 'John Smith',
          clientEmail: 'john.smith@email.com',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          subject: 'Appointment Reschedule Request',
          content: 'Hi, I have a question about my appointment tomorrow. Can I reschedule it to 3 PM instead of 2 PM? I have a work meeting that got moved.',
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
          content: 'Hello, I would like to know more about your hair coloring services and pricing. Do you offer balayage techniques?',
          timestamp: '2024-04-25 15:45',
          read: true,
          type: 'inquiry',
          priority: 'medium',
          reply: 'Thank you for your inquiry! Our hair coloring services start at $120 and yes, we do offer balayage. Would you like to schedule a consultation?',
          starred: true
        },
        {
          id: '3',
          clientName: 'Emily Davis',
          clientEmail: 'emily.davis@email.com',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          subject: 'Amazing Service - Thank You!',
          content: 'I just wanted to say thank you for the wonderful service yesterday. My hair looks amazing and I will definitely be back!',
          timestamp: '2024-04-24 18:20',
          read: false,
          type: 'compliment',
          priority: 'low',
          starred: false
        },
        {
          id: '4',
          clientName: 'Michael Brown',
          clientEmail: 'michael.brown@email.com',
          clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          subject: 'Billing Question',
          content: 'I have a question about my last invoice. The charge seems higher than expected. Could you please clarify?',
          timestamp: '2024-04-24 14:15',
          read: false,
          type: 'complaint',
          priority: 'high',
          starred: false
        },
        {
          id: '5',
          clientName: 'System',
          clientEmail: 'system@bizlisolution.com',
          businessLogo: '/src/assets/bizli-logo.png',
          subject: 'Weekly Business Report',
          content: 'Your weekly business summary is ready. You had 15 appointments this week with a 98% satisfaction rate.',
          timestamp: '2024-04-23 09:00',
          read: true,
          type: 'system',
          priority: 'low',
          starred: false
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced scroll management
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent, messageId: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwipeStates(prev => ({
      ...prev,
      [messageId]: { x: 0, action: 'none' }
    }));
  };

  const handleTouchMove = (e: React.TouchEvent, messageId: string) => {
    if (!touchStartX.current) return;
    
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // Only handle horizontal swipes
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    
    let action: 'none' | 'read' | 'delete' | 'star' = 'none';
    if (deltaX > 80) {
      action = 'read';
    } else if (deltaX < -80) {
      action = 'delete';
    } else if (deltaX > 40) {
      action = 'star';
    }
    
    setSwipeStates(prev => ({
      ...prev,
      [messageId]: { x: deltaX, action }
    }));
  };

  const handleTouchEnd = (messageId: string) => {
    const swipeState = swipeStates[messageId];
    if (!swipeState) return;

    if (swipeState.action === 'read') {
      markAsRead(messageId);
    } else if (swipeState.action === 'delete') {
      deleteMessage(messageId);
    } else if (swipeState.action === 'star') {
      toggleStar(messageId);
    }

    setSwipeStates(prev => ({
      ...prev,
      [messageId]: { x: 0, action: 'none' }
    }));
    touchStartX.current = 0;
    touchStartY.current = 0;
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

  const handleReply = (messageId: string) => {
    setMessages(messages.map(m => 
      m.id === messageId 
        ? { ...m, read: true, reply: replyText }
        : m
    ));
    setReplyText('');
    setSelectedMessage(null);
  };

  // Enhanced filtering
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

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-[#4B2AAD]" />;
      case 'inquiry':
        return <MessageSquare className="w-4 h-4 text-[#10B981]" />;
      case 'complaint':
        return <AlertCircle className="w-4 h-4 text-[#EF4444]" />;
      case 'compliment':
        return <Star className="w-4 h-4 text-[#F59E0B]" />;
      case 'system':
        return <Settings className="w-4 h-4 text-[#64748B]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[#4B2AAD]" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-[#EF4444] bg-[#EF4444]/5';
      case 'medium':
        return 'border-l-[#F59E0B] bg-[#F59E0B]/5';
      case 'low':
        return 'border-l-[#10B981] bg-[#10B981]/5';
      default:
        return 'border-l-[#64748B] bg-[#64748B]/5';
    }
  };

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

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <DashboardLayout>
      {/* Enhanced Header */}
      <DashboardHeader
        title="Messages"
        subtitle="Communicate with your clients"
        actions={
          unreadCount > 0 ? (
            <Badge className="bg-[#EF4444] text-white border-0 px-3 py-1 animate-pulse">
              {unreadCount} unread
            </Badge>
          ) : undefined
        }
      />

      {/* Enhanced Filter Tabs with Tooltips */}
      <DashboardSection variant="minimal" padding="sm">
        <Tabs value={activeFilter} onValueChange={(value: any) => setActiveFilter(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-12 bg-[#F8FAFC]">
            <TabsTrigger value="all" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              All ({getFilterCount('all')})
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span className="hidden sm:inline">Unread</span>
                    <span className="sm:hidden">New</span>
                    ({getFilterCount('unread')})
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Unread Messages</p>
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
            <TabsTrigger value="appointment" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden sm:inline">Appointments</span>
                    <span className="sm:hidden">Appt</span>
                    ({getFilterCount('appointment')})
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Appointment Related</p>
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
            <TabsTrigger value="inquiry" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Megaphone className="w-3 h-3" />
                    <span className="hidden sm:inline">Inquiries</span>
                    <span className="sm:hidden">Info</span>
                    ({getFilterCount('inquiry')})
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Service Inquiries</p>
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
            <TabsTrigger value="starred" className="text-xs sm:text-sm data-[state=active]:bg-[#4B2AAD] data-[state=active]:text-white">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span className="hidden sm:inline">Starred</span>
                    <span className="sm:hidden">★</span>
                    ({getFilterCount('starred')})
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Important Messages</p>
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </DashboardSection>

      {/* Content */}
      <DashboardContent>
        <div 
          ref={scrollContainerRef}
          className="overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 300px)' }}
        >
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

            {/* Swipe Instructions for Mobile */}
            <div className="mt-3 p-3 bg-[#EEF1FF] border border-[#4B2AAD]/20 rounded-lg sm:hidden">
              <p className="text-xs text-[#4B2AAD] text-center">
                💡 Swipe right to mark as read • Swipe left to delete • Tap to view details
              </p>
            </div>
          </DashboardSection>

          {/* Enhanced Messages List */}
          <DashboardSection title="Messages" variant="card" padding="sm">
            <div className="space-y-2 sm:space-y-3">
          {filteredMessages.map((message) => {
            const swipeState = swipeStates[message.id] || { x: 0, action: 'none' };
            
            return (
              <div
                key={message.id}
                className="relative overflow-hidden rounded-lg"
                onTouchStart={(e) => handleTouchStart(e, message.id)}
                onTouchMove={(e) => handleTouchMove(e, message.id)}
                onTouchEnd={() => handleTouchEnd(message.id)}
              >
                {/* Swipe Action Backgrounds */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 bg-[#10B981] flex items-center justify-start pl-6">
                    <Check className="w-6 h-6 text-white" />
                    <span className="text-white font-medium ml-2">Mark Read</span>
                  </div>
                  <div className="w-1/2 bg-[#EF4444] flex items-center justify-end pr-6">
                    <span className="text-white font-medium mr-2">Delete</span>
                    <Trash2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Enhanced Message Card */}
                <Card 
                  className={`
                    relative bg-white border-0 border-l-4 shadow-md transition-all duration-200 cursor-pointer
                    ${getPriorityColor(message.priority)}
                    ${!message.read ? 'ring-2 ring-[#4B2AAD]/20 shadow-lg' : 'opacity-90'}
                    ${selectedMessage?.id === message.id ? 'ring-2 ring-[#4B2AAD] shadow-xl' : ''}
                    hover:shadow-lg hover:scale-[1.01]
                  `}
                  style={{
                    transform: `translateX(${swipeState.x}px)`,
                    transition: swipeState.x === 0 ? 'transform 0.3s ease' : 'none'
                  }}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      {/* Enhanced Avatar with Business Logo Support */}
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-[#4B2AAD]/20 flex-shrink-0">
                        <AvatarImage 
                          src={message.businessLogo || message.clientAvatar} 
                          alt={message.clientName}
                        />
                        <AvatarFallback className="bg-[#4B2AAD]/10 text-[#4B2AAD] font-semibold text-sm">
                          {message.clientName === 'System' ? (
                            <Building2 className="w-4 h-4" />
                          ) : (
                            message.clientName.split(' ').map(n => n[0]).join('')
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        {/* Compact Header */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-semibold text-[#1A1A1A] text-sm sm:text-base truncate">
                                {message.subject}
                              </h3>
                              {!message.read && (
                                <div className="w-2 h-2 bg-[#4B2AAD] rounded-full animate-pulse flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-[#64748B] truncate">
                              {message.clientName} • {new Date(message.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          
                          {/* Priority and Type Indicators */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {getMessageTypeIcon(message.type)}
                            {message.starred && (
                              <Star className="w-3 h-3 text-[#F59E0B] fill-current" />
                            )}
                            {!message.read && (
                              <Badge className="bg-[#4B2AAD] text-white text-xs px-2 py-0.5">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Compact Message Preview */}
                        <p className="text-[#374151] text-xs sm:text-sm line-clamp-2 leading-relaxed mb-2">
                          {message.content}
                        </p>

                        {/* Mobile Action Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-[#64748B]">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {message.reply && (
                              <Badge className="bg-[#10B981]/10 text-[#10B981] text-xs px-2 py-0.5">
                                Replied
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex gap-1 sm:hidden">
                            {!message.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(message.id);
                                }}
                                className="h-7 w-7 p-0 text-[#10B981] hover:bg-[#10B981]/10"
                                aria-label="Mark as read"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(message.id);
                              }}
                              className={`h-7 w-7 p-0 ${message.starred ? 'text-[#F59E0B]' : 'text-[#64748B]'} hover:bg-[#F59E0B]/10`}
                              aria-label={message.starred ? "Remove from starred" : "Add to starred"}
                            >
                              <Star className={`w-3 h-3 ${message.starred ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(message.id);
                              }}
                              className="h-7 w-7 p-0 text-[#EF4444] hover:bg-[#EF4444]/10"
                              aria-label="Delete message"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
            </div>
          </DashboardSection>

          {/* Enhanced Empty State */}
          {filteredMessages.length === 0 && !loading && (
            <DashboardSection title="No Messages" variant="card" padding="lg">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  {activeFilter === 'all' ? 'No messages yet' : `No ${activeFilter} messages`}
                </h3>
                <p className="text-[#64748B] mb-6">
                  {searchTerm 
                    ? 'No messages match your search. Try different keywords.'
                    : activeFilter === 'all'
                      ? 'When clients send you messages, they will appear here.'
                      : `No ${activeFilter} messages at the moment. Check other categories.`
                  }
                </p>
                {(searchTerm || activeFilter !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveFilter('all');
                    }}
                    className="border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </DashboardSection>
          )}

        {/* Message Detail Modal for Mobile */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-left">
                {selectedMessage && getMessageTypeIcon(selectedMessage.type)}
                <span className="truncate">{selectedMessage?.subject}</span>
              </DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                {/* Message Header */}
                <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg">
                  <Avatar className="w-10 h-10 ring-2 ring-[#4B2AAD]/20">
                    <AvatarImage 
                      src={selectedMessage.businessLogo || selectedMessage.clientAvatar} 
                      alt={selectedMessage.clientName}
                    />
                    <AvatarFallback className="bg-[#4B2AAD]/10 text-[#4B2AAD] font-semibold">
                      {selectedMessage.clientName === 'System' ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        selectedMessage.clientName.split(' ').map(n => n[0]).join('')
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#1A1A1A]">{selectedMessage.clientName}</span>
                      {selectedMessage.starred && (
                        <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-[#64748B]">{selectedMessage.clientEmail}</p>
                    <p className="text-xs text-[#64748B] mt-1">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-4 border border-[#E5E7EB] rounded-lg">
                  <p className="text-[#374151] leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>

                {/* Existing Reply */}
                {selectedMessage.reply && (
                  <div className="p-4 border border-[#4B2AAD]/20 bg-[#4B2AAD]/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Reply className="w-4 h-4 text-[#4B2AAD]" />
                      <span className="font-medium text-[#1A1A1A]">Your Reply</span>
                    </div>
                    <p className="text-[#374151] leading-relaxed">
                      {selectedMessage.reply}
                    </p>
                  </div>
                )}

                {/* Reply Form */}
                {!selectedMessage.reply && (
                  <div className="space-y-3 border-t border-[#E5E7EB] pt-4">
                    <Label htmlFor="reply" className="text-sm font-medium text-[#374151]">
                      Reply to {selectedMessage.clientName}
                    </Label>
                    <Textarea
                      id="reply"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={4}
                      className="resize-none border-[#E5E7EB] focus:border-[#4B2AAD]"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleReply(selectedMessage.id)}
                        className="flex-1 bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white h-10"
                        disabled={!replyText.trim()}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toggleStar(selectedMessage.id)}
                        className={`h-10 px-3 ${selectedMessage.starred ? 'border-[#F59E0B] text-[#F59E0B]' : 'border-[#E5E7EB] text-[#64748B]'}`}
                      >
                        <Star className={`w-4 h-4 ${selectedMessage.starred ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  {!selectedMessage.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(selectedMessage.id)}
                      className="border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white shadow-lg z-20"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default BusinessMessages;
