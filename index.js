export default {
  async fetch(request, env, ctx) {
    // 現在時刻を取得して動的に表示する例
    const now = new Date().toLocaleString("ja-JP");
    
    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>hello world!</h1>
          <p>現在のサーバー時間は: ${now}</p>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};