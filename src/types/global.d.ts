declare interface Window {
  AMap: any;
  initAMap: any;
}

declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;
