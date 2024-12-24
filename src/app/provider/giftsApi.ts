import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Gift {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const giftsApi = createApi({
  reducerPath: 'giftsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getGifts: builder.query<Gift[], void>({
      query: () => 'products',
      providesTags: ['Products'],
    }),
    updateGift: builder.mutation<Gift, Partial<Gift> & Pick<Gift, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Products'],
    }),
    duplicateGift: builder.mutation<Gift, Pick<Gift, 'id'>>({
      async queryFn({ id }, _queryApi, _extraOptions, baseQuery) {
        const getResponse = await baseQuery(`products/${id}`);
        if (getResponse.error) {
          return { error: getResponse.error };
        }

        const giftToDuplicate = getResponse.data as Gift;

        const { id: _, ...newGiftData } = giftToDuplicate;
        const postResponse = await baseQuery({
          url: `products`,
          method: 'POST',
          body: newGiftData,
        });

        if (postResponse.error) {
          return { error: postResponse.error };
        }

        return { data: postResponse.data as Gift };
      },
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { useGetGiftsQuery, useUpdateGiftMutation, useDuplicateGiftMutation } = giftsApi;
