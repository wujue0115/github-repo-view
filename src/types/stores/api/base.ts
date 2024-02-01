import type { TFetcherResponse } from '@/types';

export type TBaseResponse<TData = any, TError = Error> =
  | TFetcherResponse<TData>
  | { error: TError };
