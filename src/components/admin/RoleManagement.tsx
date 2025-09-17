import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Check,
  AlertTriangle
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
  isCustom: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const availablePermissions: Permission[] = [
  // Admin Tools
  { id: 'admin_tools', name: 'Admin Tools', description: 'Access to admin panel and tools', category: 'Administration' },
  { id: 'manage_users', name: 'Manage Users', description: 'Create, edit, and delete user accounts', category: 'Administration' },
  { id: 'manage_businesses', name: 'Manage Businesses', description: 'Create, edit, and delete business accounts', category: 'Administration' },
  { id: 'system_settings', name: 'System Settings', description: 'Modify system-wide settings', category: 'Administration' },
  
  // User Management
  { id: 'view_users', name: 'View Users', description: 'View user profiles and information', category: 'User Management' },
  { id: 'edit_users', name: 'Edit Users', description: 'Edit user profiles and settings', category: 'User Management' },
  { id: 'suspend_users', name: 'Suspend Users', description: 'Suspend or reactivate user accounts', category: 'User Management' },
  
  // Business Management
  { id: 'view_businesses', name: 'View Businesses', description: 'View business profiles and information', category: 'Business Management' },
  { id: 'edit_businesses', name: 'Edit Businesses', description: 'Edit business profiles and settings', category: 'Business Management' },
  { id: 'approve_businesses', name: 'Approve Businesses', description: 'Approve or reject business applications', category: 'Business Management' },
  
  // Content Management
  { id: 'manage_content', name: 'Manage Content', description: 'Create and edit platform content', category: 'Content Management' },
  { id: 'moderate_content', name: 'Moderate Content', description: 'Review and moderate user-generated content', category: 'Content Management' },
  
  // Analytics & Reports
  { id: 'view_analytics', name: 'View Analytics', description: 'Access to analytics and reporting', category: 'Analytics' },
  { id: 'export_data', name: 'Export Data', description: 'Export user and business data', category: 'Analytics' },
  
  // Financial
  { id: 'access_payments', name: 'Access Payments', description: 'View and manage payment information', category: 'Financial' },
  { id: 'manage_billing', name: 'Manage Billing', description: 'Manage billing and subscription settings', category: 'Financial' },
  
  // Support
  { id: 'manage_tickets', name: 'Manage Tickets', description: 'Handle customer support tickets', category: 'Support' },
  { id: 'view_tickets', name: 'View Tickets', description: 'View customer support tickets', category: 'Support' },
  
  // Regional
  { id: 'regional_admin', name: 'Regional Admin', description: 'Admin access for specific regions', category: 'Regional' },
  { id: 'manage_regions', name: 'Manage Regions', description: 'Manage regional settings and permissions', category: 'Regional' }
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Owner',
    permissions: ['admin_tools', 'manage_users', 'access_payments', 'view_analytics', 'manage_content', 'system_settings'],
    description: 'Full access to all platform features',
    isCustom: false
  },
  {
    id: '2',
    name: 'Support Agent',
    permissions: ['view_users', 'manage_tickets', 'view_tickets'],
    description: 'Can view users and manage support tickets',
    isCustom: false
  },
  {
    id: '3',
    name: 'Content Manager',
    permissions: ['manage_content', 'view_analytics', 'moderate_content'],
    description: 'Can manage content and view analytics',
    isCustom: false
  },
  {
    id: '4',
    name: 'Regional Admin',
    permissions: ['manage_users', 'view_analytics', 'manage_content', 'regional_admin'],
    description: 'Can manage users and content in assigned region',
    isCustom: true
  }
];

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleCreateRole = () => {
    if (!newRole.name.trim()) return;

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      isCustom: true
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowCreateDialog(false);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setShowCreateDialog(true);
  };

  const handleUpdateRole = () => {
    if (!editingRole || !newRole.name.trim()) return;

    setRoles(prev => prev.map(role => 
      role.id === editingRole.id 
        ? { ...role, name: newRole.name, description: newRole.description, permissions: newRole.permissions }
        : role
    ));

    setEditingRole(null);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowCreateDialog(false);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const togglePermission = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getPermissionBadges = (permissions: string[]) => {
    return permissions.map(permissionId => {
      const permission = availablePermissions.find(p => p.id === permissionId);
      return permission ? (
        <Badge key={permissionId} variant="outline" className="text-xs">
          {permission.name}
        </Badge>
      ) : null;
    }).filter(Boolean);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
          <p className="text-gray-600">Create and manage custom roles with specific permissions</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    value={newRole.name}
                    onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Support Manager"
                  />
                </div>
                <div>
                  <Label htmlFor="role-description">Description</Label>
                  <Textarea
                    id="role-description"
                    value={newRole.description}
                    onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this role can do..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <Label className="text-base font-medium">Permissions</Label>
                <p className="text-sm text-gray-600 mb-4">
                  Select the permissions this role should have
                </p>
                
                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map(permission => (
                          <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                            <Switch
                              checked={newRole.permissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Label className="font-medium text-sm">
                                  {permission.name}
                                </Label>
                                {newRole.permissions.includes(permission.id) && (
                                  <Check className="w-4 h-4 text-green-600" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Permissions Summary */}
              {newRole.permissions.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Selected Permissions ({newRole.permissions.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getPermissionBadges(newRole.permissions)}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateDialog(false);
                    setEditingRole(null);
                    setNewRole({ name: '', description: '', permissions: [] });
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={editingRole ? handleUpdateRole : handleCreateRole}
                  disabled={!newRole.name.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingRole ? 'Update Role' : 'Create Role'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles List */}
      <div className="grid gap-4">
        {roles.map(role => (
          <Card key={role.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                    {role.isCustom ? (
                      <Badge variant="outline" className="text-xs">
                        Custom
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        System
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Permissions ({role.permissions.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getPermissionBadges(role.permissions)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditRole(role)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {role.isCustom && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2FA Enforcement Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-900">Two-Factor Authentication</h4>
              <p className="text-sm text-orange-700 mt-1">
                Users with "Admin Tools" or "Owner" permissions are required to enable 2FA. 
                This helps protect sensitive administrative functions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;
