export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/stats") {
      const visits = await env.ULTIMATE_KV.get("visits") || 0;
      const completions = await env.ULTIMATE_KV.get("completions") || 0;

      return new Response(JSON.stringify({
        visits,
        completions
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/visit") {
      let visits = await env.ULTIMATE_KV.get("visits") || 0;
      visits++;
      await env.ULTIMATE_KV.put("visits", visits);
      return new Response("OK");
    }

    if (url.pathname === "/api/complete") {
      let completions = await env.ULTIMATE_KV.get("completions") || 0;
      completions++;
      await env.ULTIMATE_KV.put("completions", completions);
      return new Response("OK");
    }

    return new Response("Not Found", { status: 404 });
  }
};
