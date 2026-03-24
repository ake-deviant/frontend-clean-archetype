import { ICookieService, CookieOptions } from '../../application/ports/cookie.port';

export class CookieAdapter implements ICookieService {
  get(name: string): string | undefined {
    const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : undefined;
  }

  set(name: string, value: string, options?: CookieOptions): void {
    let cookie = `${name}=${encodeURIComponent(value)}`;

    if (options?.expires !== undefined) {
      const expires =
        options.expires instanceof Date
          ? options.expires.toUTCString()
          : new Date(Date.now() + options.expires * 864e5).toUTCString();
      cookie += `; expires=${expires}`;
    }

    if (options?.path) cookie += `; path=${options.path}`;
    if (options?.domain) cookie += `; domain=${options.domain}`;
    if (options?.secure) cookie += `; Secure`;
    if (options?.sameSite) cookie += `; SameSite=${options.sameSite}`;

    document.cookie = cookie;
  }

  delete(name: string): void {
    this.set(name, '', { expires: new Date(0) });
  }
}
