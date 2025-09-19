import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  User, 
  Check, 
  Trash2,
  Calendar,
  DollarSign,
  Star,
  Users,
  Settings,
  Info
} from 'lucide-react';

interface NotificationCardProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: 'appointment' | 'payment' | 'review' | 'system' | 'client';
    priority: 'low' | 'medium' | 'high';
    timestamp: string;
    read: boolean;
    actionRequired?: boolean;
    relatedEntity?: {
      type: 'client' | 'appointment' | 'payment';
      id: string;
      name: string;
    };
  };
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (notification: any) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
  onDelete,
  onClick
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5 text-[#4B2AAD]" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-[#4B2AAD]" />;
      case 'review':
        return <Star className="w-5 h-5 text-[#4B2AAD]" />;
      case 'client':
        return <Users className="w-5 h-5 text-[#4B2AAD]" />;
      case 'system':
        return <Settings className="w-5 h-5 text-[#4B2AAD]" />;
      default:
        return <Info className="w-5 h-5 text-[#4B2AAD]" />;
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
      className={`bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${!notification.read ? 'ring-1 ring-[#4B2AAD]/20' : ''}`}
      onClick={() => onClick(notification)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center flex-shrink-0">
            {getTypeIcon(notification.type)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-[#1A1A1A] text-sm leading-tight">
                {notification.title}
              </h3>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                {!notification.read && (
                  <div className="w-2 h-2 bg-[#4B2AAD] rounded-full"></div>
                )}
                <Badge className={`${getPriorityBadge(notification.priority)} text-xs px-2 py-1`}>
                  {notification.priority}
                </Badge>
              </div>
            </div>

            {/* Message Content */}
            <p className="text-sm text-[#374151] line-clamp-2 mb-2">
              {notification.message}
            </p>

            {/* Time and Entity Info */}
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
              <Clock className="w-3 h-3" />
              <span>{new Date(notification.timestamp).toLocaleString()}</span>
              {notification.relatedEntity && (
                <>
                  <span>•</span>
                  <User className="w-3 h-3" />
                  <span>{notification.relatedEntity.name}</span>
                </>
              )}
            </div>

            {/* Action Required Badge */}
            {notification.actionRequired && (
              <div className="mb-3">
                <Badge className="bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 text-xs px-2 py-1">
                  Action Required
                </Badge>
              </div>
            )}

            {/* Action Buttons - Clean Design */}
            <div className="flex gap-2">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(notification.id);
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
                  onDelete(notification.id);
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
