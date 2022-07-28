// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';
import { uuid } from 'uuidv4';

/**
 * @define used to connect with User document in Sanity,
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ('PUT' === req.method) {
    const { userId, postId, like } = req.body;

    const data = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert('after', 'likes[-1]', [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
