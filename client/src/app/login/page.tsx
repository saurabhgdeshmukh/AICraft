'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) setError(data.error || 'Invalid credentials')
    else {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/chat')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto mt-32 bg-white/90 dark:bg-background/80 rounded-2xl shadow-2xl p-12 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8 text-primary tracking-tight">Login</h2>
      <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="mb-4 h-12 text-lg" />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="mb-4 h-12 text-lg" />
      {error && <div className="text-red-500 text-base w-full text-center mb-4 bg-red-50 dark:bg-red-900/30 rounded p-3">{error}</div>}
      <Button type="submit" className="w-full h-12 text-lg font-semibold">Login</Button>
    </form>
  )
} 