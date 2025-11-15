import baseApi from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get All Users
		getAllUserOverview: builder.query({
			query: () => ({
				url: "/admin/dashboard/user-overview",
				method: "GET",
			}),
			providesTags: ["Users"],
		}),

		getAllUser: builder.query({
			query: ({ search, role, status, page = 1, limit = 10 }) => {
				const params = new URLSearchParams();

				if (search) params.append("search", search);
				if (role) params.append("role", role);
				if (status) params.append("status", status);
				params.append("page", page.toString());
				params.append("limit", limit.toString());

				return {
					url: `/admin/dashboard/users?${params.toString()}`,
					method: "GET",
				};
			},
			providesTags: ["Users"],
		}),

		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/blog/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const {
	useGetAllUserOverviewQuery,
	useDeleteUserMutation,
	useGetAllUserQuery,
} = userApi;
