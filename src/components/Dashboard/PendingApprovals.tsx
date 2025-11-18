import { AlertCircle } from 'lucide-react'

interface ApprovalItem {
  id: string
  category: string
  title: string
  timestamp: string
}

const approvals: ApprovalItem[] = [
  { id: '1', category: 'Community Verification', title: 'Green Earth Foundation', timestamp: '2 hours ago' },
  { id: '2', category: 'Event Approval', title: 'Beach Cleanup Drive', timestamp: '5 hours ago' },
  { id: '3', category: 'Product Listing', title: 'Eco-Friendly Water Bottle', timestamp: '1 day ago' },
  { id: '4', category: 'Payout Request', title: 'Ocean Warriors NGO', timestamp: '1 day ago' },
]

export function PendingApprovals() {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
  {/* Header */}
  <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center rounded-full bg-orange-100 w-8 h-8">
        <AlertCircle className="w-5 h-5 text-orange-600" />
      </div>

      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
        Pending Approvals
      </h2>

      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs sm:text-sm font-medium text-gray-600">
        4
      </span>
    </div>

    <button className="px-3 py-2 sm:px-4 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 text-sm font-medium w-full sm:w-auto">
      View All
    </button>
  </div>

  {/* Approval Items */}
  <div className="space-y-4">
    {approvals.map((approval) => (
      <div
        key={approval.id}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4"
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 whitespace-nowrap mt-0.5">
            {approval.category}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-gray-900 font-medium">{approval.title}</p>
            <p className="text-xs text-gray-500">{approval.timestamp}</p>
          </div>
        </div>

        <button className="px-3 py-2 sm:px-4 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 text-sm font-medium w-full sm:w-auto">
          Review
        </button>
      </div>
    ))}
  </div>
</div>

  )
}
