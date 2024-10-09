import { ZodError } from 'zod';

export const jsonResponse = (data: any, status: number = 200) => {
  return new Response(JSON.stringify(data), { status });
};

export const badRequestResponse = (data: any) => {
  return jsonResponse(data, 400);
};

export const zodErrorOrBadRequestResponse = (error: unknown, message: string = 'Something went wrong') => {
  if (error instanceof ZodError) {
    return badRequestResponse(error.flatten());
  }

  return badRequestResponse({ error: message });
};
