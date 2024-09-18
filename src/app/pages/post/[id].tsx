import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch post details
    // This is a placeholder, you'll need to implement the actual API call
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };
    if (id) fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    // Implement upvote logic
  };

  const handleDownvote = async () => {
    // Implement downvote logic
  };

  const handleComment = async (e) => {
    e.preventDefault();
    // Implement comment logic
  };

  const handleShare = () => {
    // Implement share logic
  };

  if (!post) return <div>Loading...</div>;

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