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
        const token = localStorage.getItem('auth_token');
        console.log('Token from localStorage:', token ? 'Token exists' : 'No token');

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          console.log('✅ Adding Authorization header');
        } else {
          console.warn('⚠️ No token found - request will fail if auth is required');
        }

        console.log('Request headers:', headers);
        const { data } = await axios.post(url, newPost, { headers });

        console.log('✅ Post created successfully:', data);
        return data;
      } catch (error) {
        console.error('❌ Error creating post:', error);
        if (axios.isAxiosError(error)) {
          console.error('Response data:', error.response?.data);
          console.error('Response status:', error.response?.status);
          console.error('Response headers:', error.response?.headers);
        }
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Post created successfully');
      // Обновляем данные через getServerSideProps без полной перезагрузки страницы
      router.push(router.asPath);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });
};
