import baseApi from "../../api/baseApi";

export const systemSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    platform: builder.mutation({
      query: (data) => ({
        url: `/settings-admin/platform`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SystemSetting"],
    }),
    maintenance: builder.mutation({
      query: (data) => ({
        url: `/settings-admin/maintenance`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SystemSetting"],
    }),

    getMaintenance: builder.query({
      query: () => ({
        url: "/settings-admin/maintenance",
        method: "GET",
      }),
      providesTags: ["SystemSetting"],
    }),

    getPlatform: builder.query({
      query: () => ({
        url: "/settings-admin/platform",
        method: "GET",
      }),
      providesTags: ["SystemSetting"],
    }),

    createSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SystemSetting"],
    }),

    /** GET SETTINGS */
    getSettings: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["SystemSetting"],
    }),
  }),
});

export const {
  usePlatformMutation,
  useMaintenanceMutation,
  useGetMaintenanceQuery,
  useGetPlatformQuery,
  useCreateSettingsMutation,
  useGetSettingsQuery,
} = systemSettingsApi;
