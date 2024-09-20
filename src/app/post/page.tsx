'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    username: string;
    department: string;
    year: number;
  };
  upvotes: string[];
  downvotes: string[];
  comments: {
    id: string;
    content: string;
    author: {
      username: string;
    };
    createdAt: string;
  }[];
  imageUrl?: string;
}

export default function PostDetail() {
  const { id } = useParams(); // Dynamic route id
  const { user } = useUser();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<string>('');

  // Fetch the post based on the dynamic `id`
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return; // Ensure the id is available

      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast({
          title: 'Error',
          description: 'Failed to load post. Please try again.',
          variant: 'destructive',
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to vote.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, voteType }),
      });

      if (!response.ok) throw new Error('Failed to vote');

      const updatedPost: Post = await response.json();
      setPost(updatedPost);
      toast({
        title: 'Success',
        description: `Your ${voteType} has been recorded.`,
      });
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: 'Error',
        description: 'Failed to record your vote. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpvote = () => handleVote('upvote');
  const handleDownvote = () => handleVote('downvote');

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to comment.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, content: comment }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const updatedPost: Post = await response.json();
      setPost(updatedPost);
      setComment('');
      toast({
        title: 'Success',
        description: 'Your comment has been posted.',
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to post your comment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          text: `Check out this post: ${post?.title}`,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: 'Success',
            description: 'Post shared successfully!',
          });
        })
        .catch((error) => {
          console.error('Error sharing:', error);
          toast({
            title: 'Error',
            description: 'Failed to share the post. Please try again.',
            variant: 'destructive',
          });
        });
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast({
            title: 'Success',
            description: 'Post URL copied to clipboard!',
          });
        })
        .catch((error) => {
          console.error('Error copying to clipboard:', error);
          toast({
            title: 'Error',
            description: 'Failed to copy the post URL. Please try again.',
            variant: 'destructive',
          });
        });
    }
  };

  if (!post) return <div>Loading..., Please go back</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.author.username} | {post.author.department} | Year {post.author.year}
      </p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="mb-4 rounded-lg" />
      )}
      <p className="mb-8">{post.content}</p>
      <div className="flex space-x-4 mb-8">
        <Button onClick={handleUpvote}>Upvote ({post.upvotes.length})</Button>
        <Button onClick={handleDownvote}>Downvote ({post.downvotes.length})</Button>
        <Button onClick={handleShare}>Share</Button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {post.comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-4">
          <p>{comment.content}</p>
          <p className="text-sm text-gray-600">
            By {comment.author.username} | {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
      <form onSubmit={handleComment} className="mt-8">
        <Input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <Button type="submit" className="mt-2">
          Post Comment
        </Button>
      </form>
    </div>
  );
}
