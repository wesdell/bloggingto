import { Categories, Layout, PostCard, PostWidget } from '@/components';
import { IPost } from '@/interfaces';

const posts: IPost[] = [
  {
    title: 'Hello World',
    excerpt: 'Lorem ipsum text....'
  }
];

export default function Home() {
  return (
    <Layout
      title="BloggingTo | Home"
      description="The best blog web page to find and talk about software development."
    >
      <section className="container mx-auto px-10 mb-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="col-span-1 lg:col-span-8">
            {
              posts.map((post) => <PostCard post={post} key={post.title} />)
            }
          </article>
          <article className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <PostWidget />
              <Categories />
            </div>
          </article>
        </section>
      </section>
    </Layout>
  );
}
