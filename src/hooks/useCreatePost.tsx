import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEYS } from '@/constants/queryKeys';

import { PostProps } from '@/types/Post';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: PostProps) => {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/posts`, newPost);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
    },
  });
};
