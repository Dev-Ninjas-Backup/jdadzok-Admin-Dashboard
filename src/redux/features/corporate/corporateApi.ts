import baseApi from "../../api/baseApi";
import { unwrapApiData } from "../../utils/unwrapApiData";

export const corporateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCorporateTiers: builder.query({
      query: () => ({ url: "/corporate/tiers", method: "GET" }),
      transformResponse: unwrapApiData,
    }),
    getCorporateMemberships: builder.query({
      query: () => ({ url: "/corporate/memberships", method: "GET" }),
      transformResponse: unwrapApiData,
      providesTags: ["Corporate"],
    }),
    createCorporateMembership: builder.mutation({
      query: (body) => ({
        url: "/corporate/memberships",
        method: "POST",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["Corporate"],
    }),
    updateCorporateMembership: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/corporate/memberships/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["Corporate"],
    }),
    updateCorporateEsg: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/corporate/memberships/${id}/esg-report`,
        method: "PATCH",
        body,
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["Corporate"],
    }),
  }),
});

export const {
  useGetCorporateTiersQuery,
  useGetCorporateMembershipsQuery,
  useCreateCorporateMembershipMutation,
  useUpdateCorporateMembershipMutation,
  useUpdateCorporateEsgMutation,
} = corporateApi;
