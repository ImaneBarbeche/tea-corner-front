export type UserRole = 'user' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'deleted' | 'archived';

export interface User {
  id: string;
  display_name: string;
  user_name: string;
  avatar_url: string | null;
  banner_color: string;        // hex, default '#3B82F6'
  bio: string | null;
  email: string;
  role: UserRole;
  status: UserStatus;
  email_verified: boolean;
  terms_accepted_at: string | null;     // ISO date string
  privacy_accepted_at: string | null;   // ISO date string
  username_last_changed: string | null; // ISO date string
  created_at: string;                   // ISO date string
  modified_at: string;                  // ISO date string
  deleted_at: string | null;            // ISO date string
  delete_scheduled_at: string | null;   // ISO date string
}
