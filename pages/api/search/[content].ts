// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { searchPostsQuery } from '../../../utils/queries';

/**
 * @define used to connect with User document in Sanity,
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ('GET' === req.method) {
    const { content }: any = req.query;

    const videosQuery = searchPostsQuery(content);

    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);
  }
}
