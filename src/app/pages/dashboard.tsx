import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user's posts
    // This is a placeholder, you'll need to implement the actual API call
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <Link href="/create-post">
        <Button>Create New Post</Button>
      </Link>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
          <Link href={`/post/${post.id}`}>
            <Button variant="link">Read More</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}