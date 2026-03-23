import axios, { AxiosInstance } from 'axios';
import { IHttpClient, HttpOptions } from '../../application/ports/http-client.port';

export class AxiosHttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl: string = '') {
    this.client = axios.create({ baseURL: baseUrl });
  }

  async get<T>(url: string, options?: HttpOptions): Promise<T> {
    const response = await this.client.get<T>(url, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  }

  async post<T>(url: string, body: unknown, options?: HttpOptions): Promise<T> {
    const response = await this.client.post<T>(url, body, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  }

  async put<T>(url: string, body: unknown, options?: HttpOptions): Promise<T> {
    const response = await this.client.put<T>(url, body, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  }

  async delete<T>(url: string, options?: HttpOptions): Promise<T> {
    const response = await this.client.delete<T>(url, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  }
}
