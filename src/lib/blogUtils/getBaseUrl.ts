import { headers } from 'next/headers';

// utility function get base url for server-side fetches 
export function getBaseUrl(): string {
    const h = headers();
    const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const url = `${proto}://${host}`;
    console.log('[getBaseUrl] Using headers:', url);
    return url;
}