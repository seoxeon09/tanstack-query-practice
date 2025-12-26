import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api/posts';
import type { Post } from './api/posts';

export default function App() {
  const { data, isLoading, isError, error, refetch } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return <div>에러 발생 {(error as Error).message}</div>;
  }

  return (
    <div>
      <h1>게시글 목록</h1>
      <button onClick={() => refetch()}>다시 불러오기</button>
      <ul>
        {Array.isArray(data) &&
          data.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
