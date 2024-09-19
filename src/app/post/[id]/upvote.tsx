import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const upvote = await prisma.upvote.create({
        data: {
          postId: parseInt(id as string),
          userId: userId as string,
        },
      });
      return res.status(200).json(upvote);
    } catch (error) {
      return res.status(500).json({ error: 'Error upvoting post' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
