'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar,AvatarFallback } from '@/components/ui/avatar'
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'

type Post = {
  id: string
  title: string
  content: string
  imageUrl: string | null
  createdAt: string
  author: {
    username: string
    department: string
    year: number
  }
  upvotes: number
  downvotes: number
  comments: {
    id: string
    content: string
    createdAt: string
    author: {
      username: string
    }
  }[]
}

export default function PostDetail() {
  const { id } = useParams()
  const { isSignedIn, user } = useUser()
  const [post, setPost] = useState<Post | null>(null)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`)
        if (!response.ok) throw new Error('Failed to fetch post')
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError('An error occurred while fetching the post.')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  const handleUpvote = async () => {
    if (!isSignedIn) return
    try {
      const response = await fetch(`/api/posts/${id}/upvote`, { method: 'POST' })
      if (!response.ok) throw new Error('Failed to upvote')
      const updatedPost = await response.json()
      setPost(updatedPost)
    } catch (err) {
      console.error('Error upvoting:', err)
    }
  }

  const handleDownvote = async () => {
    if (!isSignedIn) return
    try {
      const response = await fetch(`/api/posts/${id}/downvote`, { method: 'POST' })
      if (!response.ok) throw new Error('Failed to downvote')
      const updatedPost = await response.json()
      setPost(updatedPost)
    } catch (err) {
      console.error('Error downvoting:', err)
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn || !comment.trim()) return
    try {
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment }),
      })
      if (!response.ok) throw new Error('Failed to post comment')
      const updatedPost = await response.json()
      setPost(updatedPost)
      setComment('')
    } catch (err) {
      console.error('Error posting comment:', err)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: 'Check out this post on Techno Blog!',
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying link:', err))
    }
  }

  if (isLoading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!post) return <div className="text-center mt-8">Post not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <p className="text-sm text-gray-500">
            By {post.author.username} | {post.author.department} | Year {post.author.year}
          </p>
        </CardHeader>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />
        )}
        <CardContent className="prose max-w-none mt-4">
          <p>{post.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleUpvote}>
              <ThumbsUp className="w-4 h-4 mr-1" />
              {post.upvotes}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownvote}>
              <ThumbsDown className="w-4 h-4 mr-1" />
              {post.downvotes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4 mr-1" />
              {post.comments.length}
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {post.comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarFallback>{comment.author.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{comment.author.username}</p>
                <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
        </Card>
      ))}

      {isSignedIn && (
        <form onSubmit={handleComment} className="mt-8">
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
            required
          />
          <Button type="submit">Post Comment</Button>
        </form>
      )}
    </div>
  )
}