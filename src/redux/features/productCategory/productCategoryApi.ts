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

        updateProductCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/product-category/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["ProductCategory"],
        }),

        deleteProductCategory: builder.mutation({
            query: (id) => ({
                url: `/product-category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ProductCategory"],
        }),
    }),
});

export const {
    useGetProductCategoriesQuery,
    useCreateProductCategoryMutation,
    useUpdateProductCategoryMutation,
    useDeleteProductCategoryMutation,
} = productCategoryApi;