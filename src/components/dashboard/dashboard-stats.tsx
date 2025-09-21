import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  TrendingUp, 
  Users, 
  Calendar as CalendarIcon, 
  DollarSign, 
  AlertCircle, 
  Plus, 
  Filter, 
  Search,
  Clock,
  RefreshCw,
  BarChart3,
  Tag,
  Download,
  Bell,
  Eye,
  Settings
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export function DashboardStats() {
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const businessCategories = [
    "Restaurant", "Beauty Salon", "Auto Repair", "Hotel", "Law Firm", 
    "Clinic", "Gym", "Retail Store", "Consulting", "Education"
  ];

  const subscriptionPlans = ["Trial", "Monthly", "Annual", "Enterprise"];
  const businessStatuses = ["Active", "Pending", "Suspended", "Closed"];
  const availableTags = ["VIP", "High Risk", "New", "Premium", "Standard", "At Risk"];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Page Header with Alerts */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage businesses, subscriptions, and platform operations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                  <Bell className="h-3 w-3 mr-1" />
                  3 Alerts
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>3 businesses require attention</p>
              </TooltipContent>
            </Tooltip>
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
              Platform Active
            </Badge>
          </div>
        </div>

        {/* Simplified Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Filter by Date:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-48 justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || {from: undefined, to: undefined})}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Select Tags:</span>
              <Select value={selectedTags.join(',')} onValueChange={(value) => setSelectedTags(value ? value.split(',') : [])}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Tags</SelectItem>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search businesses..." 
                className="pl-10 w-64 border-[#E5E7EB] focus:border-[#4B2AAD]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Invite Business
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
                  <Users className="h-4 w-4 text-[#4B2AAD]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">148</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% from last month
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total registered businesses on the platform</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                  <RefreshCw className="h-4 w-4 text-[#10B981]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">134</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Businesses with active subscription plans</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-[#F59E0B]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">23</div>
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Next 30 days
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Subscriptions expiring in the next 30 days</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue (This Month)</CardTitle>
                  <DollarSign className="h-4 w-4 text-[#8B5CF6]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">$12,847</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +28% from last month
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total revenue generated this month</p>
            </TooltipContent>
          </Tooltip>
        </div>

      </div>
    </TooltipProvider>
  );
}