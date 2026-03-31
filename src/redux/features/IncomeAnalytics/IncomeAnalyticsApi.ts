import baseApi from "../../api/baseApi";

export const incomeAnalyticsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get All Users
		getAllIncomeAnalyticOverview: builder.query({
			query: () => ({
				url: "/income-analytic/overview",
				method: "GET",
			}),
			providesTags: ["IncomeAnalytics"],
		}),

		getRevenueGrowth: builder.query({
			query: () => ({
				url: "/income-analytic/revenue-growth",
				method: "GET",
			}),
			providesTags: ["IncomeAnalytics"],
		}),

		getAllRevenueTrends: builder.query({
			query: () => ({
				url: "/admin/dashboard/revenue-trends",
				method: "GET",
			}),
			providesTags: ["IncomeAnalytics"],
		}),

		getRevenueCategory: builder.query({
			query: () => ({
				url: "/income-analytic/revenue-category",
				method: "GET",
			}),
			providesTags: ["IncomeAnalytics"],
		}),
		getAllTopSeller: builder.query({
			query: () => ({
				url: "/income-analytic/top-sellers",
				method: "GET",
			}),
			providesTags: ["IncomeAnalytics"],
		}),
	}),
});

export const {
	useGetAllIncomeAnalyticOverviewQuery,
	useGetRevenueGrowthQuery,
	useGetAllRevenueTrendsQuery,
	useGetRevenueCategoryQuery,
	useGetAllTopSellerQuery,
} = incomeAnalyticsApi;
