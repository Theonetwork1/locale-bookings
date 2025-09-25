import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessSubscriptionSetup from "./pages/BusinessSubscriptionSetup";
import Dashboard from "./pages/Dashboard";
import SimpleDashboard from "./pages/SimpleDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import SimpleClientDashboard from "./pages/SimpleClientDashboard";
import SimpleBusinessDashboard from "./pages/SimpleBusinessDashboard";
import AdminTeamManagement from "./pages/admin/AdminTeamManagement";
import FindBusiness from "./pages/FindBusiness";
import MyDepartments from "./pages/MyDepartments";
import BookAppointment from "./pages/BookAppointment";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { ThemeProvider } from "next-themes";

// Admin pages
import AdminBusinesses from "./pages/admin/AdminBusinesses";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

// Business pages
import BusinessAppointments from "./pages/business/BusinessAppointments";
import BusinessClients from "./pages/business/BusinessClients";
import BusinessMessages from "./pages/business/BusinessMessages";
import BusinessNotifications from "./pages/business/BusinessNotifications";
import BusinessPage from "./pages/business/BusinessPage";
import BusinessChat from "./pages/business/BusinessChat";
import BusinessProfile from "./pages/business/BusinessProfile";
import BusinessSettings from "./pages/business/BusinessSettings";
import BusinessOnboarding from "./pages/business/BusinessOnboarding";
import BusinessServices from "./pages/business/BusinessServices";

// Client pages
import ClientAppointments from "./pages/client/ClientAppointments";
import ClientMessages from "./pages/client/ClientMessages";
import ClientNotifications from "./pages/client/ClientNotifications";
import ClientProfile from "./pages/client/ClientProfile";
import ClientSettings from "./pages/client/ClientSettings";

// Legal pages
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalDocuments from "./pages/LegalDocuments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/business-subscription-setup" element={<BusinessSubscriptionSetup />} />
                  <Route 
                    path="/business-onboarding" 
                    element={
                      <ProtectedRoute requiredRole="business">
                        <BusinessOnboarding />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin-dashboard" 
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
                        <SimpleClientDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/business-dashboard" 
                    element={
                      <ProtectedRoute requiredRole="business">
                        <SimpleBusinessDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/find-business" element={<FindBusiness />} />
                  <Route path="/my-departments" element={<MyDepartments />} />
                  <Route path="/book-appointment/:businessId" element={<BookAppointment />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/businesses" element={<AdminBusinesses />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/appointments" element={<AdminAppointments />} />
                  <Route path="/admin/messages" element={<AdminMessages />} />
                  <Route path="/admin/notifications" element={<AdminNotifications />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  <Route 
                    path="/admin/team-management" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminTeamManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/analytics" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminAnalytics />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Business Routes */}
                  <Route path="/business/appointments" element={<BusinessAppointments />} />
                  <Route path="/business/clients" element={<BusinessClients />} />
                  <Route path="/business/messages" element={<BusinessMessages />} />
                  <Route path="/business/notifications" element={<BusinessNotifications />} />
                  <Route path="/business/page" element={<BusinessPage />} />
                  <Route path="/business/chat" element={<BusinessChat />} />
                  <Route path="/business/profile" element={<BusinessProfile />} />
                  <Route path="/business/settings" element={<BusinessSettings />} />
                  <Route path="/business/services" element={<BusinessServices />} />
                  
                  {/* Client Routes */}
                  <Route path="/client/appointments" element={<ClientAppointments />} />
                  <Route path="/client/messages" element={<ClientMessages />} />
                  <Route path="/client/notifications" element={<ClientNotifications />} />
                  <Route path="/client/profile" element={<ClientProfile />} />
                  <Route path="/client/settings" element={<ClientSettings />} />
                  
                  {/* Legal Routes */}
                  <Route path="/legal" element={<LegalDocuments />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
