import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Users, MessageCircle, Settings, Plus } from "lucide-react";

const SimpleBusinessDashboard = () => {
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
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              Business Dashboard
            </h1>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '1rem'
            }}>
              Manage your business and appointments
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* Quick Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              24
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Today's Appointments
            </p>
          </div>

          <div style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              156
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Total Clients
            </p>
          </div>

          <div style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              8
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Services Offered
            </p>
          </div>

          <div style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              4.8
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Average Rating
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <button 
            onClick={() => navigate('/business/appointments')}
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
            Appointments
          </button>

          <button 
            onClick={() => navigate('/business/clients')}
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
            <Users size={32} />
            Clients
          </button>

          <button 
            onClick={() => navigate('/business/messages')}
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
            onClick={() => navigate('/business/settings')}
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
            <Settings size={32} />
            Settings
          </button>
        </div>

        {/* Today's Schedule */}
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
            Today's Schedule
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '12px'
          }}>
            {[
              { time: '9:00 AM', client: 'Sarah Johnson', service: 'Haircut', status: 'Confirmed' },
              { time: '10:30 AM', client: 'Mike Chen', service: 'Consultation', status: 'Pending' },
              { time: '2:00 PM', client: 'Emma Davis', service: 'Styling', status: 'Confirmed' },
              { time: '4:00 PM', client: 'John Smith', service: 'Beard Trim', status: 'Confirmed' }
            ].map((appointment, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white', 
                padding: '16px', 
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    {appointment.time} - {appointment.client}
                  </h4>
                  <p style={{ 
                    color: '#6b7280', 
                    margin: '0',
                    fontSize: '0.875rem'
                  }}>
                    {appointment.service}
                  </p>
                </div>
                <span style={{ 
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  backgroundColor: appointment.status === 'Confirmed' ? '#dcfce7' : '#fef3c7',
                  color: appointment.status === 'Confirmed' ? '#166534' : '#92400e'
                }}>
                  {appointment.status}
                </span>
              </div>
            ))}
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
            Business Account
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

export default SimpleBusinessDashboard;
