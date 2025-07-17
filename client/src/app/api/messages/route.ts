import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://aicraft-8hlm.onrender.com/api/messages', {
    method: 'GET',
    credentials: 'include',
  })
  const data = await res.json()
  return NextResponse.json(data)
} 