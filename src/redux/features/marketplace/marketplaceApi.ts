import baseApi from "../../api/baseApi";

export const marketplaceApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get All Users
		getAllMarketplaceOverview: builder.query({
			query: () => ({
				url: "/marketplace/stats",
				method: "GET",
			}),
			providesTags: ["Marketplace"],
		}),

		getAllMarketplace: builder.query({
			query: ({ search, featured, status, page = 1, limit = 10 }) => {
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

		// reviewCommunities: builder.mutation({
		// 	query: ({ id, data }) => ({
		// 		url: `/community-ngo/${id}/review`,
		// 		method: "PATCH",
		// 		body: data,
		// 	}),
		// 	invalidatesTags: ["Community"],
		// }),
	}),
});

export const { useGetAllMarketplaceOverviewQuery, useGetAllMarketplaceQuery } =
	marketplaceApi;
