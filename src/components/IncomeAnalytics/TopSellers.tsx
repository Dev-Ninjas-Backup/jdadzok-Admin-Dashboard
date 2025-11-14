import { TrendingUp } from "lucide-react"

interface Seller {
  rank: number
  name: string
  orders: number
  revenue: number
  commission: number
  growth: number
}

const sellers: Seller[] = [
  {
    rank: 1,
    name: "Green Store",
    orders: 156,
    revenue: 8450,
    commission: 84,
    growth: 12,
  },
  {
    rank: 2,
    name: "EcoEssentials",
    orders: 234,
    revenue: 7320,
    commission: 73,
    growth: 12,
  },
  {
    rank: 3,
    name: "Sustainable Fashion",
    orders: 189,
    revenue: 6890,
    commission: 68,
    growth: 12,
  },
  {
    rank: 4,
    name: "Tech4Good",
    orders: 98,
    revenue: 5670,
    commission: 56,
    growth: 12,
  },
  {
    rank: 5,
    name: "Kitchen Eco",
    orders: 145,
    revenue: 4230,
    commission: 42,
    growth: 12,
  },
]

export function TopSellers() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Sellers</h2>
        <p className="text-sm text-gray-500">Highest performing sellers this month</p>
      </div>

      {/* Sellers List */}
      <div className="space-y-4">
        {sellers.map((seller) => (
          <div
            key={seller.rank}
            className="flex items-center justify-between py-4 px-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
          >
            {/* Left: Rank and Store Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">#{seller.rank}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{seller.name}</p>
                <p className="text-sm text-gray-600">{seller.orders} orders</p>
              </div>
            </div>

            {/* Right: Revenue and Commission */}
            <div className="flex items-center gap-12">
              {/* Revenue */}
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium mb-1">Revenue</p>
                <p className="text-sm font-medium text-gray-900">${(seller.revenue / 1000).toFixed(1)},</p>
                <p className="text-sm text-gray-600">{seller.revenue % 1000}</p>
              </div>

              {/* Commission */}
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium mb-1">Commission</p>
                <p className="text-sm font-medium text-green-600">${seller.commission}</p>
                <p className="text-sm text-gray-600">{seller.commission}</p>
              </div>

              {/* Growth */}
              <div className="text-right flex items-center gap-2 flex-shrink-0">
                <div>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-600">{seller.growth}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
