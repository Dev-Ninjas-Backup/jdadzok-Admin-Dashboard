import baseApi from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Users
    getAllDashboardOverview: builder.query({
      query: () => ({
        url: "/admin/dashboard/summary",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getAllUserGrowth: builder.query({
      query: () => ({
        url: "/admin/dashboard/user-growth",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getAllRevenueTrends: builder.query({
      query: () => ({
        url: "/admin/dashboard/revenue-trends",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getAllActivity: builder.query({
      query: () => ({
        url: "/admin/dashboard/activity-division",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getAllPendingApplication: builder.query({
      query: () => ({
        url: "/admin/dashboard/pending-applications",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

   
  }),
});

export const {
  useGetAllDashboardOverviewQuery,
  useGetAllUserGrowthQuery,
  useGetAllRevenueTrendsQuery,
  useGetAllActivityQuery,
  useGetAllPendingApplicationQuery,
} = dashboardApi;
