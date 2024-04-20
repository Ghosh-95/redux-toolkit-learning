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
        })
    }),
});

export const { useGetAccountsQuery, useGetBonusesQuery } = adminAPI;