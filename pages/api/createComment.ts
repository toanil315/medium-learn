// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { previewClient } from '../../sanity';

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {_id, name, email, comment} = JSON.parse(req.body);
  try {
    await previewClient.create({
        _type: "comment",
        comment,
        email,
        name,
        post: {
          _ref: _id,
          "_type": "reference"
        },
      })
  }
  catch(error) {
      return res.status(500).json({message: 'Create Comment is failed!'});
  }
  res.status(200).json({ message: 'Comment submitted!' });
}
