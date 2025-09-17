import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Shield, 
  Activity, 
  UserPlus, 
  Settings,
  ArrowLeft,
  Bell,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TeamManagement from "@/components/admin/TeamManagement";
import RoleManagement from "@/components/admin/RoleManagement";
import InviteManagement from "@/components/admin/InviteManagement";
import AuditLogs from "@/components/admin/AuditLogs";

const AdminTeamManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Production data - will be loaded from API
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingInvites: 0,
    twoFactorEnabled: 0,
    recentActivity: 0,
    securityAlerts: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);

  // Load data from API
  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchTeamStats();
    // fetchRecentActivities();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'role_creation': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'invitation': return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'permission_update': return <Settings className="w-4 h-4 text-purple-600" />;
      case 'security_alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600">Manage your team members, roles, and security</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {stats.securityAlerts > 0 && (
              <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                <Bell className="w-4 h-4 mr-2" />
                {stats.securityAlerts} Security Alert{stats.securityAlerts > 1 ? 's' : ''}
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="audit">Audit & Security</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Team Members</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
                      <p className="text-sm text-green-600 mt-1">
                        {stats.activeMembers} active
                      </p>
                    </div>
                    <Users className="w-12 h-12 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Invitations</p>
                      <p className="text-3xl font-bold text-orange-600">{stats.pendingInvites}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Awaiting response
                      </p>
                    </div>
                    <UserPlus className="w-12 h-12 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">2FA Enabled</p>
                      <p className="text-3xl font-bold text-green-600">{stats.twoFactorEnabled}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        of {stats.totalMembers} members
                      </p>
                    </div>
                    <Shield className="w-12 h-12 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.recentActivity}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        actions today
                      </p>
                    </div>
                    <Activity className="w-12 h-12 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Security Alerts</p>
                      <p className="text-3xl font-bold text-red-600">{stats.securityAlerts}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        require attention
                      </p>
                    </div>
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Custom Roles</p>
                      <p className="text-3xl font-bold text-purple-600">3</p>
                      <p className="text-sm text-gray-600 mt-1">
                        created by admin
                      </p>
                    </div>
                    <Settings className="w-12 h-12 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest team management activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('audit')}
                    className="w-full"
                  >
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common team management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('invitations')}
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <UserPlus className="w-6 h-6" />
                    <span>Send Invite</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('roles')}
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Shield className="w-6 h-6" />
                    <span>Create Role</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('members')}
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Users className="w-6 h-6" />
                    <span>Manage Members</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('audit')}
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Activity className="w-6 h-6" />
                    <span>View Logs</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Members Tab */}
          <TabsContent value="members">
            <TeamManagement />
          </TabsContent>

          {/* Roles & Permissions Tab */}
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invitations">
            <InviteManagement />
          </TabsContent>

          {/* Audit & Security Tab */}
          <TabsContent value="audit">
            <AuditLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminTeamManagement;
