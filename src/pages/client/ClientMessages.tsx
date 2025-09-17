import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Search,
  MessageSquare,
  Send,
  Building2,
  Clock,
  Eye,
  EyeOff,
  Reply,
  MoreVertical,
  Filter,
  Inbox,
  Calendar,
  Megaphone,
  Settings,
  User,
  ArrowLeft,
  ChevronRight,
  Check,
  CheckCheck
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useLanguage } from '@/contexts/LanguageContext';

interface MessageThread {
  id: string;
  businessId: string;
  businessName: string;
  businessEmail: string;
  businessAvatar?: string;
  subject: string;
  category: 'appointment' | 'promotion' | 'system' | 'business_reply' | 'general';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isRead: boolean;
  messages: Message[];
  priority: 'low' | 'medium' | 'high';
}

interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderType: 'client' | 'business' | 'system';
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

const ClientMessages = () => {
  const t = useTranslations();
  const { language } = useLanguage();
  
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [replyText, setReplyText] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'appointment' | 'promotion' | 'system' | 'business_reply'>('all');
  const [showMobileThreadList, setShowMobileThreadList] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Mock data for demo with threaded conversations
      const mockThreads: MessageThread[] = [
        {
          id: '1',
          businessId: 'biz-1',
          businessName: 'Glo Salon',
          businessEmail: 'info@glosalon.com',
          businessAvatar: '/api/placeholder/40/40',
          subject: 'Appointment Confirmation',
          category: 'appointment',
          lastMessage: 'Your appointment for tomorrow at 2 PM has been confirmed. Please arrive 10 minutes early.',
          lastMessageTime: '2024-04-26 10:30',
          unreadCount: 2,
          isRead: false,
          priority: 'high',
          messages: [
            {
              id: 'msg-1',
              threadId: '1',
              senderId: 'biz-1',
              senderName: 'Glo Salon',
              senderType: 'business',
              content: 'Hello! We have confirmed your appointment for tomorrow at 2 PM. Please arrive 10 minutes early.',
              timestamp: '2024-04-26 10:30',
              isRead: false
            },
            {
              id: 'msg-2',
              threadId: '1',
              senderId: 'biz-1',
              senderName: 'Glo Salon',
              senderType: 'business',
              content: 'Also, please bring a photo of the hairstyle you want if you have one.',
              timestamp: '2024-04-26 10:32',
              isRead: false
            }
          ]
        },
        {
          id: '2',
          businessId: 'biz-2',
          businessName: 'Tech Solutions Inc',
          businessEmail: 'contact@techsolutions.com',
          businessAvatar: '/api/placeholder/40/40',
          subject: 'Service Update',
          category: 'promotion',
          lastMessage: 'We have updated our services and pricing. Please check our website for the latest information.',
          lastMessageTime: '2024-04-25 15:45',
          unreadCount: 0,
          isRead: true,
          priority: 'medium',
          messages: [
            {
              id: 'msg-3',
              threadId: '2',
              senderId: 'biz-2',
              senderName: 'Tech Solutions Inc',
              senderType: 'business',
              content: 'We have updated our services and pricing. Please check our website for the latest information.',
              timestamp: '2024-04-25 15:45',
              isRead: true
            },
            {
              id: 'msg-4',
              threadId: '2',
              senderId: 'client-1',
              senderName: 'You',
              senderType: 'client',
              content: 'Thank you for the update! I will check the website.',
              timestamp: '2024-04-25 16:20',
              isRead: true
            }
          ]
        },
        {
          id: '3',
          businessId: 'biz-3',
          businessName: 'Beauty Studio',
          businessEmail: 'hello@beautystudio.com',
          businessAvatar: '/api/placeholder/40/40',
          subject: 'New Service Available',
          category: 'business_reply',
          lastMessage: 'We now offer microblading services! Book your appointment today.',
          lastMessageTime: '2024-04-24 09:15',
          unreadCount: 1,
          isRead: false,
          priority: 'low',
          messages: [
            {
              id: 'msg-5',
              threadId: '3',
              senderId: 'biz-3',
              senderName: 'Beauty Studio',
              senderType: 'business',
              content: 'We now offer microblading services! Book your appointment today.',
              timestamp: '2024-04-24 09:15',
              isRead: false
            }
          ]
        },
        {
          id: '4',
          businessId: 'system',
          businessName: 'Bizli Solution',
          businessEmail: 'noreply@bizlisolution.com',
          businessAvatar: '/api/placeholder/40/40',
          subject: 'Welcome to Bizli!',
          category: 'system',
          lastMessage: 'Welcome to Bizli Solution! Start exploring local businesses in your area.',
          lastMessageTime: '2024-04-23 14:00',
          unreadCount: 0,
          isRead: true,
          priority: 'low',
          messages: [
            {
              id: 'msg-6',
              threadId: '4',
              senderId: 'system',
              senderName: 'Bizli Solution',
              senderType: 'system',
              content: 'Welcome to Bizli Solution! Start exploring local businesses in your area.',
              timestamp: '2024-04-23 14:00',
              isRead: true
            }
          ]
        }
      ];
      setThreads(mockThreads);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = (threadId: string) => {
    if (!replyText.trim()) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: 'client-1',
      senderName: 'You',
      senderType: 'client',
      content: replyText,
      timestamp: new Date().toLocaleString(),
      isRead: true
    };

    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? {
            ...thread,
            messages: [...thread.messages, newMessage],
            lastMessage: replyText,
            lastMessageTime: newMessage.timestamp,
            unreadCount: 0,
            isRead: true
          }
        : thread
    ));
    
    setReplyText('');
  };

  const markAsRead = (threadId: string) => {
    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, isRead: true, unreadCount: 0, messages: thread.messages.map(msg => ({ ...msg, isRead: true })) }
        : thread
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'promotion': return <Megaphone className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'business_reply': return <Reply className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'appointment': return t.messageAppointments || 'Appointments';
      case 'promotion': return t.messagePromotions || 'Promotions';
      case 'system': return t.messageSystem || 'System';
      case 'business_reply': return t.messageBusinessReplies || 'Business Replies';
      default: return t.messageGeneral || 'General';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || thread.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = threads.reduce((total, thread) => total + thread.unreadCount, 0);

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#4B2AAD] to-[#A68BFA] items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <div className="w-6 h-6 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {t.loadingMessages || 'Loading messages...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B2AAD] to-[#A68BFA]">
      {/* Header */}
      <div className="bg-[#4B2AAD] p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back || 'Back'}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.messages || 'Messages'}</h1>
            <p className="text-white/80">{unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-[#F97316] text-white">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6">
        <Card className="bg-white/95 border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="flex h-[600px]">
              {/* Thread List - Hidden on mobile when viewing thread */}
              <div className={`${showMobileThreadList ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/3 border-r border-gray-200`}>
                {/* Search and Filters */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder={t.searchMessages || 'Search messages...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as any)}>
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="all" className="text-xs">
                        {t.allMessages || 'All'}
                      </TabsTrigger>
                      <TabsTrigger value="appointment" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                      </TabsTrigger>
                      <TabsTrigger value="promotion" className="text-xs">
                        <Megaphone className="w-3 h-3 mr-1" />
                      </TabsTrigger>
                      <TabsTrigger value="system" className="text-xs">
                        <Settings className="w-3 h-3 mr-1" />
                      </TabsTrigger>
                      <TabsTrigger value="business_reply" className="text-xs">
                        <Reply className="w-3 h-3 mr-1" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Thread List */}
                <ScrollArea className="flex-1">
                  {filteredThreads.length > 0 ? (
                    <div className="space-y-1">
                      {filteredThreads.map((thread) => (
                        <div
                          key={thread.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                            selectedThread?.id === thread.id 
                              ? 'bg-[#EEF1FF] border-l-[#4B2AAD]' 
                              : thread.unreadCount > 0 
                                ? 'border-l-[#F97316]' 
                                : 'border-l-transparent'
                          }`}
                          onClick={() => {
                            setSelectedThread(thread);
                            setShowMobileThreadList(false);
                            markAsRead(thread.id);
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={thread.businessAvatar} />
                              <AvatarFallback className="bg-[#4B2AAD]/10 text-[#4B2AAD]">
                                {thread.businessName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-[#1A1A1A] truncate">
                                  {thread.businessName}
                                </h3>
                                <div className="flex items-center space-x-1">
                                  {thread.unreadCount > 0 && (
                                    <Badge variant="secondary" className="bg-[#F97316] text-white text-xs">
                                      {thread.unreadCount}
                                    </Badge>
                                  )}
                                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(thread.priority)}`} />
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-1">
                                {getCategoryIcon(thread.category)}
                                <span className="text-sm text-gray-600 truncate">
                                  {thread.subject}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                                {thread.lastMessage}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                  {thread.lastMessageTime}
                                </span>
                                <div className="flex items-center space-x-1">
                                  {thread.isRead ? (
                                    <CheckCheck className="w-3 h-3 text-blue-500" />
                                  ) : (
                                    <Check className="w-3 h-3 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <Inbox className="w-16 h-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                        {t.noMessagesFound || 'No messages found'}
                      </h3>
                      <p className="text-gray-600">
                        {searchTerm 
                          ? t.tryDifferentSearchMessages || 'Try a different search term'
                          : t.noMessagesYet || 'You don\'t have any messages yet'
                        }
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </div>

              {/* Thread View */}
              <div className={`${!showMobileThreadList ? 'flex' : 'hidden'} md:flex flex-col flex-1`}>
                {selectedThread ? (
                  <>
                    {/* Thread Header */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setShowMobileThreadList(true)}
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedThread.businessAvatar} />
                            <AvatarFallback className="bg-[#4B2AAD]/10 text-[#4B2AAD]">
                              {selectedThread.businessName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="font-semibold text-[#1A1A1A]">{selectedThread.businessName}</h2>
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(selectedThread.category)}
                              <span className="text-sm text-gray-600">{selectedThread.subject}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-[#4B2AAD] border-[#4B2AAD]">
                            {getCategoryLabel(selectedThread.category)}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedThread.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderType === 'client' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[70%] ${message.senderType === 'client' ? 'order-2' : 'order-1'}`}>
                              <div className={`rounded-lg p-3 ${
                                message.senderType === 'client' 
                                  ? 'bg-[#4B2AAD] text-white' 
                                  : message.senderType === 'system'
                                    ? 'bg-gray-100 text-gray-700'
                                    : 'bg-gray-50 text-gray-900'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <div className={`flex items-center space-x-1 mt-1 ${
                                message.senderType === 'client' ? 'justify-end' : 'justify-start'
                              }`}>
                                <span className="text-xs text-gray-500">{message.timestamp}</span>
                                {message.senderType === 'client' && (
                                  <div className="flex items-center space-x-1">
                                    {message.isRead ? (
                                      <CheckCheck className="w-3 h-3 text-blue-500" />
                                    ) : (
                                      <Check className="w-3 h-3 text-gray-400" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Reply Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder={t.typeYourMessage || 'Type your message...'}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleReply(selectedThread.id);
                            }
                          }}
                        />
                        <Button
                          onClick={() => handleReply(selectedThread.id)}
                          disabled={!replyText.trim()}
                          className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                      {t.selectAMessage || 'Select a message'}
                    </h3>
                    <p className="text-gray-600">
                      {t.selectMessageToView || 'Choose a message from the list to start a conversation'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientMessages;