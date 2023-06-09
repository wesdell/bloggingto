import type { NextApiRequest, NextApiResponse } from 'next';

import { GraphQLClient, gql } from 'graphql-request';

type Data = 
| { message: string }
| { id: string }

interface Response {
  createComment: {
    id: string
  }
}

const ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENVIRONMENT ?? '';
const GRAPHQL_AUTH = process.env.HYGRAPH_AUTH ?? '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === 'POST') {
    return createComment(req, res);
  }
  res.status(200).json({ message: 'John Doe' });
}

const createComment = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { name, email, slug, comment } = req.body;

  const graphqlClient = new GraphQLClient(ENDPOINT, {
    headers: {
      authorization: `Bearer ${GRAPHQL_AUTH}`
    }
  });

  const query = gql`
    mutation CreateComment (
      $name: String!,
      $email: String!,
      $comment: String!,
      $slug: String!,
    ) {
      createComment (
        data: {
          name: $name,
          email: $email,
          comment: $comment,
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const response: Response = await graphqlClient.request(query, {
      name,
      email,
      comment,
      slug
    });
    return res.status(201).json({ id: response.createComment.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong, review server logs.' });
  }
};
