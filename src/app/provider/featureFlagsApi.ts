import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FeatureFlags {
  edit: boolean;
  duplicate: boolean;
}

export const featureFlagsApi = createApi({
  reducerPath: 'featureFlags',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['FeatureFlags'],
  endpoints: (builder) => ({
    getFeatures: builder.query<FeatureFlags, void>({
      query: () => 'featureFlags',
      providesTags: ['FeatureFlags'],
    }),
  }),
});

export const { useGetFeaturesQuery } = featureFlagsApi;
