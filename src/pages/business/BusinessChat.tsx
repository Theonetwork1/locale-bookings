import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle,
  Send,
  User,
  Clock,
  Phone,
  Video
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'client' | 'business';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface ChatSession {
  id: string;
  clientName: string;
  clientEmail: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isActive: boolean;
}

const BusinessChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatSessions();
  }, []);

  const fetchChatSessions = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockSessions: ChatSession[] = [
        {
          id: '1',
          clientName: 'John Smith',
          clientEmail: 'john@email.com',
          lastMessage: 'Thank you for the great service!',
          lastMessageTime: '2024-04-26 14:30',
          unreadCount: 0,
          isActive: true
        },
        {
          id: '2',
          clientName: 'Sarah Johnson',
          clientEmail: 'sarah@email.com',
          lastMessage: 'Can I reschedule my appointment?',
          lastMessageTime: '2024-04-26 10:15',
          unreadCount: 2,
          isActive: false
        }
      ];
      setSessions(mockSessions);
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    // Mock messages for demo
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        sender: 'client',
        senderName: 'John Smith',
        message: 'Hi, I have a question about my appointment',
        timestamp: '2024-04-26 14:25',
        read: true
      },
      {
        id: '2',
        sender: 'business',
        senderName: 'You',
        message: 'Hello! How can I help you?',
        timestamp: '2024-04-26 14:26',
        read: true
      },
      {
        id: '3',
        sender: 'client',
        senderName: 'John Smith',
        message: 'Thank you for the great service!',
        timestamp: '2024-04-26 14:30',
        read: true
      }
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedSession) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'business',
      senderName: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      read: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSession(sessionId);
    fetchMessages(sessionId);
    // Mark messages as read
    setSessions(sessions.map(s => 
      s.id === sessionId ? { ...s, unreadCount: 0 } : s
    ));
  };

  const selectedSessionData = sessions.find(s => s.id === selectedSession);

  if (loading) {
    return (
      <div className="flex h-screen bg-muted items-center justify-center">
        <div className="text-xl">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Live Chat</h1>
            <p className="text-muted-foreground">Communicate with your clients in real-time</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Sessions List */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Active Chats</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedSession === session.id ? 'bg-primary/10 border-r-2 border-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleSessionSelect(session.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{session.clientName}</p>
                          <p className="text-xs text-muted-foreground">{session.clientEmail}</p>
                        </div>
                      </div>
                      {session.unreadCount > 0 && (
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">
                          {session.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{session.lastMessage}</p>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.lastMessageTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <div className="lg:col-span-2">
            {selectedSession ? (
              <Card className="shadow-lg border-0 h-full flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedSessionData?.clientName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{selectedSessionData?.clientEmail}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'business'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-primary hover:bg-primary-dark text-primary-foreground"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select a chat</h3>
                  <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessChat;
