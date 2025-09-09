import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Search,
  MessageSquare,
  User,
  Building2,
  Clock,
  Eye,
  EyeOff,
  Reply,
  Trash2,
  Archive,
  Filter,
  Send,
  Calendar,
  Mail,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  senderType: 'client' | 'business';
  recipientName: string;
  recipientEmail: string;
  recipientType: 'client' | 'business';
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  archived: boolean;
  priority: 'low' | 'medium' | 'high';
  conversation: {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isAdmin?: boolean;
  }[];
}

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'client' | 'business'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Mock data for demo with full conversations
      const mockMessages: Message[] = [
        {
          id: '1',
          senderName: 'John Smith',
          senderEmail: 'john@email.com',
          senderType: 'client',
          recipientName: 'Glo Salon',
          recipientEmail: 'info@glosalon.com',
          recipientType: 'business',
          subject: 'Appointment Rescheduling Request',
          content: 'Hi, I need to reschedule my appointment tomorrow due to an emergency. Could we move it to next week?',
          timestamp: '2024-04-26 10:30:00',
          read: false,
          archived: false,
          priority: 'high',
          conversation: [
            {
              id: 'msg-1-1',
              sender: 'John Smith',
              content: 'Hi, I need to reschedule my appointment tomorrow due to an emergency. Could we move it to next week?',
              timestamp: '2024-04-26 10:30:00'
            },
            {
              id: 'msg-1-2',
              sender: 'Glo Salon',
              content: 'Hi John! No problem at all. I have availability next Tuesday at 2 PM or Wednesday at 10 AM. Which works better for you?',
              timestamp: '2024-04-26 11:15:00'
            },
            {
              id: 'msg-1-3',
              sender: 'John Smith',
              content: 'Tuesday at 2 PM would be perfect! Thank you for being so flexible.',
              timestamp: '2024-04-26 11:45:00'
            }
          ]
        },
        {
          id: '2',
          senderName: 'Elite Fitness Center',
          senderEmail: 'info@elitefitness.com',
          senderType: 'business',
          recipientName: 'Mike Wilson',
          recipientEmail: 'mike@email.com',
          recipientType: 'client',
          subject: 'New Membership Benefits Available',
          content: 'We have updated our membership packages with exciting new benefits including access to our premium equipment...',
          timestamp: '2024-04-25 15:45:00',
          read: true,
          archived: false,
          priority: 'medium',
          conversation: [
            {
              id: 'msg-2-1',
              sender: 'Elite Fitness Center',
              content: 'We have updated our membership packages with exciting new benefits including access to our premium equipment and personal training sessions.',
              timestamp: '2024-04-25 15:45:00'
            },
            {
              id: 'msg-2-2',
              sender: 'Mike Wilson',
              content: 'That sounds great! Can you send me more details about the personal training sessions?',
              timestamp: '2024-04-25 16:20:00'
            }
          ]
        },
        {
          id: '3',
          senderName: 'Sarah Davis',
          senderEmail: 'sarah@email.com',
          senderType: 'client',
          recipientName: 'Zen Wellness Studio',
          recipientEmail: 'hello@zenwell.com',
          recipientType: 'business',
          subject: 'Payment Issue',
          content: 'I\'m having trouble with the payment for my spa package. The transaction failed twice.',
          timestamp: '2024-04-24 09:15:00',
          read: true,
          archived: false,
          priority: 'high',
          conversation: [
            {
              id: 'msg-3-1',
              sender: 'Sarah Davis',
              content: 'I\'m having trouble with the payment for my spa package. The transaction failed twice.',
              timestamp: '2024-04-24 09:15:00'
            },
            {
              id: 'msg-3-2',
              sender: 'Zen Wellness Studio',
              content: 'Hi Sarah, I\'m sorry to hear about the payment issues. Let me check with our payment processor and get back to you.',
              timestamp: '2024-04-24 10:30:00'
            },
            {
              id: 'msg-3-3',
              sender: 'Admin Support',
              content: 'Hi Sarah, this is Bizli Solution support. We\'ve identified and fixed the payment gateway issue. Please try again.',
              timestamp: '2024-04-24 14:20:00',
              isAdmin: true
            }
          ]
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (messageId: string, read: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read } : msg
      )
    );
    
    toast({
      title: read ? 'Marked as Read' : 'Marked as Unread',
      description: `Message has been ${read ? 'marked as read' : 'marked as unread'}.`
    });
  };

  const handleArchive = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, archived: true } : msg
      )
    );
    
    toast({
      title: 'Message Archived',
      description: 'The message has been moved to archives.'
    });
  };

  const handleDelete = (messageId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this message? This action cannot be undone.')) {
      return;
    }

    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    
    toast({
      title: 'Message Deleted',
      description: 'The message has been permanently deleted.'
    });
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) {
      toast({
        title: 'Missing Content',
        description: 'Please enter a reply message.',
        variant: 'destructive'
      });
      return;
    }

    setSending(true);
    try {
      // Add reply to conversation
      const newReply = {
        id: `reply-${Date.now()}`,
        sender: 'Admin Support',
        content: replyText,
        timestamp: new Date().toISOString(),
        isAdmin: true
      };

      setMessages(prev => 
        prev.map(msg => 
          msg.id === selectedMessage.id 
            ? { 
                ...msg, 
                conversation: [...msg.conversation, newReply],
                read: true
              }
            : msg
        )
      );

      setReplyText('');
      
      toast({
        title: 'Reply Sent!',
        description: 'Your message has been sent to both parties.'
      });

    } catch (error) {
      console.error('Reply error:', error);
      toast({
        title: 'Send Failed',
        description: 'Unable to send reply. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
    }
  };

  const openConversation = (message: Message) => {
    setSelectedMessage(message);
    setConversationOpen(true);
    
    // Mark as read when opened
    if (!message.read) {
      handleMarkAsRead(message.id, true);
    }
  };

  // Filter messages based on search and filters
  const filteredMessages = messages.filter(message => {
    if (message.archived && statusFilter !== 'archived') return false;
    
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.senderEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'unread' && !message.read) ||
      (statusFilter === 'read' && message.read) ||
      (statusFilter === 'archived' && message.archived);
    
    const matchesType = 
      typeFilter === 'all' || 
      message.senderType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getMessageStats = () => {
    const total = messages.filter(m => !m.archived).length;
    const unread = messages.filter(m => !m.read && !m.archived).length;
    const archived = messages.filter(m => m.archived).length;
    const highPriority = messages.filter(m => m.priority === 'high' && !m.archived).length;
    
    return { total, unread, archived, highPriority };
  };

  const stats = getMessageStats();

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-muted-foreground">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Message Management</h1>
          <p className="text-muted-foreground">Monitor and manage all platform communications</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Messages</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#F97316]">{stats.unread}</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{stats.highPriority}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{stats.archived}</div>
            <div className="text-sm text-muted-foreground">Archived</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by keywords, names, emails, or dates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="client">From Clients</SelectItem>
                  <SelectItem value="business">From Businesses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Platform Messages ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {messages.length === 0 ? 'No messages yet' : 'No messages match your filters'}
              </h3>
              <p className="text-muted-foreground">
                {messages.length === 0 
                  ? 'Platform messages will appear here as users communicate'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/50 ${
                    !message.read 
                      ? 'bg-primary/5 border-primary/20 border-l-4 border-l-[#F97316]' 
                      : 'bg-muted/30 border-border/50'
                  }`}
                  onClick={() => openConversation(message)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Message Header */}
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {message.senderType === 'client' ? (
                            <User className="w-4 h-4 text-secondary" />
                          ) : (
                            <Building2 className="w-4 h-4 text-primary" />
                          )}
                          <span className="font-medium text-foreground">{message.senderName}</span>
                          <span className="text-muted-foreground text-sm">({message.senderEmail})</span>
                        </div>
                        <span className="text-muted-foreground">→</span>
                        <div className="flex items-center space-x-2">
                          {message.recipientType === 'client' ? (
                            <User className="w-4 h-4 text-secondary" />
                          ) : (
                            <Building2 className="w-4 h-4 text-primary" />
                          )}
                          <span className="font-medium text-foreground">{message.recipientName}</span>
                        </div>
                      </div>

                      {/* Message Content */}
                      <h3 className="text-lg font-semibold text-foreground mb-2">{message.subject}</h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{message.content}</p>
                      
                      {/* Message Meta */}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(message.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {message.conversation.length} messages
                        </div>
                      </div>
                    </div>

                    {/* Message Actions and Status */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        {!message.read && (
                          <Badge variant="secondary" className="bg-[#F97316] text-white">
                            New
                          </Badge>
                        )}
                        {message.priority === 'high' && (
                          <Badge variant="destructive">
                            High Priority
                          </Badge>
                        )}
                        {message.archived && (
                          <Badge variant="outline">
                            Archived
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(message.id, !message.read);
                          }}
                          className="hover:bg-primary/10 hover:text-primary"
                          title={message.read ? 'Mark as unread' : 'Mark as read'}
                        >
                          {message.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchive(message.id);
                          }}
                          className="hover:bg-warning/10 hover:text-warning"
                          title="Archive message"
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                          className="hover:bg-destructive/10 hover:text-destructive"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversation Modal */}
      <Dialog open={conversationOpen} onOpenChange={setConversationOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {selectedMessage?.subject}
            </DialogTitle>
            {selectedMessage && (
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  {selectedMessage.senderType === 'client' ? (
                    <User className="w-4 h-4 mr-1" />
                  ) : (
                    <Building2 className="w-4 h-4 mr-1" />
                  )}
                  {selectedMessage.senderName}
                </div>
                <span>↔</span>
                <div className="flex items-center">
                  {selectedMessage.recipientType === 'client' ? (
                    <User className="w-4 h-4 mr-1" />
                  ) : (
                    <Building2 className="w-4 h-4 mr-1" />
                  )}
                  {selectedMessage.recipientName}
                </div>
              </div>
            )}
          </DialogHeader>

          {selectedMessage && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Conversation Thread */}
              <div className="flex-1 overflow-y-auto p-4 bg-muted/20 rounded-lg mb-4">
                <div className="space-y-4">
                  {selectedMessage.conversation.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-lg ${
                        msg.isAdmin 
                          ? 'bg-[#F97316] text-white ml-4' 
                          : msg.sender === selectedMessage.senderName
                          ? 'bg-primary/10 border border-primary/20'
                          : 'bg-secondary/10 border border-secondary/20'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-sm">
                            {msg.isAdmin ? 'Admin Support' : msg.sender}
                          </div>
                          <div className="text-xs opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Section */}
              <div className="space-y-4">
                <Separator />
                <div>
                  <Label htmlFor="reply-message" className="text-sm font-medium">
                    Reply as Admin Support
                  </Label>
                  <Textarea
                    id="reply-message"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsRead(selectedMessage.id, !selectedMessage.read)}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      {selectedMessage.read ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                      {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleArchive(selectedMessage.id);
                        setConversationOpen(false);
                      }}
                      className="hover:bg-warning/10 hover:text-warning"
                    >
                      <Archive className="w-4 h-4 mr-1" />
                      Archive
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleDelete(selectedMessage.id);
                        setConversationOpen(false);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleReply}
                    disabled={sending || !replyText.trim()}
                    className="bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
                  >
                    {sending ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;