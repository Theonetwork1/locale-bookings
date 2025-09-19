import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, MessageCircle, Bell, User, Clock, CheckCircle, AlertCircle, Star } from "lucide-react";

const SimpleClientDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: '0 0 8px 0'
          }}>
            Client Dashboard
          </h1>
          <p style={{ 
            color: '#6b7280', 
            margin: '0',
            fontSize: '1rem'
          }}>
            Manage your appointments and bookings
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '16px',
          marginBottom: '30px'
        }}
        className="sm:grid-cols-2 lg:grid-cols-4"
        >
          <button 
            onClick={() => navigate('/find-business')}
            style={{ 
              backgroundColor: '#3b82f6', 
              color: 'white',
              border: 'none',
              padding: '20px', 
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <Calendar size={32} />
            Find Business
          </button>

          <button 
            onClick={() => navigate('/client/appointments')}
            style={{ 
              backgroundColor: '#10b981', 
              color: 'white',
              border: 'none',
              padding: '20px', 
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <Calendar size={32} />
            My Appointments
          </button>

          <button 
            onClick={() => navigate('/client/messages')}
            style={{ 
              backgroundColor: '#f59e0b', 
              color: 'white',
              border: 'none',
              padding: '20px', 
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <MessageCircle size={32} />
            Messages
          </button>

          <button 
            onClick={() => navigate('/client/profile')}
            style={{ 
              backgroundColor: '#8b5cf6', 
              color: 'white',
              border: 'none',
              padding: '20px', 
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <User size={32} />
            Profile
          </button>
        </div>

        {/* Recent Activity */}
        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: '0 0 20px 0'
          }}>
            Recent Activity
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '12px'
          }}>
            {[
              { type: 'Appointment', business: 'Beauty Salon Pro', date: 'Today, 2:00 PM', status: 'Confirmed', category: 'Beauty & Wellness', icon: Calendar },
              { type: 'Message', business: 'Tech Repair Hub', date: 'Yesterday', status: 'New Reply', category: 'Technology', icon: MessageCircle },
              { type: 'Appointment', business: 'Fitness Center', date: 'Tomorrow, 10:00 AM', status: 'Pending', category: 'Health & Fitness', icon: Clock },
              { type: 'Review', business: 'Restaurant Deluxe', date: '2 days ago', status: 'Completed', category: 'Food & Dining', icon: Star }
            ].map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} style={{ 
                  backgroundColor: 'white', 
                  padding: '16px', 
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: activity.status === 'Confirmed' ? '#dcfce7' : 
                                    activity.status === 'New Reply' ? '#dbeafe' : 
                                    activity.status === 'Pending' ? '#fef3c7' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComponent 
                      size={24} 
                      color={activity.status === 'Confirmed' ? '#166534' : 
                             activity.status === 'New Reply' ? '#1e40af' : 
                             activity.status === 'Pending' ? '#92400e' : '#374151'} 
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: '#1f2937',
                        margin: '0'
                      }}>
                        {activity.business}
                      </h4>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        fontWeight: '500',
                        backgroundColor: '#f3f4f6',
                        color: '#6b7280'
                      }}>
                        {activity.category}
                      </span>
                    </div>
                    <p style={{ 
                      color: '#6b7280', 
                      margin: '0',
                      fontSize: '0.875rem'
                    }}>
                      {activity.type} • {activity.date}
                    </p>
                  </div>
                  <span style={{ 
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: activity.status === 'Confirmed' ? '#dcfce7' : 
                                    activity.status === 'New Reply' ? '#dbeafe' : 
                                    activity.status === 'Pending' ? '#fef3c7' : '#f3f4f6',
                    color: activity.status === 'Confirmed' ? '#166534' : 
                           activity.status === 'New Reply' ? '#1e40af' : 
                           activity.status === 'Pending' ? '#92400e' : '#374151',
                    flexShrink: 0
                  }}>
                    {activity.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Info */}
        <div style={{ 
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 12px 0'
          }}>
            Welcome back!
          </h3>
          <p style={{ 
            color: '#6b7280', 
            margin: '0',
            fontSize: '0.9rem'
          }}>
            Logged in as: {user?.email || 'Unknown'}
          </p>
          <p style={{ 
            color: '#6b7280', 
            margin: '4px 0 0 0',
            fontSize: '0.9rem'
          }}>
            Role: {user?.role || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleClientDashboard;
