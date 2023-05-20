import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi ({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://hays-backend.onrender.com'}),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getLocations: builder.query({
            query: () => '/tiendas',
            providesTags: ['New', 'Update']
        }),
        postLocation: builder.mutation({
            query: location => ({
                url: '/tienda',
                method: 'POST',
                body: location
            }),
            invalidatesTags: ['New'],
        }),
        updateLocation: builder.mutation({
            query: location => ({
                url: '/tienda',
                method: 'Put',
                body: location,
            }),
            invalidatesTags: ['Update'],
        }),
    })
});


export const {
    useGetLocationsQuery,
    usePostLocationMutation,
    useUpdateLocationMutation,
} = apiSlice;
