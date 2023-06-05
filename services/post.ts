import { request, gql } from 'graphql-request';

import { MinifiedPost, MinifiedPostsData, PostNodes, PostsData } from '@/interfaces';

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

export const getRecentPosts = async (): Promise<MinifiedPost[]> => {
  const query = gql`
    query RecentPosts() {
      posts (
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const data = await request<MinifiedPostsData>(ENDPOINT, query);
    return data.posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRelatedPosts = async (slug: string, categories: string[]): Promise<MinifiedPost[]> => {
  const query = gql`
    query RelatedPosts($slug: String!, $categories: [String!]) {
      posts (
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const data = await request<MinifiedPostsData>(ENDPOINT, query);
    return data.posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
