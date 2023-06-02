import { IPost } from '@/interfaces';

interface Props {
  post: IPost
}

export function PostCard({ post }: Props) {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
}
