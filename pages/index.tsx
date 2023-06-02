import { Categories, PostCard, PostWidget } from '@/components';
import { IPost } from '@/interfaces';

const post: IPost = {
  title: 'Hello World',
  excerpt: 'Lorem ipsum text....'
};

export default function Home() {
  return (
    <section className="container mx-auto px-10 mb-8">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <article className="col-span-1 lg:col-span-8">
          <PostCard post={post} />
        </article>
        <article className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </article>
      </section>
    </section>
  );
}
