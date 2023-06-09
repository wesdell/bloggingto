import { useRef, useState, useEffect } from 'react';

import { createComment } from '@/services';

interface Props {
  slug: string
}

export function CommentsForm({ slug }: Props) {
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const storeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current!.value = window.localStorage.getItem('blogginto-name') ?? '';
    emailRef.current!.value = window.localStorage.getItem('blogginto-email') ?? '';
  }, []);
  
  
  const handleSubmit = () => {
    setError(false);

    const comment = commentRef.current?.value;
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const store = storeRef.current?.value;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const data = {
      name,
      email,
      comment,
      slug
    };

    if (store) {
      window.localStorage.setItem('blogginto-name', name);
      window.localStorage.setItem('blogginto-email', email);
    } else {
      window.localStorage.removeItem('blogginto-name');
      window.localStorage.removeItem('blogginto-email');
    }

    createComment(data)
      .then(() => {
        setSuccessMessage(true);
        nameRef.current!.value = '';
        emailRef.current!.value = '';
        commentRef.current!.value = '';
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      });
  };
  
  return (
    <section className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave your comment
      </h3>
      <form>
        <article className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            ref={commentRef}
            rows={10}
            name="comment"
            placeholder="Nice post..."
            className="p-4 outline-none resize-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
        </article>
        <article className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
          <input
            ref={nameRef}
            type="text"
            name="name"
            placeholder="John Doe"
            className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="john@gmail.com"
            className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
        </article>
      </form>
      <article className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex items-center">
          <input
            ref={storeRef}
            type="checkbox"
            name="storeInfo"
            id="storeInfo"
            value="false"
          />
          <label
            htmlFor="storeInfo"
            className="ml-2 text-gray-600 cursor-pointer"
          >
            Save my information for the next time
          </label>
        </div>
      </article>
      {error && <p className="text-sm text-red-500">All fields are required.</p>}
      <aside className="flex flex-col gap-4 justify-center items-center mt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="transition duration-500 ease hover:bg-blue-600 bg-blue-800 mt-8 text-white px-8 py-3 text-lg rounded-lg"
        >
          Post comment
        </button>
        {successMessage && <span className="inline-block text-sm text-green-600">Comment submited for review!</span>}
      </aside>
    </section>
  );
}
