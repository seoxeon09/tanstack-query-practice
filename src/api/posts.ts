import axios from 'axios';

export type Post = {
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
};

export const createPost = async (post: {
  title: string;
  body: string;
}): Promise<Post> => {
  const res = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    post
  );
  return res.data;
};
