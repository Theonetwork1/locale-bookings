import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  MapPin, 
  Star, 
  RotateCcw, 
  Check, 
  X,
  CheckCircle,
  XCircle,
  Hourglass,
  AlertCircle
} from 'lucide-react';

interface AppointmentCardProps {
  appointment: {
    id: string;
    clientName: string;
    clientAvatar?: string;
    serviceName: string;
    duration: number;
    price: number;
    time: string;
    endTime: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    location?: string;
    priority?: 'low' | 'medium' | 'high';
  };
  onReschedule: (id: string) => void;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onReschedule,
  onComplete,
  onCancel
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#10B981] text-white';
      case 'pending':
        return 'bg-[#F59E0B] text-white';
      case 'cancelled':
        return 'bg-[#EF4444] text-white';
      case 'completed':
        return 'bg-[#4B2AAD] text-white';
      default:
        return 'bg-[#64748B] text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Hourglass className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
    <Card className="bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Client Avatar */}
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={appointment.clientAvatar} alt={appointment.clientName} />
            <AvatarFallback className="bg-[#F3F4F6] text-[#64748B] font-semibold">
              {appointment.clientName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            {/* Client Name and Status */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold text-[#1A1A1A] text-base truncate">
                {appointment.clientName}
              </h3>
              <Badge className={`${getStatusColor(appointment.status)} text-xs px-3 py-1 flex items-center gap-1`}>
                {getStatusIcon(appointment.status)}
                {appointment.status}
              </Badge>
            </div>

            {/* Service */}
            <p className="text-sm text-[#64748B] truncate mb-2">
              {appointment.serviceName}
            </p>
            
            {/* Time and Price */}
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{appointment.time} - {appointment.endTime}</span>
              </div>
              <span className="font-semibold text-[#1A1A1A]">${appointment.price}</span>
            </div>

            {/* Location and Notes */}
            <div className="space-y-1">
              {appointment.location && (
                <div className="flex items-center gap-1 text-xs text-[#64748B]">
                  <MapPin className="w-3 h-3" />
                  <span>{appointment.location}</span>
                </div>
              )}
              {appointment.notes && (
                <p className="text-xs text-[#64748B] italic line-clamp-1">
                  {appointment.notes}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons - Clean Design */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-[#F3F4F6]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReschedule(appointment.id)}
            className="flex-1 border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#D1D5DB]"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reschedule
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onComplete(appointment.id)}
            className="flex-1 border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#D1D5DB]"
          >
            <Check className="w-4 h-4 mr-2" />
            Complete
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancel(appointment.id)}
            className="flex-1 border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#D1D5DB]"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
