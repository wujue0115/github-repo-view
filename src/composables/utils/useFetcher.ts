import type {
  TFetcherOptions,
  TFetcher,
  TMethod,
  TMethodFetcher,
  TUseFetcher,
} from '@/types';

const useFetcher = (baseOptions: TFetcherOptions = {}): TUseFetcher => {
  const { parseObjectToQueryString } = useUtils();

  const fetcher: TFetcher = async (url, options) => {
    const mergedOptions: TFetcherOptions = {
      ...baseOptions,
      ...options,
    };

    const baseURL = mergedOptions.baseURL || '';
    const queryString = parseObjectToQueryString(mergedOptions.query || {});
    const newURL = `${baseURL}${url}${queryString ? `?${queryString}` : ''}`;

    const { onRequest, onResponse, onError } = mergedOptions;

    try {
      // Handle onRequest interceptor before fetch
      const newOptions = onRequest
        ? await onRequest(mergedOptions)
        : mergedOptions;
      const response = await fetch(newURL, newOptions);
      // Handle onResponse interceptor after fetch
      const newResponse = onResponse ? await onResponse(response) : response;
      return newResponse;
    } catch (error) {
      // Handle onError interceptor when error
      const newError = onError ? await onError(error as Error) : error;
      throw newError;
    }
  };

  const methods: TMethod[] = ['get', 'post', 'put', 'patch', 'delete'];
  const methodFetcher = methods.reduce((acc, method) => {
    acc[method] = (url: string, options: TFetcherOptions = {}) => {
      const mergedOptions: TFetcherOptions = {
        ...options,
        method,
      };
      return fetcher(url, mergedOptions);
    };
    return acc;
  }, {} as TMethodFetcher);

  return Object.assign(fetcher, methodFetcher);
};

export { useFetcher };
