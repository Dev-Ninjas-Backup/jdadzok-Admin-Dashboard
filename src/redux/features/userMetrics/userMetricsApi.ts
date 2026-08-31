import baseApi from "../../api/baseApi";
import { unwrapApiData } from "../../utils/unwrapApiData";

export const userMetricsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMetrics: builder.query({
      query: (userId: string) => ({
        url: `/user-metrics/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: { data?: unknown }) =>
        response?.data ?? response,
    }),
    getPlatformStats: builder.query({
      query: () => ({ url: "/user-metrics/platform/stats", method: "GET" }),
      transformResponse: (response: { data?: unknown }) =>
        response?.data ?? response,
    }),
    getActivityLeaderboard: builder.query({
      query: (args: { limit?: number; capLevel?: string } = {}) => {
        const searchParams = new URLSearchParams();
        if (args.limit) searchParams.append("limit", String(args.limit));
        if (args.capLevel) searchParams.append("capLevel", args.capLevel);
        return {
          url: `/user-metrics/leaderboard?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data?: unknown }) =>
        response?.data ?? response,
    }),
    recalculateUserScore: builder.mutation({
      query: (userId: string) => ({
        url: `/user-metrics/${userId}/recalculate-score`,
        method: "POST",
      }),
    }),
    manualScoreUpdate: builder.mutation({
      query: ({ userId, newScore, reason, adminId }) => ({
        url: `/user-metrics/${userId}/manual-score-update`,
        method: "POST",
        body: { newScore, reason, adminId, userId },
      }),
    }),
    batchRecalculate: builder.mutation({
      query: (body) => ({
        url: "/user-metrics/batch-recalculate",
        method: "POST",
        body,
      }),
    }),
    getActivityWeights: builder.query({
      query: () => ({ url: "/user-metrics/config/weights", method: "GET" }),
      transformResponse: (response: { data?: unknown }) =>
        response?.data ?? response,
    }),
    updateActivityWeights: builder.mutation({
      query: (body) => ({
        url: "/user-metrics/config/weights",
        method: "PUT",
        body,
      }),
    }),
    getCapStatus: builder.query({
      query: (userId: string) => ({
        url: `/cap-level/status/${userId}`,
        method: "GET",
      }),
      transformResponse: unwrapApiData,
    }),
  }),
});

export const {
  useGetUserMetricsQuery,
  useGetPlatformStatsQuery,
  useGetActivityLeaderboardQuery,
  useRecalculateUserScoreMutation,
  useManualScoreUpdateMutation,
  useBatchRecalculateMutation,
  useGetActivityWeightsQuery,
  useUpdateActivityWeightsMutation,
  useGetCapStatusQuery,
} = userMetricsApi;
