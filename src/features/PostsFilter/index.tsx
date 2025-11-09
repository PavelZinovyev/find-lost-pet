// features/PostsFilter.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.scss';
import { PostProps } from '@/types/Post';

const TYPES: { label: string; value: PostProps['type'] }[] = [
  { label: 'Потерялись', value: 'lost' },
  { label: 'Нашлись', value: 'found' },
];

export const PostsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') ?? 'all';

  const handleChange = (type: PostProps['type'] | 'all') => {
    const params = new URLSearchParams();
    if (type !== 'all') params.set('type', type);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={styles.root}>
      <button
        onClick={() => handleChange('all')}
        style={{ fontWeight: currentType === 'all' ? 'bold' : 'normal' }}
      >
        Все
      </button>
      {TYPES.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleChange(filter.value)}
          style={{ fontWeight: currentType === filter.value ? 'bold' : 'normal' }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
