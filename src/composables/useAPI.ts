import type { TFetcherResponse, TFetcherInterceptor } from '@/types';

const githubAPIOptions = {
  baseURL: 'https://api.github.com/',
};

const baseInterceptors: TFetcherInterceptor = {
  async onResponse(response: TFetcherResponse) {
    const newResponse = response;
    const data = await response.json();
    newResponse.data = data;
    return newResponse;
  },
};

const api = useFetcher({
  ...baseInterceptors,
});

const githubAPI = useFetcher({
  ...githubAPIOptions,
  ...baseInterceptors,
});

const useAPI = () => ({
  api,
  githubAPI,
});

export { useAPI };
