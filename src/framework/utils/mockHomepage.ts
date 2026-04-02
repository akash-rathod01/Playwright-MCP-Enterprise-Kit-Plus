export const MOCK_HOMEPAGE_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example Domain</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root { font-family: Arial, Helvetica, sans-serif; color: #1f2933; background: #f8fafc; }
      body { margin: 0; display: flex; min-height: 100vh; align-items: center; justify-content: center; }
      main { max-width: 32rem; padding: 2rem; background: #ffffff; border-radius: 0.75rem; box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12); }
      h1 { font-size: 2rem; margin-top: 0; }
      p { line-height: 1.6; }
      a.button { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.25rem; background: #2563eb; color: #fff; border-radius: 0.5rem; text-decoration: none; font-weight: 600; }
      a.button:focus-visible { outline: 3px solid #93c5fd; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main>
      <h1>Example Domain</h1>
      <p>This lightweight page is served from a mock handler so Playwright tests can run without external network access.</p>
      <a class="button" href="#" role="button">Explore</a>
    </main>
  </body>
</html>`;
