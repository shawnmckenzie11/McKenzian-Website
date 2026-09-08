const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact" || request.method !== "POST") {
      return env.ASSETS.fetch(request);
    }

    if (!env.RESEND_API_KEY) {
      return json({ error: "Email service is not configured." }, 503);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 254);
    const organization = String(body.organization || "").trim().slice(0, 160);
    const service = String(body.service || "").trim().slice(0, 120);
    const description = String(body.description || "").trim().slice(0, 5000);

    if (!name || !emailPattern.test(email) || !description) {
      return json({ error: "Name, a valid email, and project description are required." }, 422);
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL || "McKenzian Website <website@mckenzian.com>",
        to: [env.CONTACT_TO_EMAIL || "solutions@mckenzian.com"],
        reply_to: email,
        subject: `Website inquiry from ${name}`,
        html: `<h2>New McKenzian website inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Organization:</strong> ${escapeHtml(organization || "Not provided")}</p>
          <p><strong>Service:</strong> ${escapeHtml(service || "Not specified")}</p>
          <p><strong>Project description:</strong></p>
          <p>${escapeHtml(description).replaceAll("\n", "<br>")}</p>`,
      }),
    });

    if (!emailResponse.ok) {
      return json({ error: "Email delivery failed." }, 502);
    }

    return json({ success: true });
  },
};
