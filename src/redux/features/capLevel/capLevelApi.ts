import baseApi from "../../api/baseApi";
import { unwrapApiData } from "../../utils/unwrapApiData";

export const capLevelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPendingBlackReview: builder.query({
      query: () => ({ url: "/cap-level/pending-black-review", method: "GET" }),
      transformResponse: unwrapApiData,
      providesTags: ["CapLevel"],
    }),
    getCapAudit: builder.query({
      query: (userId: string) => ({
        url: `/cap-level/audit/${userId}`,
        method: "GET",
      }),
      transformResponse: unwrapApiData,
    }),
    promoteCapLevel: builder.mutation({
      query: ({ userId, targetLevel, bypassVerification, bypassReason }) => ({
        url: `/cap-level/promote/${userId}`,
        method: "PUT",
        body: { targetLevel, bypassVerification, bypassReason },
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["CapLevel"],
    }),
    getSkyBlueNominations: builder.query({
      query: (status?: string) => ({
        url: status
          ? `/cap-level/sky-blue?status=${status}`
          : "/cap-level/sky-blue",
        method: "GET",
      }),
      transformResponse: unwrapApiData,
      providesTags: ["SkyBlue"],
    }),
    nominateSkyBlue: builder.mutation({
      query: (body) => ({
        url: "/cap-level/sky-blue/nominate",
        method: "POST",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["SkyBlue"],
    }),
    verifySkyBlueKyc: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cap-level/sky-blue/${id}/kyc`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["SkyBlue"],
    }),
    verifySkyBlueNotability: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cap-level/sky-blue/${id}/notability`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["SkyBlue"],
    }),
    approveSkyBlue: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cap-level/sky-blue/${id}/approve`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["SkyBlue"],
    }),
    rejectSkyBlue: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cap-level/sky-blue/${id}/reject`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["SkyBlue"],
    }),
    revokeSkyBlue: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cap-level/sky-blue/${id}/revoke`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["SkyBlue"],
    }),
  }),
});

export const {
  useGetPendingBlackReviewQuery,
  useGetCapAuditQuery,
  usePromoteCapLevelMutation,
  useGetSkyBlueNominationsQuery,
  useNominateSkyBlueMutation,
  useVerifySkyBlueKycMutation,
  useVerifySkyBlueNotabilityMutation,
  useApproveSkyBlueMutation,
  useRejectSkyBlueMutation,
  useRevokeSkyBlueMutation,
} = capLevelApi;
