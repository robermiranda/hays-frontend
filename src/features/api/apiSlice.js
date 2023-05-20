import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


function formateLocation (locationResponse) {
    
    const { position, informacion } = locationResponse;

    return {
        id: locationResponse._id,
        lat: position.lat,
        lng: position.lng,
        titulo: informacion.titulo,
        tipo: informacion.tipo,
        gerente: informacion.gerente,
        direccion: informacion.direccion,
        telefono: informacion.telefono,
    }
}

export const apiSlice = createApi ({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://hays-backend.onrender.com'}),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getLocations: builder.query({
            query: () => '/tiendas',
            transformResponse: locationResponse => {
                return locationResponse.map(location => {
                    return formateLocation(location);
                });
            },
            providesTags: ['New', 'Update', 'Delete']
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
        deleteLocation: builder.mutation({
            query: locationId => ({
                url: `/tienda/${locationId}`,
                method: 'Delete',
            }),
            invalidatesTags: ['Delete'],
        }),
    })
});


export const {
    useGetLocationsQuery,
    usePostLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation,
} = apiSlice;
