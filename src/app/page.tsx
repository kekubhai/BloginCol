'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Techno Blog</h1>
      <p className="text-xl mb-8">Share your thoughts with fellow students of Techno Main Salt Lake</p>
      {isSignedIn ? (
        <div className="space-x-4">
          <Link href="/dashboard">
            <Button variant="secondary">Go to Dashboard</Button>
          </Link>
          <Link href="/create">
            <Button>Create a Post</Button>
          </Link>
        </div>
      ) : (
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  )
}