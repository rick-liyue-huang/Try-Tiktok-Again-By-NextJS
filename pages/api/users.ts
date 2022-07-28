// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';
import { allUsersQuery } from '../../utils/queries';

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
    const data = await client.fetch(allUsersQuery());

    if (data) {
      res.status(200).json(data);
    } else {
      res.json([]);
    }
  }
}
