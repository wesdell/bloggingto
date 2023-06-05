import { ICategory } from './';

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

export interface MinifiedPost {
  title: string
  featuredImage: FeaturedImage
  createdAt: Date
  slug: string
}
