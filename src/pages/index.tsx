import { GetServerSideProps } from 'next';
import { Main } from '@/features/Main';
import { PostProps } from '@/types/Post';

interface HomeProps {
  posts: PostProps[];
  type: PostProps['type'] | 'all';
}

export default function Home({ posts, type }: HomeProps) {
  return <Main posts={posts} type={type} />;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const { type } = context.query;

  const url = new URL('http://localhost:4000/posts');
  if (type && type !== 'all' && ['lost', 'found'].includes(type as string)) {
    url.searchParams.set('type', type as string);
  }

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const posts: PostProps[] = await res.json();

    return {
      props: {
        posts,
        type: (type as PostProps['type']) || 'all',
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
        type: 'all',
      },
    };
  }
};
