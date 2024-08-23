export function GET(request,response) {
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}