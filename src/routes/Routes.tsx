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

const routes = createBrowserRouter([
	{
		path: "/",
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "users",
				element: <UserManagement />,
			},
			{
				path: "communities-ngo",
				element: <CommunitiesNGOs />,
			},
			{
				path: "event-management",
				element: <EventManagement />,
			},
			{
				path: "market-place",
				element: <Marketplace />,
			},
			{
				path: "orders-transactions",
				element: <OrdersTransactions />,
			},
			{
				path: "income-analytics",
				element: <IncomeAnalytics />,
			},
			{
				path: "payout-management",
				element: <PayoutManagement />,
			},
			{
				path: "notifications",
				element: <Notifications />,
			},
			{
				path: "settings",
				element: <SystemSettings />,
			},
		],
	},
]);

export default routes;
