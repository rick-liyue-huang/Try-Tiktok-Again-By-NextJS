// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from '../../../utils/queries';

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
    const { id } = req.query;

    // @ts-ignore
    const query = singleUserQuery(id);
    // @ts-ignore
    const userVideosQuery = userCreatedPostsQuery(id);
    // @ts-ignore
    const userLikedVideoQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVideosQuery);
    const userLikedVideos = await client.fetch(userLikedVideoQuery);

    res.status(200).json({
      user: user[0],
      userVideos: userVideos,
      userLikedVideos: userLikedVideos,
    });
  }
}
