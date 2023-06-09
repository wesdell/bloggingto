import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import type { PostNodes } from '@/interfaces';
import { getAllCategories, getCategoryPost } from '@/services';
import { PostCard, Categories, Loader, Layout } from '@/components';

interface Props {
  posts: PostNodes[]
}

export default function CategoryPage ({ posts }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <Layout
      title="BloggingTo | Categories"
      description="Explore all posts based on the category that you choose."
    >
      <section className="container mx-auto px-10 mb-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </article>
          <article className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories />
            </div>
          </article>
        </section>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories();
  const paths = categories.map(({ slug }) => ({ params: { slug } }));
  
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const posts = await getCategoryPost(slug);

  return {
    props: {
      posts
    }
  };
};
