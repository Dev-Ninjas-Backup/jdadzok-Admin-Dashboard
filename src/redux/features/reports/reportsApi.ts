import baseApi from "@/redux/api/baseApi";
import { unwrapApiData } from "@/redux/utils/unwrapApiData";

export interface AdminReport {
  id: string;
  reason: string;
  status: string;
  targetType: string;
  createdAt: string;
  reporter: {
    id: string;
    profile: { name?: string; username?: string; avatarUrl?: string } | null;
  };
  target?: { name?: string; title?: string };
}

export interface AdminReportsPage {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: AdminReport[];
}

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReports: builder.query<
      AdminReportsPage,
      { page?: number; limit?: number } | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 20;
        return {
          url: `/admin/dashboard/report?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      transformResponse: unwrapApiData<AdminReportsPage>,
      providesTags: ["Reports"],
    }),

    reviewReport: builder.mutation({
      query: ({ id, status = "REVIEWED", adminNotes }) => ({
        url: `/admin/dashboard/${id}/review`,
        method: "PATCH",
        body: {
          status,
          adminNotes: adminNotes || "Reviewed by admin",
        },
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useGetAdminReportsQuery,
  useReviewReportMutation,
} = reportsApi;
