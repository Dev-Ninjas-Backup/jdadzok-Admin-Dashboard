import baseApi from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Users
    getAllUserOverview: builder.query({
      query: () => ({
        url: "/admin/userManagement/user-overview",
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
          url: `/admin/userManagement/users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),

    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/admin/userManagement/users/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    activeUser: builder.mutation({
      query: (id) => ({
        url: `/admin/userManagement/users/${id}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

     updateCaplevel: builder.mutation({
      query: ({ userId, targetLevel, bypassVerification }) => ({
        url: `/settings-admin/updateCaplevel/${userId}`,
        method: "PATCH",
        body: { targetLevel, bypassVerification },
      }),
      // Optional: Automatically refetch data or update tags after mutation
      // invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUserOverviewQuery,
  useSuspendUserMutation,
  useActiveUserMutation,
  useGetAllUserQuery,
  useUpdateCaplevelMutation  
} = userApi;
