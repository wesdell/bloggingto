import Image from 'next/image';

import type { Author } from '@/interfaces';

interface Props {
  author: Author
}

export function Author({ author }: Props) {
  return (
    <article className="flex flex-col justify-center items-center text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <figure className=" absolute -top-16">
        <Image
          src={author.photo.url}
          alt={author.name}
          width={100}
          height={100}
          unoptimized
          className="rounded-full"
        />
      </figure>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </article>
  );
}
