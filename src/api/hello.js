export function GET(request,response) {
    return response.send(`Hello from ${process.env.VERCEL_REGION}`);
}