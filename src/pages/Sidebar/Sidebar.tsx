import {
	Bell,
	Building2,
	Calendar,
	LayoutGrid,
	Menu,
	Settings,
	ShoppingBag,
	ShoppingCart,
	TrendingUp,
	Users,
	Wallet,
	X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

export default function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const currentUser = useSelector((state: any) => state.auth?.user);
	const dispatch = useDispatch();

	const menuItems = [
		{ icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
		{ icon: Users, label: "User Management", href: "/users" },
		{ icon: Building2, label: "Communities & NGOs", href: "/communities-ngo" },

		{ icon: Calendar, label: "Event Management", href: "/event-management" },

		{
			icon: ShoppingBag,
			label: "Marketplace",
			href: "/market-place",
		},
		{
			icon: ShoppingCart,
			label: "Orders & Transactions",
			href: "/orders-transactions",
		},
		{
			icon: TrendingUp,
			label: "Income & Analytics",
			href: "/income-analytics",
		},

		{ icon: Wallet, label: "Payout Management", href: "/payout-management" },
		{ icon: Bell, label: "Notifications", href: "/notifications" },
		{ icon: Settings, label: "System Settings", href: "/settings" },
	];

	const handleNavigate = (href: string) => {
		navigate(href);
		setIsOpen(false); // Close sidebar after navigation on mobile
	};
	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-[#1447E6] text-[white] rounded-lg  transition"
			>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Overlay for mobile */}
			{isOpen && (
				<div
					onClick={() => setIsOpen(false)}
					className="lg:hidden fixed inset-0 bg-black/50 z-30"
				/>
			)}

			{/* Sidebar */}

			<aside
				className={` space-y-6 bg-white border-r border-[#E5E7EB] px-6 py-8 flex flex-col fixed lg:sticky top-0 h-screen z-40 transition-transform duration-300 ease-in-out
	overflow-y-auto no-scrollbar ${
		isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
	} w-auto`}
			>
				{/* Logo/Brand */}
				<div className="flex items-center gap-2 justify-center">
					<img
						src={logo}
						alt="Concert stage"
						className="w-11 h-11 rounded-full object-cover"
					/>
					<div>
						<h3 className="text-[#1F2024] text-xl font-semibold">SynqUlan</h3>
					</div>
				</div>

				{/* Navigation */}
				<nav className="flex-1 space-y-2 px-4 pt-4">
					{menuItems.map((item, idx) => {
						const isActive = location.pathname === item.href;
						return (
							<div
								onClick={() => handleNavigate(item.href)}
								key={idx}
								className={`flex text-md font-normal items-center gap-3  px-3 py-2 rounded-lg cursor-pointer transition
                ${
									isActive
										? "bg-[#EFF6FF] font-bold text-[#1447E6]"
										: "text-[#364153] font-medium hover:text-[#1447E6] hover:bg-[#EFF6FF]"
								}`}
							>
								<item.icon size={20} />
								<span>{item.label}</span>
							</div>
						);
					})}
				</nav>

				{/* Logout */}
				<div className="flex items-center gap-3 px-1 pt-4 border-t border-[#E5E7EB]">
					<img
						src={user}
						alt="Concert stage"
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<h3 className="text-[#101828] text-sm font-normal">
							{currentUser?.role}
						</h3>
						<p className="text-[#6A7282] text-xs font-normal">
							{currentUser?.email}
						</p>
					</div>
					<button
						onClick={handleLogout}
						className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded"
					>
						Logout
					</button>
				</div>
			</aside>
		</>
	);
}
