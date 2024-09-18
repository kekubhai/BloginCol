import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        upvotes: true,
        downvotes: true,
      },
    });
    return res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, content, imageUrl } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        author: { connect: { clerkId: userId } },
      },
    });
    return res.status(201).json(post);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}