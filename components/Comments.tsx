import { useState, useEffect } from 'react';

import moment from 'moment';

import type { MinifiedComment } from '@/interfaces';
import { getComments } from '@/services';

interface Props {
  slug: string
}

export function Comments ({ slug }: Props) {
  const [comments, setComments] = useState<MinifiedComment[]>([]);

  useEffect(() => {
    getComments(slug)
      .then(setComments);
  }, [slug]);
  
  
  return (
    <>
      {
        comments.length > 0 && (
          <section className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
              {comments.length > 1 ? `${comments.length} comments` : `${comments.length} comment`}
            </h3>
            {
              comments.map((comment) => (
                <article
                  key={comment.createdAt}
                  className="border-b border-gray-100 mb-4 pb-4"
                >
                  <p className="mb-4 text-xs">
                    <span className="font-semibold text-lg">
                      {comment.name}
                    </span>
                    {' '}
                    on
                    {' '}
                    {moment(comment.createdAt).format('MMM DD, YYYY')}
                  </p>
                  <p className="whitespace-pre-line text-gray-600 w-full">
                    {comment.comment}
                  </p>
                </article>
              ))
            }
          </section>
        )
      }
    </>
  );
}
