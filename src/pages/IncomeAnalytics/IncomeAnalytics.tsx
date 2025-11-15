import DashboardHeader from "@/components/common/DashboardHeader";
import StatCard from "@/components/common/DashboardStatCard";
import { IncomeCharts } from "@/components/IncomeAnalytics/IncomeChart";
import { TopSellers } from "@/components/IncomeAnalytics/TopSellers";
import { Users, Building2, Calendar, ShoppingBag } from "lucide-react";

export default function IncomeAnalytics() {
  const stats = [
    {
      label: "Total Users",
      value: "5,342",
      change: "+12% from last month",
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Verified Communities",
      value: "287",
      change: "+8 new this week",
      icon: Building2,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Active Events",
      value: "145",
      change: "23 happening today",
      icon: Calendar,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Marketplace Revenue",
      value: "$53,240",
      change: "+18% from last month",
      icon: ShoppingBag,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];
  return (
    <main>
      {/* Header Section */}

      <div>
        <DashboardHeader
          title="	Income & Analytics"
          subtitle="	Monitor revenue, commissions, and financial performance."
          buttonLabel="Download Financial Report"
          onButtonClick={() => console.log("Download clicked")}
        />
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <IncomeCharts />
        <TopSellers />
      </div>
    </main>
  );
}
