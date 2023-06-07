import { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import moment from 'moment';

import { type MinifiedPost } from '@/interfaces';
import { getRecentPosts, getRelatedPosts } from '@/services';

interface Props {
  slug?: string
  categories?: string[]
}

export function PostWidget({ slug, categories }: Props) {
  const [postDetails, setPostDetails] = useState<MinifiedPost[]>();

  useEffect(() => {
    if (slug) {
      getRelatedPosts(slug, categories)
        .then(setPostDetails);
    } else {
      getRecentPosts()
        .then(setPostDetails);
    }
  }, [slug, categories]);
  
  return (
    <aside className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Posts' : 'Recent Posts' }
      </h3>
      {
        postDetails?.map((post) => (
          <Link
            href={`/post/${post.slug}`}
            key={post.title}
            className="flex items-center w-full mb-4 p-2 transition duration-500 hover:bg-gray-100"
          >
            <figure className="w-16 flex-none">
              <Image
                unoptimized
                src={post.featuredImage.url}
                width={60}
                height={60}
                alt={post.title}
                className="align-middle rounded-full"
              />
            </figure>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="text-md">
                {post.title}
              </p>
            </div>
          </Link>
        ))
      }
    </aside>
  );
}
