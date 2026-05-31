export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname.startsWith('/dl/')) {
        const filePath = url.pathname.replace(/^\/dl\//, "");
        const response = await env.ASSETS.fetch(new Request(`${url.origin}/${filePath}`));
        
        if (response.status === 200) {
            const newHeaders = new Headers(response.headers);
            newHeaders.set("Content-Disposition", `attachment; filename="${filePath.split('/').pop()}"`);
            return new Response(response.body, { headers: newHeaders });
        }
    }
    
    return env.ASSETS.fetch(request);
  },
};