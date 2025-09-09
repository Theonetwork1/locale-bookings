import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
<<<<<<< HEAD
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import NotFound from "./pages/NotFound";

=======
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessSubscriptionSetup from "./pages/BusinessSubscriptionSetup";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import FindBusiness from "./pages/FindBusiness";
import MyDepartments from "./pages/MyDepartments";
import BookAppointment from "./pages/BookAppointment";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminBusinesses from "./pages/admin/AdminBusinesses";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";

// Business pages
import BusinessAppointments from "./pages/business/BusinessAppointments";
import BusinessClients from "./pages/business/BusinessClients";
import BusinessMessages from "./pages/business/BusinessMessages";
import BusinessNotifications from "./pages/business/BusinessNotifications";
import BusinessPage from "./pages/business/BusinessPage";
import BusinessChat from "./pages/business/BusinessChat";
import BusinessProfile from "./pages/business/BusinessProfile";

// Client pages
import ClientAppointments from "./pages/client/ClientAppointments";
import ClientMessages from "./pages/client/ClientMessages";
import ClientNotifications from "./pages/client/ClientNotifications";
import ClientProfile from "./pages/client/ClientProfile";

>>>>>>> 6ae5ed6 (Sync changes to Lovable)
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
<<<<<<< HEAD
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/client-dashboard" 
                element={
                  <ProtectedRoute requiredRole="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/business-dashboard" 
                element={
                  <ProtectedRoute requiredRole="business">
                    <BusinessDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
=======
            <MainLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/business-subscription-setup" element={<BusinessSubscriptionSetup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/business-dashboard" element={<BusinessDashboard />} />
                <Route path="/find-business" element={<FindBusiness />} />
                <Route path="/my-departments" element={<MyDepartments />} />
                <Route path="/book-appointment/:businessId" element={<BookAppointment />} />
                
                {/* Admin Routes */}
                <Route path="/admin/businesses" element={<AdminBusinesses />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/appointments" element={<AdminAppointments />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                
                {/* Business Routes */}
                <Route path="/business/appointments" element={<BusinessAppointments />} />
                <Route path="/business/clients" element={<BusinessClients />} />
                <Route path="/business/messages" element={<BusinessMessages />} />
                <Route path="/business/notifications" element={<BusinessNotifications />} />
                <Route path="/business/page" element={<BusinessPage />} />
                <Route path="/business/chat" element={<BusinessChat />} />
                <Route path="/business/profile" element={<BusinessProfile />} />
                
                {/* Client Routes */}
                <Route path="/client/appointments" element={<ClientAppointments />} />
                <Route path="/client/messages" element={<ClientMessages />} />
                <Route path="/client/notifications" element={<ClientNotifications />} />
                <Route path="/client/profile" element={<ClientProfile />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
