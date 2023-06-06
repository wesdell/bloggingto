import { request, gql } from 'graphql-request';

import { type ICategory } from '@/interfaces';

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
