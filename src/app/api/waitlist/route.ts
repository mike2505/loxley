/* Waitlist signups. Set WAITLIST_WEBHOOK_URL (e.g. a Discord webhook or a
   Zapier/Make hook) to receive them; without it, signups land in the server
   log so nothing is silently dropped during development. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "invalid email" }, { status: 400 });
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `New waitlist signup: ${email}` }),
    });
    if (!res.ok) {
      console.error(`[waitlist] webhook failed (${res.status}) for ${email}`);
      return Response.json({ ok: false }, { status: 502 });
    }
  } else {
    console.log(`[waitlist] ${new Date().toISOString()} ${email}`);
  }

  return Response.json({ ok: true });
}
