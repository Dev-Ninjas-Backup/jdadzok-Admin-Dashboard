import baseApi from "../../api/baseApi";

export const payoutApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getPayoutOverview: builder.query({
			query: () => ({
				url: "/admin/payoutManagement/summary",
				method: "GET",
			}),
			providesTags: ["Payout"],
		}),
    getPaidOrders: builder.query({
      query: (args: { sellerName?: string } = {}) => {
        const { sellerName } = args;
        const searchParams = new URLSearchParams();
        if (sellerName) searchParams.append("sellerName", sellerName);
        return {
          url: `/admin/payoutManagement/stats?${searchParams.toString()}`,
          method: "GET",
        };
      },
			providesTags: ["Payout"],
		}),
	}),
});

export const { useGetPayoutOverviewQuery, useGetPaidOrdersQuery } = payoutApi;
