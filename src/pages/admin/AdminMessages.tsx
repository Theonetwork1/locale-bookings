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
  Building2,
  Clock,
  Send,
  Shield,
  AlertTriangle,
  CheckCircle,
  Plus,
  Megaphone,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// NOUVEAU: Interface pour messages admin-business SEULEMENT
interface AdminMessage {
  id: string;
  businessName: string;
  businessEmail: string;
  businessId: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  type: 'support' | 'notification' | 'announcement';
  conversation: {
    id: string;
    sender: 'admin' | 'business';
    senderName: string;
    content: string;
    timestamp: string;
  }[];
}

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'support' | 'notification' | 'announcement'>('all');
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessageForm, setNewMessageForm] = useState({
    businessId: '',
    subject: '',
    content: '',
    type: 'support' as 'support' | 'notification' | 'announcement',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  useEffect(() => {
    fetchAdminMessages();
  }, []);

  const fetchAdminMessages = async () => {
    try {
      setLoading(true);
      // SEULEMENT les communications admin-business (support, notifications)
      // AUCUN accès aux messages privés client-business
      const mockAdminMessages: AdminMessage[] = [
        {
          id: '1',
          businessName: 'Glo Salon',
          businessEmail: 'info@glosalon.com',
          businessId: 'bus-1',
          subject: 'Account Verification Required',
          content: 'Please provide additional business verification documents to complete your account setup.',
          timestamp: '2024-04-26 09:00:00',
          read: false,
          priority: 'high',
          type: 'support',
          conversation: [
            {
              id: 'admin-1-1',
              sender: 'admin',
              senderName: 'Bizli Support',
              content: 'Please provide additional business verification documents to complete your account setup.',
              timestamp: '2024-04-26 09:00:00'
            }
          ]
        },
        {
          id: '2',
          businessName: 'Elite Fitness Center',
          businessEmail: 'contact@elitefitness.com',
          businessId: 'bus-2',
          subject: 'Subscription Payment Issue',
          content: 'Your subscription payment has failed. Please update your payment method to continue service.',
          timestamp: '2024-04-25 14:30:00',
          read: true,
          priority: 'medium',
          type: 'notification',
          conversation: [
            {
              id: 'admin-2-1',
              sender: 'admin',
              senderName: 'Bizli Support',
              content: 'Your subscription payment has failed. Please update your payment method to continue service.',
              timestamp: '2024-04-25 14:30:00'
            },
            {
              id: 'admin-2-2',
              sender: 'business',
              senderName: 'Elite Fitness Center',
              content: 'Thank you for the notification. I have updated the payment method successfully.',
              timestamp: '2024-04-25 16:45:00'
            },
            {
              id: 'admin-2-3',
              sender: 'admin',
              senderName: 'Bizli Support',
              content: 'Perfect! Your subscription is now active again. Thank you for resolving this quickly.',
              timestamp: '2024-04-25 17:00:00'
            }
          ]
        },
        {
          id: '3',
          businessName: 'All Businesses',
          businessEmail: 'platform-announcement',
          businessId: 'all',
          subject: 'Platform Update: New Features Available',
          content: 'We have released new features including advanced analytics and improved booking system.',
          timestamp: '2024-04-24 10:00:00',
          read: true,
          priority: 'low',
          type: 'announcement',
          conversation: [
            {
              id: 'admin-3-1',
              sender: 'admin',
              senderName: 'Bizli Team',
              content: 'We have released new features including advanced analytics and improved booking system. Check your dashboard for updates!',
              timestamp: '2024-04-24 10:00:00'
            }
          ]
        }
      ];
      setMessages(mockAdminMessages);
    } catch (error) {
      console.error('Error fetching admin messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    setSending(true);
    try {
      const newReply = {
        id: `reply-${Date.now()}`,
        sender: 'admin' as const,
        senderName: 'Bizli Support',
        content: replyText,
        timestamp: new Date().toISOString()
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
        description: 'Your message has been sent to the business.'
      });

    } catch (error) {
      toast({
        title: 'Send Failed',
        description: 'Unable to send reply. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
    }
  };

  const handleSendNewMessage = async () => {
    if (!newMessageForm.businessId || !newMessageForm.subject || !newMessageForm.content) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const newMessage: AdminMessage = {
      id: Date.now().toString(),
      businessName: newMessageForm.businessId === 'all' ? 'All Businesses' : 'Selected Business',
      businessEmail: newMessageForm.businessId === 'all' ? 'platform-announcement' : 'business@example.com',
      businessId: newMessageForm.businessId,
      subject: newMessageForm.subject,
      content: newMessageForm.content,
      timestamp: new Date().toISOString(),
      read: false,
      priority: newMessageForm.priority,
      type: newMessageForm.type,
      conversation: [
        {
          id: `msg-${Date.now()}`,
          sender: 'admin',
          senderName: 'Bizli Support',
          content: newMessageForm.content,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setMessages([newMessage, ...messages]);
    setNewMessageForm({
      businessId: '',
      subject: '',
      content: '',
      type: 'support',
      priority: 'medium'
    });
    setShowNewMessage(false);

    toast({
      title: 'Message Sent!',
      description: `${newMessageForm.type === 'announcement' ? 'Announcement' : 'Message'} sent successfully.`
    });
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'unread' && !message.read) ||
      (statusFilter === 'read' && message.read);
    
    const matchesType = 
      typeFilter === 'all' || 
      message.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-muted-foreground">Loading admin messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-white min-h-screen">
      {/* Security Notice */}
      <Alert className="mb-6 border-[#4B2AAD] bg-[#EEF1FF]">
        <Shield className="h-4 w-4 text-[#4B2AAD]" />
        <AlertDescription className="text-[#1A1A1A]">
          <strong>Privacy Notice:</strong> Admin access is limited to platform communications only. 
          Client-business private messages are not accessible to maintain confidentiality.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Admin Communications</h1>
          <p className="text-gray-600">Manage platform notifications and business support</p>
        </div>
        <Dialog open={showNewMessage} onOpenChange={setShowNewMessage}>
          <DialogTrigger asChild>
            <Button className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message to Business</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-select">Business</Label>
                <Select value={newMessageForm.businessId} onValueChange={(value) => setNewMessageForm({...newMessageForm, businessId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Businesses (Announcement)</SelectItem>
                    <SelectItem value="bus-1">Glo Salon</SelectItem>
                    <SelectItem value="bus-2">Elite Fitness Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message-type">Message Type</Label>
                <Select value={newMessageForm.type} onValueChange={(value: 'support' | 'notification' | 'announcement') => setNewMessageForm({...newMessageForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support Request</SelectItem>
                    <SelectItem value="notification">System Notification</SelectItem>
                    <SelectItem value="announcement">Platform Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newMessageForm.subject}
                  onChange={(e) => setNewMessageForm({...newMessageForm, subject: e.target.value})}
                  placeholder="Enter message subject"
                />
              </div>
              <div>
                <Label htmlFor="content">Message</Label>
                <Textarea
                  id="content"
                  value={newMessageForm.content}
                  onChange={(e) => setNewMessageForm({...newMessageForm, content: e.target.value})}
                  placeholder="Enter your message content"
                  rows={4}
                />
              </div>
              <Button onClick={handleSendNewMessage} className="w-full bg-[#4B2AAD] hover:bg-[#A68BFA] text-white">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{messages.length}</div>
            <div className="text-sm text-muted-foreground">Admin Messages</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#4B2AAD]">{messages.filter(m => !m.read).length}</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{messages.filter(m => m.priority === 'high').length}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{messages.filter(m => m.type === 'announcement').length}</div>
            <div className="text-sm text-muted-foreground">Announcements</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search admin messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={(value: 'all' | 'unread' | 'read') => setStatusFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={typeFilter} onValueChange={(value: 'all' | 'support' | 'notification' | 'announcement') => setTypeFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="notification">Notifications</SelectItem>
                  <SelectItem value="announcement">Announcements</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Admin Communications ({filteredMessages.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Platform support and business communications only. Client-business messages remain private.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No admin messages found
              </h3>
              <p className="text-muted-foreground">
                Admin communications with businesses will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/50 ${
                    !message.read 
                      ? 'bg-[#EEF1FF] border-[#4B2AAD]/20 border-l-4 border-l-[#4B2AAD]' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    setConversationOpen(true);
                    if (!message.read) {
                      setMessages(prev => prev.map(m => m.id === message.id ? {...m, read: true} : m));
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {message.type === 'announcement' ? (
                            <Megaphone className="w-4 h-4 text-[#4B2AAD]" />
                          ) : message.type === 'notification' ? (
                            <AlertTriangle className="w-4 h-4 text-warning" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-[#4B2AAD]" />
                          )}
                          <span className="font-medium text-[#1A1A1A]">{message.businessName}</span>
                        </div>
                        <Badge variant={
                          message.type === 'announcement' ? 'secondary' :
                          message.type === 'notification' ? 'destructive' : 'default'
                        }>
                          {message.type}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{message.subject}</h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{message.content}</p>
                      
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
                          <Users className="w-4 h-4 mr-1" />
                          {message.conversation.length} replies
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      {!message.read && (
                        <Badge variant="secondary" className="bg-[#4B2AAD] text-white">
                          New
                        </Badge>
                      )}
                      {message.priority === 'high' && (
                        <Badge variant="destructive">
                          High Priority
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversation Dialog */}
      <Dialog open={conversationOpen} onOpenChange={setConversationOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {selectedMessage?.subject}
            </DialogTitle>
            {selectedMessage && (
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  {selectedMessage.businessName}
                </div>
                <Badge variant={
                  selectedMessage.type === 'announcement' ? 'secondary' :
                  selectedMessage.type === 'notification' ? 'destructive' : 'default'
                }>
                  {selectedMessage.type}
                </Badge>
              </div>
            )}
          </DialogHeader>

          {selectedMessage && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Conversation Thread */}
              <div className="flex-1 overflow-y-auto p-4 bg-muted/20 rounded-lg mb-4">
                <div className="space-y-4">
                  {selectedMessage.conversation.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-lg ${
                        msg.sender === 'admin'
                          ? 'bg-[#4B2AAD] text-white ml-4' 
                          : 'bg-primary/10 border border-primary/20'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-sm">
                            {msg.senderName}
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
                    Reply as Bizli Support
                  </Label>
                  <Textarea
                    id="reply-message"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    rows={3}
                    className="mt-2"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleSendReply}
                    disabled={sending || !replyText.trim()}
                    className="bg-[#4B2AAD] hover:bg-[#A68BFA] text-white transition-all duration-200"
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