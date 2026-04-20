export type UserProfile = {
  id: number;
  name: string;
  email: string;
  role: string;
  institution: string;
  joinDate: string;
  xp: number;
  level: number;
  maxXp: number;
  challengesCompleted: number;
  projectsCompleted: number;
  rank: string;
};

export type ApiError = {
  message?: string;
};

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((body as ApiError).message || response.statusText);
  }

  return body as T;
}

export function getAuthToken() {
  return window.localStorage.getItem('codesmic_token');
}

export function saveAuthToken(token: string) {
  window.localStorage.setItem('codesmic_token', token);
}

export function removeAuthToken() {
  window.localStorage.removeItem('codesmic_token');
  window.localStorage.removeItem('codesmic_user');
}

export function saveUserProfile(user: UserProfile) {
  window.localStorage.setItem('codesmic_user', JSON.stringify(user));
}

export function getStoredUserProfile() {
  const raw = window.localStorage.getItem('codesmic_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}
