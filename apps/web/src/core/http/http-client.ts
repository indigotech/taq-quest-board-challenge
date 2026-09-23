const API_BASE_URL = `${import.meta.env.VITE_API_URL ?? ''}/api/v1`;

interface ErrorBody {
  errors?: Array<{ code: string; message: string }>;
}

export class ApiError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    });
  } catch (error) {
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    throw new ApiError(`Could not reach the server (${detail}) at ${API_BASE_URL}${path}`);
  }

  if (!response.ok) {
    const body: ErrorBody = await response.json().catch(() => ({}));
    const error = body.errors?.[0];
    throw new ApiError(error?.message ?? `Request failed with status ${response.status}`, error?.code);
  }

  return response.json();
}
