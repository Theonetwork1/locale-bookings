import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Calendar, DollarSign, AlertCircle, Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage businesses, subscriptions, and platform operations</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-success-light border-success/20 text-success">
            Active Platform Status
          </Badge>
          <span className="text-sm text-muted-foreground">
            2 pending renewals / 1 requires attention
          </span>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Filter by</span>
            <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm">
              <option>This month</option>
              <option>Last month</option>
              <option>Last 3 months</option>
            </select>
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Select tags...
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search businesses..." 
              className="pl-10 w-64"
            />
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Invite Business
          </Button>
          <Button variant="outline" size="sm">
            Edit columns
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">148</div>
            <p className="text-xs text-success flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">134</div>
            <p className="text-xs text-success flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-warning flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Next 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (This Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$7,768</div>
            <p className="text-xs text-success flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +22% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}