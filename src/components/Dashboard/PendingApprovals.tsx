import { useGetAllPendingApplicationQuery } from '@/redux/features/dashboard/dashboardApi'
import { AlertCircle } from 'lucide-react'

interface ApprovalItem {
  id: string
  title: string
  applicationTime: string
  status: string
  type: string
}

export function PendingApprovals() {
  // Fetch the data from the API with proper typing
  const { data: approvals = [], isLoading, error } = useGetAllPendingApplicationQuery(null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  // Filter out the "PENDING" status applications
  const pendingApprovals: ApprovalItem[] = approvals.filter(
    (approval:any) => approval.status === 'PENDING'
  )

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
            {pendingApprovals.length} {/* Dynamic count */}
          </span>
        </div>

        <button className="px-3 py-2 sm:px-4 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 text-sm font-medium w-full sm:w-auto">
          View All
        </button>
      </div>

      {/* Approval Items */}
      {pendingApprovals.length > 0 ? (
        <div className="space-y-4">
          {pendingApprovals.map((approval) => (
            <div
              key={approval.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 whitespace-nowrap mt-0.5">
                  {approval.type} {/* Displaying the type */}
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-gray-900 font-medium">{approval.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(approval.applicationTime).toLocaleString()} {/* Format the date */}
                  </p>
                </div>
              </div>

              {/* Optional button for "Review" */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No pending approvals at the moment.</div>
      )}
    </div>
  )
}
