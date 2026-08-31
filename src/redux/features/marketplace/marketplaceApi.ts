import baseApi from "../../api/baseApi";

export const marketplaceApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllMarketplaceOverview: builder.query({
			query: () => ({
				url: "/marketplace/stats",
				method: "GET",
			}),
			providesTags: ["Marketplace"],
		}),

		getAllMarketplace: builder.query({
			query: (args: {
				search?: string;
				featured?: string;
				status?: string;
				page?: number;
				limit?: number;
			} = {}) => {
				const { search, featured, status, page = 1, limit = 10 } = args;
				const params = new URLSearchParams();
				if (search) params.append("search", search);
				if (featured) params.append("featured", featured);
				if (status) params.append("status", status);
				params.append("page", page.toString());
				params.append("limit", limit.toString());
				return {
					url: `/marketplace/products?${params.toString()}`,
					method: "GET",
				};
			},
			providesTags: ["Marketplace"],
		}),
	}),
});

export const { useGetAllMarketplaceOverviewQuery, useGetAllMarketplaceQuery } =
	marketplaceApi;
