

import baseApi from "@/redux/api/baseApi";

interface StripeAccountResponse {
  status: string;
  message: string;
  data: {
    url: string;
  };
}

export const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Create Stripe account */
    createStripeAccount: builder.mutation<StripeAccountResponse, void>({
      query: () => ({
        url: "/stripe/create-account",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateStripeAccountMutation } = stripeApi;
