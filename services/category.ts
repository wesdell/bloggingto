import { request, gql } from 'graphql-request';

import type { PostNodes, ICategory } from '@/interfaces';

const ENDPOINT: string = process.env.NEXT_PUBLIC_HYGRAPH_ENVIRONMENT ?? '';

interface CategoriesData {
  categories: ICategory[]
}

export const getAllCategories = async (): Promise<ICategory[]> => {
  const query = gql`
    query MyPosts {
      categories {
        name
        slug
      }
    }
  `;

  try {
    const data = await request<CategoriesData>(ENDPOINT, query);
    return data.categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};

interface CategoryPostData {
  postsConnection: {
    edges: PostNodes[]
  }
}

export const getCategoryPost = async (slug: string): Promise<PostNodes[]> => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data = await request<CategoryPostData>(ENDPOINT, query, { slug });

  return data.postsConnection.edges;
};
