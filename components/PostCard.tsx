import { PostNodes } from '@/interfaces';

interface Props {
  post: PostNodes
}

export function PostCard({ post }: Props) {
  return (
    <div>
      {post.node.title}
      {post.node.excerpt}
    </div>
  );
}
