export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const filePath = url.pathname.replace(/^\/dl\//, "");
    if (!filePath || filePath === url.pathname) {
      return new Response("パスが指定されていません", { status: 400 });
    }

    try {
      console.log(`Fetching: /public/${filePath}`);
      const targetUrl = new URL(`/public/${filePath}`, url.origin);
      const response = await env.ASSETS.fetch(new Request(targetUrl));
      
      if (response.status === 404) {
        return new Response(`File not found: ${filePath}`, { status: 404 });
      }

      return response;
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  },
};