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
				url: "/notification-admin/stats",
				method: "GET",
			}),
			providesTags: ["SystemSetting"],
		}),

		getPlatform: builder.query({
			query: () => ({
				url: "/notification-admin/latest",
				method: "GET",
			}),
			providesTags: ["SystemSetting"],
		}),
	}),
});

export const { usePlatformMutation, useMaintenanceMutation } =
	systemSettingsApi;
