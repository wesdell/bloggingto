import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import type { Post } from '@/interfaces';
import { Layout, PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '@/components';
import { getAllPosts, getPostDetails } from '@/services';

interface Props {
  post: Post
}

export default function PostSlugPage({ post }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <Layout
      title="BloggingTo | Post"
      description={`${post.excerpt}`}
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
    fallback: true
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
