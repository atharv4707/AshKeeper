import type {
  AchievementResponse,
  ApiError,
  ClaimResponse,
  CompleteQuestResponse,
  DashboardResponse,
  InventoryItemResponse,
  ItemResponse,
  MeResponse,
  NetworkResponse,
  PlayerProfileResponse,
  ProgressionResponse,
  PurchaseResponse,
  QuestLogEntry,
  QuestResponse,
  RealmResponse,
  SettingsResponse,
  TokenResponse,
} from '../types/api';

const DEFAULT_API_BASE_URL = 'http://localhost:8000';
const TOKEN_STORAGE_KEY = 'ashkeeper_access_token';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '');

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setAuthToken = (token: string | null): void => {
  if (typeof window === 'undefined') return;

  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    return;
  }

  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export class ApiClientError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(message: string, status: number, code: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: unknown,
  requiresAuth = false,
  tokenOverride?: string | null,
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = new Headers();
  const token = tokenOverride ?? (requiresAuth ? getAuthToken() : null);

  if (!(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body === undefined || body === null ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
  });

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const apiError = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};
    const message = typeof apiError.message === 'string' ? apiError.message : 'Request failed.';
    const code = typeof apiError.error === 'string' ? apiError.error : 'API_ERROR';
    throw new ApiClientError(message, response.status, code, payload);
  }

  return (payload ?? null) as T;
}

export const api = {
  get: <T>(path: string, requiresAuth = false, tokenOverride?: string | null) =>
    request<T>(path, 'GET', undefined, requiresAuth, tokenOverride),
  post: <T>(path: string, body?: unknown, requiresAuth = false, tokenOverride?: string | null) =>
    request<T>(path, 'POST', body, requiresAuth, tokenOverride),
  put: <T>(path: string, body?: unknown, requiresAuth = false, tokenOverride?: string | null) =>
    request<T>(path, 'PUT', body, requiresAuth, tokenOverride),
  patch: <T>(path: string, body?: unknown, requiresAuth = false, tokenOverride?: string | null) =>
    request<T>(path, 'PATCH', body, requiresAuth, tokenOverride),
  delete: <T>(path: string, requiresAuth = false, tokenOverride?: string | null) =>
    request<T>(path, 'DELETE', undefined, requiresAuth, tokenOverride),
};

export const authApi = {
  signup: (payload: { username: string; email: string; password: string }) =>
    api.post<TokenResponse>('/auth/signup', payload),
  login: (payload: { email: string; password: string }) =>
    api.post<TokenResponse>('/auth/login', payload),
  me: (tokenOverride?: string | null) =>
    api.get<MeResponse>('/auth/me', true, tokenOverride),
};

export const playerApi = {
  profile: (tokenOverride?: string | null) =>
    api.get<PlayerProfileResponse>('/player/profile', true, tokenOverride),
  dashboard: (tokenOverride?: string | null) =>
    api.get<DashboardResponse>('/player/dashboard', true, tokenOverride),
  progression: (tokenOverride?: string | null) =>
    api.get<ProgressionResponse>('/player/progression', true, tokenOverride),
};

export const questApi = {
  list: (tokenOverride?: string | null) =>
    api.get<QuestResponse[]>('/quests', true, tokenOverride),
  create: (payload: { title: string; description?: string | null; category?: string; attribute?: string; difficulty?: string }, tokenOverride?: string | null) =>
    api.post<QuestResponse>('/quests', payload, true, tokenOverride),
  complete: (questId: string, tokenOverride?: string | null) =>
    api.post<CompleteQuestResponse>(`/quests/${questId}/complete`, undefined, true, tokenOverride),
};

export const achievementApi = {
  list: (tokenOverride?: string | null) =>
    api.get<AchievementResponse[]>('/achievements', true, tokenOverride),
  claim: (achievementId: string, tokenOverride?: string | null) =>
    api.post<ClaimResponse>(`/achievements/${achievementId}/claim`, undefined, true, tokenOverride),
};

export const cacheApi = {
  items: (tokenOverride?: string | null) =>
    api.get<ItemResponse[]>('/cache/items', true, tokenOverride),
  purchase: (itemId: string, tokenOverride?: string | null) =>
    api.post<PurchaseResponse>(`/cache/items/${itemId}/purchase`, undefined, true, tokenOverride),
};

export const inventoryApi = {
  list: (tokenOverride?: string | null) =>
    api.get<InventoryItemResponse[]>('/inventory', true, tokenOverride),
  equip: (itemId: string, tokenOverride?: string | null) =>
    api.post<{ item: ItemResponse; equipped: boolean }>(`/inventory/${itemId}/equip`, undefined, true, tokenOverride),
  unequip: (itemId: string, tokenOverride?: string | null) =>
    api.post<{ item_id: string; equipped: boolean }>(`/inventory/${itemId}/unequip`, undefined, true, tokenOverride),
};

export const worldApi = {
  list: (tokenOverride?: string | null) =>
    api.get<RealmResponse[]>('/world', true, tokenOverride),
};

export const networkApi = {
  list: (tokenOverride?: string | null) =>
    api.get<NetworkResponse>('/network', true, tokenOverride),
  joinSharedQuest: (questId: string, tokenOverride?: string | null) =>
    api.post<unknown>(`/shared-quests/${questId}/join`, undefined, true, tokenOverride),
  contributeSharedQuest: (questId: string, tokenOverride?: string | null) =>
    api.post<unknown>(`/shared-quests/${questId}/contribute`, undefined, true, tokenOverride),
};

export const questLogApi = {
  list: (tokenOverride?: string | null) =>
    api.get<QuestLogEntry[]>('/quest-log', true, tokenOverride),
};

export const settingsApi = {
  update: (body: { sound_enabled?: boolean; reduced_motion?: boolean }, tokenOverride?: string | null) =>
    api.patch<SettingsResponse>('/settings', body, true, tokenOverride),
};

export { ApiError };
