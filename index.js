export default {
  async fetch(request, env) {
    if (!env.ASSETS) {
      return new Response("Error: ASSETS binding not found. Check wrangler.toml!", { status: 500 });
    }
    const url = new URL(request.url);
    const filePath = url.pathname.replace(/^\/dl\//, "");
    if (!filePath || filePath === url.pathname) {
      return new Response("パスが指定されていません", { status: 400 });
    }
    const targetRequest = new Request(`${url.origin}/public/${filePath}`);
    
    try {
      const response = await env.ASSETS.fetch(targetRequest);
  
      if (response.status === 404) {
        return new Response("Not Found", { status: 404 });
      }
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Content-Disposition", `attachment; filename="${filePath.split('/').pop()}"`);

      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  },
};