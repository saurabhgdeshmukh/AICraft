'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    const res = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    if (res.ok) {
      setSuccess('Account created!')
      setTimeout(() => router.push('/login'), 1000)
    } else {
      const data = await res.json()
      setError(data.error || 'Signup failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto mt-32 bg-white/90 dark:bg-background/80 rounded-2xl shadow-2xl p-12 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8 text-primary tracking-tight">Sign Up</h2>
      <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="mb-4 h-12 text-lg" />
      <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="mb-4 h-12 text-lg" />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="mb-4 h-12 text-lg" />
      {error && <div className="text-red-500 text-base w-full text-center mb-4 bg-red-50 dark:bg-red-900/30 rounded p-3">{error}</div>}
      {success && <div className="text-green-600 text-base w-full text-center mb-4 bg-green-50 dark:bg-green-900/30 rounded p-3">{success}</div>}
      <Button type="submit" className="w-full h-12 text-lg font-semibold">Sign Up</Button>
    </form>
  )
} 