import baseApi from "../../api/baseApi";

export const communitiesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get All Users
		getAllCommunitiesOverview: builder.query({
			query: () => ({
				url: "/community-ngo/overview",
				method: "GET",
			}),
			providesTags: ["Community"],
		}),

		getAllCommunities: builder.query({
			query: ({ search, page = 1, limit = 10 }) => {
				const params = new URLSearchParams();

				if (search) params.append("search", search);

				params.append("page", page.toString());
				params.append("limit", limit.toString());

				return {
					url: `/community-ngo/organizations?${params.toString()}`,
					method: "GET",
				};
			},
			providesTags: ["Community"],
		}),
	}),
});

export const { useGetAllCommunitiesOverviewQuery, useGetAllCommunitiesQuery } =
	communitiesApi;
