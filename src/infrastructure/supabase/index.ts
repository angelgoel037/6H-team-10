/**
 * Supabase Infrastructure Layer
 * Reference: docs/phase-0/03-ARCHITECTURE.md Section 3.4
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
}

export function getSupabaseClientConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return {
    url,
    anonKey,
    serviceRoleKey,
  };
}

export interface DatabaseStatus {
  isConnected: boolean;
  provider: 'supabase';
  timestamp: string;
}
