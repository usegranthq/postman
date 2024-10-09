import { render } from '@react-email/components';
import { z } from 'zod';

import config from '../utils/config';
import { isAuthenticated, unAuthorizedResponse } from '../utils/auth';
import { zodErrorOrBadRequestResponse, jsonResponse } from '../utils/response';
import mailer from '../utils/mailer';

import LoginEmail from '../templates/LoginEmail';

const schema = z.object({
  to: z.string().email(),
  code: z.string(),
});

export async function POST(request: Request) {
  // authenticate the request
  const authorizationHeader = request.headers.get('Authorization');
  if (!isAuthenticated(authorizationHeader)) {
    return unAuthorizedResponse();
  }

  try {
    const requestBody = await request.json();
    schema.parse(requestBody);

    const { to, code } = requestBody;
    const emailHtml = await render(<LoginEmail loginCode={code} />);
    const options = {
      from: config.get('SMTP_FROM'),
      to,
      subject: 'Login to useGrant',
      html: emailHtml,
    };

    await mailer.emails.send(options);
  } catch (error) {
    return zodErrorOrBadRequestResponse(error);
  }

  return jsonResponse({ sent: true });
}
