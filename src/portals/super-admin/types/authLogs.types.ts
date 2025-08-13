export interface AuthLogin {
  id: string;
  userId?: string | null;
  email: string;
  status: 'SUCCESS' | 'FAILED';
  reason?: string | null;
  ipAddress?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  accuracy?: number | null;
  userAgent?: string | null;
  createdAt: string; // ISO date string
}