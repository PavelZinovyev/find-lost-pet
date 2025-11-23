import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';

import { PostProps } from '@/types/Post';

export const useCreatePost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (newPost: PostProps) => {
      console.log('Creating post with data:', newPost);
      const url = `${process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:4000'}/posts`;
      console.log('POST URL:', url);
      
      try {
        const { data } = await axios.post(url, newPost);
        console.log('Post created successfully:', data);
        return data;
      } catch (error) {
        console.error('Error creating post:', error);
        if (axios.isAxiosError(error)) {
          console.error('Response data:', error.response?.data);
          console.error('Response status:', error.response?.status);
        }
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Post created, reloading page...');
      router.reload();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });
};
