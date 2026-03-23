import { IHttpClient, HttpOptions } from '../../application/ports/http-client.port';

export class FetchHttpClient implements IHttpClient {
  constructor(private readonly baseUrl: string = '') {}

  private buildUrl(url: string, params?: Record<string, string>): string {
    const fullUrl = `${this.baseUrl}${url}`;
    if (!params || Object.keys(params).length === 0) return fullUrl;
    return `${fullUrl}?${new URLSearchParams(params).toString()}`;
  }

  private async request<T>(url: string, init: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  }

  get<T>(url: string, options?: HttpOptions): Promise<T> {
    return this.request<T>(this.buildUrl(url, options?.params), {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post<T>(url: string, body: unknown, options?: HttpOptions): Promise<T> {
    return this.request<T>(this.buildUrl(url, options?.params), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(body),
    });
  }

  put<T>(url: string, body: unknown, options?: HttpOptions): Promise<T> {
    return this.request<T>(this.buildUrl(url, options?.params), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(body),
    });
  }

  delete<T>(url: string, options?: HttpOptions): Promise<T> {
    return this.request<T>(this.buildUrl(url, options?.params), {
      method: 'DELETE',
      headers: options?.headers,
    });
  }
}
