export async function GET(request) {
  return new Response(
    JSON.stringify({
      message: 'Hello from Next.js API route!',
      time: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}