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
	}),
});

export const { useGetPayoutOverviewQuery } = payoutApi;
