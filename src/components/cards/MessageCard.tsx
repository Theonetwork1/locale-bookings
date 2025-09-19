import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  User, 
  Star, 
  Check, 
  Trash2,
  Eye,
  MessageSquare,
  Calendar,
  Megaphone,
  Settings,
  Building2
} from 'lucide-react';

interface MessageCardProps {
  message: {
    id: string;
    clientName: string;
    clientAvatar?: string;
    businessLogo?: string;
    subject: string;
    content: string;
    timestamp: string;
    read: boolean;
    type: 'appointment' | 'inquiry' | 'complaint' | 'compliment' | 'system';
    priority: 'low' | 'medium' | 'high';
    starred?: boolean;
  };
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onClick: (message: any) => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onMarkRead,
  onDelete,
  onToggleStar,
  onClick
}) => {
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

  const getPriorityBadge = (priority: string) => {
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

  return (
    <Card 
      className={`bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${!message.read ? 'ring-1 ring-[#4B2AAD]/20' : ''}`}
      onClick={() => onClick(message)}
    >
      <CardContent className="p-4">
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
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {getTypeIcon(message.type)}
                <h3 className="font-semibold text-[#1A1A1A] text-sm truncate">
                  {message.subject}
                </h3>
                {!message.read && (
                  <div className="w-2 h-2 bg-[#4B2AAD] rounded-full flex-shrink-0"></div>
                )}
              </div>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                {message.starred && (
                  <Star className="w-3 h-3 text-[#F59E0B] fill-current" />
                )}
                <Badge className={`${getPriorityBadge(message.priority)} text-xs px-2 py-1`}>
                  {message.priority}
                </Badge>
              </div>
            </div>

            {/* Client and Time */}
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2">
              <span className="font-medium">{message.clientName}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{new Date(message.timestamp).toLocaleString()}</span>
            </div>

            {/* Message Preview */}
            <p className="text-sm text-[#374151] line-clamp-2 mb-3">
              {message.content}
            </p>

            {/* Action Buttons - Clean Design */}
            <div className="flex gap-2">
              {!message.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(message.id);
                  }}
                  className="text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#4B2AAD]"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark Read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(message.id);
                }}
                className={`${message.starred ? 'text-[#F59E0B]' : 'text-[#64748B]'} hover:bg-[#F8FAFC]`}
              >
                <Star className={`w-3 h-3 mr-1 ${message.starred ? 'fill-current' : ''}`} />
                {message.starred ? 'Starred' : 'Star'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(message.id);
                }}
                className="text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#EF4444]"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
