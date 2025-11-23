import styles from './styles.module.scss';
import { CreatePostForm } from '../CreatePostForm';
import { Post } from '@/shared/components/Post';
import { PostsFilter } from '../PostsFilter';
import { PostProps } from '@/types/Post';

interface MainProps {
  posts: PostProps[];
  type: PostProps['type'] | 'all';
}

export const Main = ({ posts, type }: MainProps) => {
  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <h1>Find Lost Pet</h1>
      </header>
      <section>
        <CreatePostForm />
      </section>
      <section>
        <h2 className={styles.title}>Посты</h2>
        <PostsFilter />
        <div className={styles.posts}>
          {posts.map((post, idx) => (
            <Post key={idx} {...post} />
          ))}
        </div>
      </section>
    </main>
  );
};
