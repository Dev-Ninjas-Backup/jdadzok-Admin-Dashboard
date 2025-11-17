import baseApi from "../../api/baseApi";

export const eventApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get All Users
		getAllEventOverview: builder.query({
			query: () => ({
				url: "/events-projects/overview",
				method: "GET",
			}),
			providesTags: ["Events"],
		}),

		getAllEvent: builder.query({
			query: ({ search, page = 1, limit = 10 }) => {
				const params = new URLSearchParams();

				if (search) params.append("search", search);
				params.append("page", page.toString());
				params.append("limit", limit.toString());

				return {
					url: `/events-projects?${params.toString()}`,
					method: "GET",
				};
			},
			providesTags: ["Events"],
		}),

		// suspendUser: builder.mutation({
		// 	query: (id) => ({
		// 		url: `/admin/dashboard/users/${id}/suspend`,
		// 		method: "PATCH",
		// 	}),
		// 	invalidatesTags: ["Users"],
		// }),
		// activeUser: builder.mutation({
		// 	query: (id) => ({
		// 		url: `/admin/dashboard/users/${id}/activate`,
		// 		method: "PATCH",
		// 	}),
		// 	invalidatesTags: ["Users"],
		// }),
	}),
});

export const { useGetAllEventOverviewQuery, useGetAllEventQuery } = eventApi;
