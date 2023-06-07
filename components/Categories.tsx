import Link from 'next/link';

import { useCategories } from '@/hooks';

export function Categories() {
  const { categories } = useCategories();

  return (
    <aside className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Categories
      </h3>
      {
        categories?.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
          >
            <span className="cursor-pointer block p-3 mb-3 transition duration-500 hover:bg-gray-100">
              {category.name}
            </span>
          </Link>
        ))
      }
    </aside>
  );
}
