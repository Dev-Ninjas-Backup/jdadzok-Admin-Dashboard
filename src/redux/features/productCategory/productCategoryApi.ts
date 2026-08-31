import baseApi from "../../api/baseApi";

const productCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductCategories: builder.query({
            query: () => ({
                url: "/product-category",
                method: "GET",
            }),
            providesTags: ["ProductCategory"],
        }),

        createProductCategory: builder.mutation({
            query: (data) => ({
                url: "/product-category",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ProductCategory"],
        }),

        getSingleProductCategory: builder.query({
            query: (id) => ({
                url: `/product-category/${id}`,
                method: "GET",
            }),
            providesTags: ["ProductCategory"],
        }),

        deleteProductCategory: builder.mutation({
            query: (id) => ({
                url: `/product-category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ProductCategory"],
        }),

        updateProductCategory: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/product-category/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["ProductCategory"],
        }),
    }),
});

export const {
    useGetProductCategoriesQuery,
    useCreateProductCategoryMutation,
    useGetSingleProductCategoryQuery,
    useDeleteProductCategoryMutation,
    useUpdateProductCategoryMutation,
} = productCategoryApi;