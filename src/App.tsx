import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost } from './api/posts';
import type { Post } from './api/posts';

export default function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { data } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(['posts'], (old) =>
        old ? [newPost, ...old] : [newPost]
      );
    },
  });

  return (
    <div>
      <h2>게시글 등록</h2>

      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="내용"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        onClick={() => {
          mutate({ title, body });
          setTitle('');
          setBody('');
        }}
      >
        등록
      </button>

      <hr />

      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
