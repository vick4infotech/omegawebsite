export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: http://localhost:3000/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
