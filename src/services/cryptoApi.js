import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// ! if you want to review why and how this works, start the video at 45:40

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '6ff9320a50mshdc8783837179528p1cc654jsncecc0742667f'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '6ff9320a50mshdc8783837179528p1cc654jsncecc0742667f'
  }
};

// ! look up what is the point of createAPi
export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCryptos: builder.query({
            // *we also need to include the headers in here as well;  this is provided above in the createRequest
            query:(count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
          // *we also need to include the headers in here as well;  this is provided above in the createRequest
          query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
        getCryptoHistory: builder.query({
          query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
      }),
      getExchanges: builder.query({
        query: () => createRequest('/exchanges'),
      }),
    })
})

export const { useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery} = cryptoApi;