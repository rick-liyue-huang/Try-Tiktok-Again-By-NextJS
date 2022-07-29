// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { topicPostsQuery } from '../../../utils/queries';

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
    const { topic }: any = req.query;
    const videoQuery = topicPostsQuery(topic);

    const videos = await client.fetch(videoQuery);

    res.status(200).json(videos);
  }
}
