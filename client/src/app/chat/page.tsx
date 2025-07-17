'use client'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type Message = {
  id: string;
  content: string;
  html: string;
};

export default function ChatPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')
  const [lastHtml, setLastHtml] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    fetch('https://aicraft-8hlm.onrender.com/api/messages').then(res => res.json()).then(data => setMessages(data.messages || []))
  }, [])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  async function handleSend() {
    if (!prompt.trim()) return
    setLoading(true)
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const res = await fetch('https://aicraft-8hlm.onrender.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ prompt, userId: user.id })
    })
    const data = await res.json()
    if (data.message) {
      setMessages([data.message, ...messages])
      setPreview(data.message.html)
      setLastHtml(data.message.html)
      setPrompt('')
    }
    setLoading(false)
  }

  function handleCopy() {
    if (lastHtml) {
      navigator.clipboard.writeText(lastHtml)
    }
  }

  function handleDownload() {
    if (lastHtml) {
      const blob = new Blob([lastHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'generated.html'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6 bg-white/70 dark:bg-background/80 rounded-xl shadow-lg p-6">
      <div className="flex gap-2 items-center sticky top-0 z-10 bg-white/80 dark:bg-background/80 rounded-xl shadow-sm p-4 mb-2">
        <Input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your landing page..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={loading}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={loading} className="h-10">Send</Button>
        <Button variant="outline" onClick={() => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }} className="h-10">Logout</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 border rounded-xl p-4 h-96 overflow-y-auto bg-white/90 dark:bg-background/70 shadow-md" ref={chatRef}>
          {messages.map((msg, i) => (
            <div key={msg.id || i} className="mb-6 pb-4 border-b last:border-b-0 last:pb-0">
              <div className="font-semibold text-primary mb-1">Prompt:</div>
              <div className="mb-2 whitespace-pre-wrap text-gray-700 dark:text-gray-200">{msg.content}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 border rounded-xl p-4 h-[600px] overflow-y-auto bg-white/90 dark:bg-background/70 flex flex-col shadow-md">
          <div className="font-semibold mb-2 text-primary">Live Preview</div>
          <div className="flex gap-2 mb-2">
            <Button size="sm" onClick={handleCopy} disabled={!lastHtml}>Copy Code</Button>
            <Button size="sm" onClick={handleDownload} disabled={!lastHtml}>Download HTML</Button>
          </div>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto max-h-32 mb-2 border border-gray-200 dark:border-gray-700">{lastHtml}</pre>
          <iframe
            title="Live Preview"
            srcDoc={preview}
            className="w-full flex-1 border rounded-lg shadow-inner bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  )
} 