import { AdminPaymentDashboard } from "@/components/payment/AdminPaymentDashboard";

const AdminAppointments = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Subscriptions & Payments</h1>
        <p className="text-muted-foreground text-lg">
          Monitor platform revenue, business subscriptions, and payment analytics
        </p>
      </div>

      <AdminPaymentDashboard />
    </div>
  );
};

export default AdminAppointments;