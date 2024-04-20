import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAPI = createApi({
    reducerPath: 'admin',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => 'accounts',
            providesTags: ['accounts'],
        }),
        getBonuses: builder.query({
            query: () => 'bonuses',
            providesTags: ['bonuses']
        }),
        addAccounts: builder.mutation({
            query: (amount, id) => ({
                url: 'accounts',
                method: 'POST',
                body: { id, amount: +amount }
            }),
            invalidatesTags: ['accounts'],
        }),
        deleteAccounts: builder.mutation({
            query: (id) => ({
                url: `accounts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['accounts'],
        }),
        updateAccounts: builder.mutation({
            query: ({ id, amount }) => ({
                url: `accounts/${id}`,
                method: 'PATCH',
                body: { amount: +amount }
            }),
            invalidatesTags: ['accounts']
        })
    }),
});

export const { useGetAccountsQuery, useGetBonusesQuery, useAddAccountsMutation, useDeleteAccountsMutation, useUpdateAccountsMutation } = adminAPI;