export interface HttpOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export interface IHttpClient {
  get<T>(url: string, options?: HttpOptions): Promise<T>;
  post<T>(url: string, body: unknown, options?: HttpOptions): Promise<T>;
  put<T>(url: string, body: unknown, options?: HttpOptions): Promise<T>;
  delete<T>(url: string, options?: HttpOptions): Promise<T>;
}
