import baseApi from "@/redux/api/baseApi";



export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Submit a report */
    submitReport: builder.mutation({
      query: (data) => ({
        url: "/reports",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),

    /** Get current user's reports */
    getMyReports: builder.query({
      query: () => ({
        url: "/admin/dashboard/report",
        method: "GET",
      }),
      providesTags: ["Reports"],
    }),

    reviewReport: builder.mutation({
      query: ({ id, adminNotes }) => ({
        url: `/admin/dashboard/${id}/review`,
        method: "PATCH",
        body: {
          status: "REVIEWED",
          adminNotes: adminNotes || "Reviewed by admin",
        },
      }),
    }),
  }),
});

export const { useSubmitReportMutation, useGetMyReportsQuery, useReviewReportMutation  } = reportsApi;
