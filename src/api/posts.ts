import axios from 'axios';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
};
