// authApi.ts
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: "/auth/login",
				method: "POST",
				body: data,
			}),
		}),
		forgetPassword: builder.mutation({
			query: (data: { email: string }) => ({
				url: "/auth/forget-password",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useLoginMutation, useForgetPasswordMutation } = authApi;
