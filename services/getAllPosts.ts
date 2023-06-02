import { request, gql } from 'graphql-request';

import { PostNodes, PostsData } from '@/interfaces';

const ENDPOINT: string = process.env.NEXT_PUBLIC_HYGRAPH_ENVIRONMENT ?? '';

export const getAllPosts = async (): Promise<PostNodes[]> => {
  const query = gql`
    query MyPosts {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            excerpt
            slug
            title
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data = await request<PostsData>(ENDPOINT, query);
    return data.postsConnection.edges;
  } catch (error) {
    console.log(error);
    return [];
  }
};
