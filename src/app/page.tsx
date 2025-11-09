import { Main } from '../features/Main';
import { PostProps } from '@/types/Post';

interface PageProps {
  searchParams: { type?: PostProps['type'] };
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const type = params.type as PostProps['type'];

  return <Main type={type} />;
};

export default Page;
