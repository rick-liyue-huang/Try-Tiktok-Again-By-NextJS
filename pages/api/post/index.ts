// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { allPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

/**
 * @define this is the server, used to connect Database, here database is Sanity project!!!
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ('GET' === req.method) {
    const query = allPostsQuery();

    const data = await client.fetch(query);

    res.status(200).json(data);
  }
}
