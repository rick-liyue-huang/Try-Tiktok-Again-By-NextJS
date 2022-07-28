// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { postDetailQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';
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
  if ('GET' === req.method) {
    const { id } = req.query;
    // @ts-ignore
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if ('PUT' === req.method) {
    const { comment, userId } = req.body;
    const { id }: any = req.query;

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: 'postedBy', _ref: userId },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
}
