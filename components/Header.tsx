import Link from 'next/link';

import { useCategories } from '@/hooks';

export function Header() {
  const { categories } = useCategories();

  return (
    <header className="container mx-auto px-10 mb-8">
      <section className="border-b w-full inline-block border-blue-400 py-8 md:flex md:justify-between md:items-center">
        <article className="block">
          <Link href="/">
            <span className="font-bold text-4xl text-white cursor-pointer">
              BloggingTo
            </span>
          </Link>
        </article>
        <article className="hidden md:block">
          {categories?.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.slug}>
              <span className="mt-2 align-middle ml-4 font-semibold text-white cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </article>
      </section>
    </header>
  );
}
