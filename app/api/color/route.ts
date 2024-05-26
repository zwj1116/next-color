
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://tiacodmfuhdbluuvults.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpYWNvZG1mdWhkYmx1dXZ1bHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwMTY1MzIsImV4cCI6MjAyODU5MjUzMn0.TTEhWvjqeFgv0wB9PeRQD9UfRvAdYZiykOk2jfbbIzc')

// 分别对应 http 协议请求中的 get post put delete head 和 options 请求协议
export async function GET(request: Request) {
  const { data } = await supabase.from('color').select('*')
  return Response.json({ status: "GET", data })
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