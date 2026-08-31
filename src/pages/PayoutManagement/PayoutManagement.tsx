import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import PayoutManagementTable from "@/components/PayoutManagement/PayoutManagementTable";
import {
  useGetPaidOrdersQuery,
  useGetPayoutOverviewQuery,
} from "@/redux/features/payout/payoutApi";
import { formatValue } from "@/utils/formatValue";
import { Clock, DollarSign } from "lucide-react";
import { useState } from "react";

export default function PayoutManagement() {
  const [searchValue, setSearchValue] = useState("");

  const { data: overview } = useGetPayoutOverviewQuery(undefined);
  const { data: paidOrders = [] } = useGetPaidOrdersQuery({
    sellerName: searchValue || undefined,
  });

  const orders = Array.isArray(paidOrders) ? paidOrders : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const stats = [
    {
      title: "Pending Orders",
      value: String(overview?.totalPending ?? 0),
      leftIconColor: "#F54900",
      leftIcon: <Clock size={32} />,
      subtitle: "Awaiting payment",
      subtitleColor: "#F54900",
    },
    {
      title: "Paid Orders",
      value: String(overview?.totalPaid ?? 0),
      leftIconColor: "#155DFC",
      leftIcon: <DollarSign size={32} />,
      subtitle: "Completed",
      subtitleColor: "#4A5565",
    },
    {
      title: "Paid This Month",
      value: `$${formatValue(overview?.paidThisMonth ?? 0)}`,
      subtitle: "Revenue",
      subtitleColor: "#00A63E",
      leftIconColor: "#00A63E",
      leftIcon: <DollarSign size={32} />,
    },
    {
      title: "Total Volume",
      value: `$${formatValue(overview?.paidTotalAmount ?? 0)}`,
      leftIconColor: "#9810FA",
      leftIcon: <DollarSign size={32} />,
    },
  ];

  const tableData = orders.map(
    (order: {
      orderId: string;
      sellerName?: string;
      sellerEmail?: string;
      productTitle?: string;
      orderAmount?: number;
      orderDate?: string;
      totalEarnedBySeller?: number;
    }) => ({
      id: order.orderId,
      name: order.sellerName || order.sellerEmail || "Unknown",
      type: "Seller" as const,
      avatar: (order.sellerName || order.sellerEmail || "?")[0].toUpperCase(),
      amount: `$${formatValue(order.orderAmount ?? 0)}`,
      date: order.orderDate
        ? new Date(order.orderDate).toLocaleDateString()
        : "—",
      paymentMethod: order.productTitle || "Marketplace",
      accountInfo: order.sellerEmail || "",
      totalEarned: `$${formatValue(order.totalEarnedBySeller ?? 0)}`,
    })
  );

  return (
    <div className="space-y-6">
      <div className="mb-10 flex items-center justify-between overflow-auto ">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl  text-[#101828]">
            Payout Management
          </h1>
          <p className="text-[#4A5565] text-sm sm:text-base">
            Review paid orders and seller earnings
          </p>
        </div>
      </div>
      <div className="grid min-[480px]:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardWithoutIcon
            key={index}
            title={stat.title}
            value={stat.value}
            rightIcon={stat.leftIcon}
            rightIconColor={stat.leftIconColor}
            subtitle={stat.subtitle}
            subtitleColor={stat.subtitleColor}
            gapX={32}
            gap={8}
          />
        ))}
      </div>
      <div className="border border-[#0000001a] rounded-xl overflow-hidden bg-white p-4">
        <SearchBar
          placeholder="Search by seller name..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
        {tableData.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">No paid orders found.</p>
        ) : (
          <PayoutManagementTable data={tableData} />
        )}
      </div>
    </div>
  );
}
