import config from './config';

export function extractBearerToken(authHeader?: string | null): string | null {
  if (!authHeader) {
    return null;
  }

  const [authType, token] = authHeader.split(' ') ?? [];

  if (authType !== 'Bearer') {
    return null;
  }

  return token;
}

export function isAuthenticated(token?: string | null): boolean {
  return extractBearerToken(token) === config.get('SERVER_AUTH_TOKEN');
}

export function unAuthorizedResponse(): Response {
  return new Response('Unauthorized', { status: 401 });
}
