import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Users, Shield, Activity, Settings } from "lucide-react";

const SimpleDashboard = () => {
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
              Admin Dashboard
            </h1>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '1rem'
            }}>
              Manage the entire platform
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
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
              1,234
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Total Businesses
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
              5,678
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Total Appointments
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
              2.4h
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Avg Response Time
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
              89%
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              Renewal Rate
            </p>
          </div>
        </div>

        {/* Management Modules */}
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
            Management Modules
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <button 
              onClick={() => navigate('/admin/team-management')}
              style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.backgroundColor = '#faf5ff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Users style={{ width: '32px', height: '32px', color: '#7c3aed' }} />
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  margin: '0 0 4px 0'
                }}>
                  Team Management
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  margin: '0',
                  fontSize: '0.875rem'
                }}>
                  Manage team members, roles & permissions
                </p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/businesses')}
              style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.backgroundColor = '#faf5ff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Shield style={{ width: '32px', height: '32px', color: '#7c3aed' }} />
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  margin: '0 0 4px 0'
                }}>
                  Business Management
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  margin: '0',
                  fontSize: '0.875rem'
                }}>
                  Manage business accounts & approvals
                </p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/analytics')}
              style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.backgroundColor = '#faf5ff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Activity style={{ width: '32px', height: '32px', color: '#7c3aed' }} />
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  margin: '0 0 4px 0'
                }}>
                  Analytics & Reports
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  margin: '0',
                  fontSize: '0.875rem'
                }}>
                  View platform analytics & reports
                </p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/settings')}
              style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.backgroundColor = '#faf5ff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Settings style={{ width: '32px', height: '32px', color: '#7c3aed' }} />
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  margin: '0 0 4px 0'
                }}>
                  System Settings
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  margin: '0',
                  fontSize: '0.875rem'
                }}>
                  Configure system settings
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Businesses */}
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
            Recent Businesses
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '12px'
          }}>
            {[
              { name: 'Beauty Salon Pro', email: 'contact@beautysalon.com', status: 'Active' },
              { name: 'Tech Repair Hub', email: 'info@techrepair.com', status: 'Pending' },
              { name: 'Fitness Center', email: 'hello@fitness.com', status: 'Active' },
              { name: 'Restaurant Deluxe', email: 'reservations@restaurant.com', status: 'Suspended' }
            ].map((business, index) => (
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
                    {business.name}
                  </h4>
                  <p style={{ 
                    color: '#6b7280', 
                    margin: '0',
                    fontSize: '0.875rem'
                  }}>
                    {business.email}
                  </p>
                </div>
                <span style={{ 
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  backgroundColor: business.status === 'Active' ? '#dcfce7' : 
                                  business.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                  color: business.status === 'Active' ? '#166534' : 
                         business.status === 'Pending' ? '#92400e' : '#991b1b'
                }}>
                  {business.status}
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
            Current User
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

export default SimpleDashboard;
