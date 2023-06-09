import { request, gql } from 'graphql-request';

import type { Comment, MinifiedComment } from '@/interfaces';

const ENDPOINT: string = process.env.NEXT_PUBLIC_HYGRAPH_ENVIRONMENT ?? '';

interface CommentData {
  comments: MinifiedComment[]
}

export const getComments = async (slug: string): Promise<MinifiedComment[]> => {
  const query = gql`
    query GetComments ($slug: String!) {
      comments (
        where: { post: { slug: $slug } }
      ) {
        name
        createdAt
        comment
      }
    }
  `;

  try {
    const data = await request<CommentData>(ENDPOINT, query, { slug });
    return data.comments;
  } catch (error) {
    console.log(error);
    return [];
  }
};


export const createComment = async (comment: Comment): Promise<string> => {
  const data = await fetch('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });

  return data.json();
};
