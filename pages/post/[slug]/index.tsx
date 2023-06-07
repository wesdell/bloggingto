import { GetStaticPaths, GetStaticProps } from 'next';

import { type Post } from '@/interfaces';
import { Layout, PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '@/components';
import { getAllPosts, getPostDetails } from '@/services';

interface Props {
  post: Post
}

export default function PostSlugPage({ post }: Props) {
  return (
    <Layout
      title="BloggingTo | Home"
      description="The best blog web page to find and talk about software development."
    >
      <section className="container mx-auto px-10 mb-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <article className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author= {post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </article>
          <article>
            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
            <Categories />
          </article>
        </section>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.node.slug } }));
  
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const post = await getPostDetails(slug);
  
  return {
    props: {
      post
    }
  };
};
