import { ICategory } from './';

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
  content: Content
  categories:    ICategory[];
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

export interface MinifiedPost {
  title: string
  featuredImage: FeaturedImage
  createdAt: Date
  slug: string
}

export interface Content {
  raw: Raw;
}

export interface Raw {
  children: RawChild[];
}

export interface RawChild {
  type:     string;
  children: ChildChild[];
}

export interface ChildChild {
  text: string;
}
