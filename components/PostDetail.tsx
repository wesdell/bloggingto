import React from 'react';

import Image from 'next/image';

import moment from 'moment';

import type { Post } from '@/interfaces';
import { getPostContent } from '@/utils';

interface Props {
  post: Post
}

export function PostDetail({ post }: Props) {
  return (
    <section className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <figure className="relative overflow-hidden shadow-md mb-6">
        <Image
          unoptimized
          width={100}
          height={100}
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </figure>
      <section className="px-4 lg:px-0">
        <article className="flex items-center justify-between mb-8 w-full">
          <figure className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            <Image
              unoptimized
              alt={post.author.name}
              height={40}
              width={40}
              className="align-middle rounded-full"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
          </figure>
          <figure className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </figure>
        </article>
        <h1 className="mb-8 text-3xl font-semibold">
          {post.title}
        </h1>
        {
          post.content.raw.children.map((typeObject, idx) => {
            const children = typeObject.children.map((item, itemIdx) => getPostContent(itemIdx, item.text, item));
            return getPostContent(idx, children, typeObject, typeObject.type);
          })
        }
      </section>
    </section>
  );
}
