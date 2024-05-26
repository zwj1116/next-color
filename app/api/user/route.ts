// 分别对应 http 协议请求中的 get post put delete head 和 options 请求协议
export async function GET(request: Request) {
  return Response.json({ status: "GET" })
}
export async function POST(request: Request) {
  return Response.json({ status: "POST" })
}
export async function PUT(request: Request) {
  return Response.json({ status: "PUT" })
}
export async function DELTE(request: Request) {
  return Response.json({ status: "DELTE" })
}
export async function HEAD(request: Request) {
  return Response.json({ status: "HEAD" })
}
export async function OPTIONS(request: Request) {
  return Response.json({ status: "OPTIONS" })
}