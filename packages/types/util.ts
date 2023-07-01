export type OptionalExcept<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;
