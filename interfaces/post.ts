import { ICategory } from './';

export interface PostsData {
  postsConnection: {
    edges: PostNodes[]
  }
}

export interface PostNodes {
  node: Post
}

export interface Post {
  author:        Author;
  createdAt:     Date;
  excerpt:       string;
  slug:          string;
  title:         string;
  featuredImage: FeaturedImage;
  category:      ICategory;
}

export interface Author {
  bio:   string;
  id:    string;
  name:  string;
  photo: FeaturedImage;
}

export interface FeaturedImage {
  url: string;
}
