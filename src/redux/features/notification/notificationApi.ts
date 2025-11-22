import baseApi from "../../api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		notification: builder.mutation({
			query: (data) => ({
				url: `/notification-admin/custom-notification`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Notification"],
		}),
		scheduleNotification: builder.mutation({
			query: (data) => ({
				url: `/notification-admin/schedule-custom-notification`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Notification"],
		}),

		getNotificationOverview: builder.query({
			query: () => ({
				url: "/notification-admin/stats",
				method: "GET",
			}),
			providesTags: ["Notification"],
		}),

		latestNotification: builder.query({
			query: () => ({
				url: "/notification-admin/latest",
				method: "GET",
			}),
			providesTags: ["Notification"],
		}),
	}),
});

export const {
	useGetNotificationOverviewQuery,
	useLatestNotificationQuery,
	useScheduleNotificationMutation,
	useNotificationMutation,
} = notificationApi;
