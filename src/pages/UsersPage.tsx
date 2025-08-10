import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Download, Upload, Users, UserCheck, UserX, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usersService } from '@/services/users';
import { UsersTable } from '@/components/users/UsersTable';
import { UserActivitiesTable } from '@/components/users/UserActivitiesTable';
import { UserSessionsTable } from '@/components/users/UserSessionsTable';
import { CreateUserDialog } from '@/components/users/CreateUserDialog';
import { BulkImportUsersDialog } from '@/components/users/BulkImportUsersDialog';
import { UserStatsCards } from '@/components/users/UserStatsCards';
import { RolePermissionsTable } from '@/components/users/RolePermissionsTable';
import type { Role } from '@/types/auth';

export function UsersPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);

  // Fetch users data
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['users', searchQuery, selectedRole, selectedDepartment, selectedStatus],
    queryFn: () => usersService.getUsers({
      search: searchQuery,
      role: selectedRole as Role || undefined,
      department: selectedDepartment || undefined,
      isActive: selectedStatus === 'active' ? true : selectedStatus === 'inactive' ? false : undefined,
    }),
    enabled: activeTab === 'users',
  });

  // Fetch user activities
  const { data: activitiesData, isLoading: activitiesLoading } = useQuery({
    queryKey: ['user-activities', searchQuery],
    queryFn: () => usersService.getUserActivities({
      search: searchQuery,
      limit: 50,
    }),
    enabled: activeTab === 'activities',
  });

  // Fetch user sessions
  const { data: sessionsData, isLoading: sessionsLoading } = useQuery({
    queryKey: ['user-sessions'],
    queryFn: () => usersService.getUserSessions({
      limit: 50,
    }),
    enabled: activeTab === 'sessions',
  });

  // Fetch user statistics
  const { data: userStatsData } = useQuery({
    queryKey: ['user-stats'],
    queryFn: () => usersService.getUserStats(),
    enabled: activeTab === 'users',
  });

  // Fetch role permissions
  const { data: rolePermissionsData, isLoading: rolePermissionsLoading } = useQuery({
    queryKey: ['role-permissions'],
    queryFn: () => usersService.getRolePermissions(),
    enabled: activeTab === 'permissions',
  });

  // Fetch departments for filter
  const { data: departmentsData } = useQuery({
    queryKey: ['departments'],
    queryFn: () => usersService.getDepartments(),
  });

  const handleExportUsers = async (format: 'CSV' | 'EXCEL' = 'EXCEL') => {
    try {
      const blob = await usersService.exportUsers({
        search: searchQuery,
        role: selectedRole as Role || undefined,
        department: selectedDepartment || undefined,
        isActive: selectedStatus === 'active' ? true : selectedStatus === 'inactive' ? false : undefined,
      }, format);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users_export_${new Date().toISOString().split('T')[0]}.${format === 'EXCEL' ? 'xlsx' : 'csv'}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export users:', error);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRole('');
    setSelectedDepartment('');
    setSelectedStatus('');
  };

  const getTabStats = () => {
    const users = usersData?.data || [];
    const activities = activitiesData?.data || [];
    const sessions = sessionsData?.data || [];
    
    return {
      users: {
        total: users.length,
        active: users.filter(user => user.isActive).length,
        inactive: users.filter(user => !user.isActive).length,
      },
      activities: {
        total: activities.length,
        today: activities.filter(activity => {
          const activityDate = new Date(activity.timestamp);
          const today = new Date();
          return activityDate.toDateString() === today.toDateString();
        }).length,
      },
      sessions: {
        total: sessions.length,
        active: sessions.filter(session => session.isActive).length,
      }
    };
  };

  const stats = getTabStats();
  const departments = departmentsData?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, permissions, and monitor user activities
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {activeTab === 'users' && userStatsData?.data && (
        <UserStatsCards stats={userStatsData.data} />
      )}

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management System</CardTitle>
              <CardDescription>
                Comprehensive user administration and access control
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="users">
                  Users
                  {stats.users.total > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {stats.users.total}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="activities">
                  Activities
                  {stats.activities.total > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {stats.activities.total}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="sessions">
                  Sessions
                  {stats.sessions.total > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {stats.sessions.total}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="permissions">
                  Permissions
                </TabsTrigger>
              </TabsList>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {activeTab === 'users' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBulkImport(true)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportUsers('EXCEL')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowCreateUser(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Filters */}
            {(activeTab === 'users' || activeTab === 'activities') && (
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                
                {activeTab === 'users' && (
                  <>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Roles</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="BACKEND">Backend</SelectItem>
                        <SelectItem value="BANK">Bank</SelectItem>
                        <SelectItem value="FIELD">Field</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}

                {(searchQuery || selectedRole || selectedDepartment || selectedStatus) && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}

            <TabsContent value="users" className="space-y-4">
              <UsersTable
                data={usersData?.data || []}
                isLoading={usersLoading}
              />
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              <UserActivitiesTable
                data={activitiesData?.data || []}
                isLoading={activitiesLoading}
              />
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              <UserSessionsTable
                data={sessionsData?.data || []}
                isLoading={sessionsLoading}
              />
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <RolePermissionsTable
                data={rolePermissionsData?.data || []}
                isLoading={rolePermissionsLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateUserDialog
        open={showCreateUser}
        onOpenChange={setShowCreateUser}
      />
      
      <BulkImportUsersDialog
        open={showBulkImport}
        onOpenChange={setShowBulkImport}
      />
    </div>
  );
}
