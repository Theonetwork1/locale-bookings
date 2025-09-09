import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search,
  MessageSquare,
  Send,
  Building2,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  businessName: string;
  businessEmail: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  reply?: string;
}

const ClientMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockMessages: Message[] = [
        {
          id: '1',
          businessName: 'Glo Salon',
          businessEmail: 'info@glosalon.com',
          subject: 'Appointment Confirmation',
          content: 'Your appointment for tomorrow at 2 PM has been confirmed. Please arrive 10 minutes early.',
          timestamp: '2024-04-26 10:30',
          read: false
        },
        {
          id: '2',
          businessName: 'Tech Solutions Inc',
          businessEmail: 'contact@techsolutions.com',
          subject: 'Service Update',
          content: 'We have updated our services and pricing. Please check our website for the latest information.',
          timestamp: '2024-04-25 15:45',
          read: true,
          reply: 'Thank you for the update! I will check the website.'
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
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

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground">Communicate with businesses</p>
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
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`shadow-lg border-0 cursor-pointer transition-all ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''
                } ${!message.read ? 'border-l-4 border-l-primary' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-foreground">{message.subject}</h3>
                        {!message.read && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{message.businessName}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{message.content}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
                        <Clock className="w-3 h-3" />
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Message Detail */}
          {selectedMessage && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedMessage.subject}</span>
                  <Badge variant={selectedMessage.read ? 'secondary' : 'default'}>
                    {selectedMessage.read ? 'Read' : 'Unread'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{selectedMessage.businessName}</span>
                    <span className="text-muted-foreground">({selectedMessage.businessEmail})</span>
                  </div>
                  <p className="text-muted-foreground">{selectedMessage.content}</p>
                </div>

                {selectedMessage.reply && (
                  <div className="border rounded-lg p-4 bg-primary/5">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Your Reply</span>
                    </div>
                    <p className="text-muted-foreground">{selectedMessage.reply}</p>
                  </div>
                )}

                {!selectedMessage.reply && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Reply to {selectedMessage.businessName}</label>
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={4}
                    />
                    <Button 
                      onClick={() => handleReply(selectedMessage.id)}
                      className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                      disabled={!replyText.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No messages found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientMessages;
