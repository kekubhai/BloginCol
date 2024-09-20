import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/app/lib/prisma';


export async function POST(request: Request) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const image = formData.get('image') as File | null;

    let imageUrl = null;
    if (image) {
      // Here you would typically upload the image to a service like Cloudinary or AWS S3
      // and get back the URL. For this example, we'll just use a placeholder URL.
      imageUrl = 'https://placeholder.com/image.jpg';
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        authorId: userId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}