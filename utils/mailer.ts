import { Resend } from 'resend';
import config from './config';

const mailer = new Resend(config.get('RESEND_API_KEY'));

export default mailer;
