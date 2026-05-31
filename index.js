export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const filePath = url.pathname.replace(/^\/dl\//, "");
    if (!filePath || filePath === url.pathname) {
      return new Response("ファイルパスを指定してください", { status: 400 });
    }
    if (filePath.includes("..")) {
      return new Response("不正なパスです", { status: 403 });
    }

    try {
      const targetUrl = new URL(`/public/${filePath}`, url.origin);
      const file = await env.ASSETS.fetch(new Request(targetUrl));
      
      if (file.status === 404) {
        return new Response("ファイルが見つかりません", { status: 404 });
      }

      return new Response(file.body, {
        headers: {
          ...file.headers,
          "Content-Disposition": `attachment; filename="${filePath.split('/').pop()}"`,
        },
      });
    } catch (e) {
      return new Response("サーバーエラーが発生しました", { status: 500 });
    }
  },
};