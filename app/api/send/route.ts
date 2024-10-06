import { Resend } from 'resend';

import { WelcomeEmail } from '@/emails/welcome-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['aminahmadydeveloper@gmail.com'],
      subject: 'Hello world',
      react: WelcomeEmail({}),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
