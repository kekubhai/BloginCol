"use client"

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toast } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';

export default function CreatePost() {
  const { user } = useUser();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      toast({
        title: "Success",
        description: "Your post has been created successfully!",
      });
      router.push(`/posts/${newPost.id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full"
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full min-h-[200px]"
        />
        <Input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          accept="image/*"
          className="w-full"
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
}