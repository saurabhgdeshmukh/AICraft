import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aicraft',
  description: 'Chatbot for HTML & CSS Generation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gradient-to-br from-primary/10 to-secondary/10 min-h-screen"}>
        <Providers>
          <nav className="flex items-center justify-between px-8 py-4 border-b bg-white/80 dark:bg-background/80 shadow-sm rounded-b-xl backdrop-blur-md">
            <div className="font-bold text-2xl tracking-tight text-primary">Aicraft</div>
            <div className="space-x-4">
              <Link href="/login" className="hover:text-primary underline-offset-4 transition-colors">Login</Link>
              <Link href="/signup" className="hover:text-primary underline-offset-4 transition-colors">Signup</Link>
              <Link href="/chat" className="hover:text-primary underline-offset-4 transition-colors">Chat</Link>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto py-10 px-4 w-full flex flex-col gap-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
