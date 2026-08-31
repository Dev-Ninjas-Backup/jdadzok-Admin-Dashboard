import baseApi from "../../api/baseApi";

export const cmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({ url: "/about-us", method: "GET" }),
      providesTags: ["CMS"],
    }),
    updateAboutUs: builder.mutation({
      query: (body) => ({ url: "/about-us", method: "PUT", body }),
      invalidatesTags: ["CMS"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({ url: "/privacy-policy", method: "GET" }),
      providesTags: ["CMS"],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: (body) => ({ url: "/privacy-policy", method: "PUT", body }),
      invalidatesTags: ["CMS"],
    }),
    getTerms: builder.query({
      query: () => ({ url: "/terms-and-conditions", method: "GET" }),
      providesTags: ["CMS"],
    }),
    updateTerms: builder.mutation({
      query: (body) => ({
        url: "/terms-and-conditions",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CMS"],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
} = cmsApi;
