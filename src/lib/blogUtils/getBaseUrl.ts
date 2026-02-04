import { headers } from 'next/headers';

// utility function get base url for server-side fetches 
export function getBaseUrl(): string {
    // During build, use env var; during runtime, use headers
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    const h = headers();
    const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
    const proto = h.get('x-forwarded-proto') ?? 'http';
    return `${proto}://${host}`;
}