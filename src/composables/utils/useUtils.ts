const debounce = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

const throttle = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: any) => {
    if (timer) return;

    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
};

const parseObjectToQueryString = (query: Record<string, any>) => {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&');
  return queryString;
};

export const useUtils = () => ({
  debounce,
  throttle,
  parseObjectToQueryString,
});
