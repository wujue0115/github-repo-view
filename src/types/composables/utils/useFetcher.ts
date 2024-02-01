export interface TFetcherResponse<TData = any> extends Response {
  data?: TData;
}

export type TFetcherInterceptor<
  TRequest = RequestInit,
  TResponse = Response,
  TError = Error
> = {
  onRequest?: (options: TRequest) => Promise<TRequest>;
  onResponse?: (response: TResponse) => Promise<TResponse>;
  onError?: (error: TError) => Promise<TError>;
};

export interface TFetcherOptions
  extends TFetcherInterceptor<TFetcherOptions, TFetcherResponse>,
    RequestInit {
  baseURL?: string;
  query?: Record<string, any>;
}

export type TFetcher = (
  url: string,
  options?: TFetcherOptions
) => Promise<TFetcherResponse>;

export type TMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type TMethodFetcher = Record<TMethod, TFetcher>;

export type TUseFetcher = TFetcher & TMethodFetcher;
