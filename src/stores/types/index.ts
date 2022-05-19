export interface LoadingState<T> {
  data: T | null,
  isLoading: boolean,
  error: null
}