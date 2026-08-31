import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UserManagement from "@/pages/UserManagement/UserManagement";
import CommunitiesNGOs from "@/pages/Communities&NGOs/CommunitiesNGOs";
import EventManagement from "@/pages/EventManagement/EventManagement";
import Marketplace from "@/pages/Marketplace/Marketplace";
import OrdersTransactions from "@/pages/OrdersTransactions/OrdersTransactions";
import IncomeAnalytics from "@/pages/IncomeAnalytics/IncomeAnalytics";
import PayoutManagement from "@/pages/PayoutManagement/PayoutManagement";
import Notifications from "@/pages/Notifications/Notifications";
import SystemSettings from "@/pages/SystemSettings/SystemSettings";
import Login from "@/pages/Login/Login";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ProductCategory from "@/pages/ProductCategory/ProductCategory";
import CapLevelManagement from "@/pages/CapLevelManagement/CapLevelManagement";
import FraudReview from "@/pages/FraudReview/FraudReview";
import CorporateCSR from "@/pages/CorporateCSR/CorporateCSR";
import ContentManagement from "@/pages/ContentManagement/ContentManagement";
import VolunteerHours from "@/pages/VolunteerHours/VolunteerHours";
import ReportsModeration from "@/pages/ReportsModeration/ReportsModeration";
import ImpactReports from "@/pages/ImpactReports/ImpactReports";
import PlatformAnalytics from "@/pages/PlatformAnalytics/PlatformAnalytics";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ProtectedRoute authRequired={false}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute authRequired={true}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <UserManagement /> },
      { path: "communities-ngo", element: <CommunitiesNGOs /> },
      { path: "event-management", element: <EventManagement /> },
      { path: "market-place", element: <Marketplace /> },
      { path: "product-category", element: <ProductCategory /> },
      { path: "orders-transactions", element: <OrdersTransactions /> },
      { path: "income-analytics", element: <IncomeAnalytics /> },
      { path: "payout-management", element: <PayoutManagement /> },
      { path: "cap-level", element: <CapLevelManagement /> },
      { path: "fraud-review", element: <FraudReview /> },
      { path: "corporate", element: <CorporateCSR /> },
      { path: "content", element: <ContentManagement /> },
      { path: "volunteer-hours", element: <VolunteerHours /> },
      { path: "reports", element: <ReportsModeration /> },
      { path: "impact-reports", element: <ImpactReports /> },
      { path: "analytics", element: <PlatformAnalytics /> },
      { path: "notifications", element: <Notifications /> },
      { path: "settings", element: <SystemSettings /> },
    ],
  },
]);

export default routes;
