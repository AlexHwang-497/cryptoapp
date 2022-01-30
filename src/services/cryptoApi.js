import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// ! if you want to review why and how this works, start the video at 45:40

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '52088ff589msh934e619a6274e36p13e241jsn8e54678e0e0e'
}

// const baseUrl = 'https://coinranking1.p.rapidapi.com'


// let pracs = 'coinrankingd6a214fd77047ef58c4539fd872052af50b9019d9f2a4755'



// https://coinranking1.p.rapidapi.com/coins

const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    tiers: '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '6ff9320a50mshdc8783837179528p1cc654jsncecc0742667f'
  }
};

const baseUrl = 'https://coinranking1.p.rapidapi.com/'
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });


// ! look up what is the point of createAPi
export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCryptos: builder.query({
            // *we also need to include the headers in here as well;  this is provided above in the createRequest
            query:(count) => createRequest(`/coins?limit=${count}`)
            // query:(count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
          // *we also need to include the headers in here as well;  this is provided above in the createRequest
          query: (coinId) => createRequest(`coin/${coinId}`),
          // query: (coinId) => createRequest(`/coin/Qwsogvtv82FCd`),
      }),
        getCryptoHistory: builder.query({
          query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeperiod}`),
          // query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
          // query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
      }),
      getExchanges: builder.query({
        query: () => createRequest('coin/Qwsogvtv82FCd/exchanges'),
      }),
    })
})

export const { useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery} = cryptoApi;