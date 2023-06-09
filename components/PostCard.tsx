import Link from 'next/link';
import Image from 'next/image';

import moment from 'moment';

import type { Post } from '@/interfaces';

interface Props {
  post: Post
}

export function PostCard({ post }: Props) {
  return (
    <section className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <figure className="relative overflow-hidden shadow-md pb-80 mb-6">
        <Image
          unoptimized
          width={100}
          height={100}
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </figure>
      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-blue-400 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>
          {post.title}
        </Link>
      </h1>
      <article className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <figure className="flex items-center justify-center mb-4 lg:mb-0 wfull lg:w-auto mr-8">
          <Image
            unoptimized
            src={post.author.photo.url}
            alt={post.author.name}
            width={40}
            height={40}
            className="align-middle rounded-full"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author.name}
          </p>
        </figure>
        <aside className="font-medium text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </aside>
      </article>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <aside className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-blue-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue reading
          </span>
        </Link>
      </aside>
    </section>
  );
}
