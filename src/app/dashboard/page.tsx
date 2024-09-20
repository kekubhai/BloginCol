
"use client"
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
}

export default function Dashboard() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/posts');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch posts: ${errorData.error || response.statusText}`);
        }
        const data = await response.json();
        // Filter posts to only show the current user's posts
        const userPosts = data.filter((post: Post) => post.userId === user?.id);
        setPosts(userPosts);
      } catch (err) {
        console.error('Error details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [user]);


return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <Link href="/create">
        <Button>Create New Post</Button>
      </Link>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Posts</h2>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : posts.length === 0 ? (
        <p>You havenot created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
            <Link href={`/post/${post.id}`}>
              <Button variant="link">Read More</Button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}