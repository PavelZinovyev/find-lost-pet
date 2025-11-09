'use client';

import React, { useState } from 'react';
import { useCreatePost } from '@/hooks/useCreatePost';
import { PostProps } from '@/types/Post';

import styles from './styles.module.scss';

export const CreatePostForm = () => {
  const { mutate: createPost, isPending } = useCreatePost();
  const [form, setForm] = useState<PostProps>({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    type: 'lost',
  });

  const handleSubmit = (e: React.FormEvent) => {
    const { title, description, latitude, longitude, type } = form;

    e.preventDefault();
    createPost({
      title,
      description,
      latitude,
      longitude,
      type,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <input
        placeholder="Заголовок"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Описание"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Широта"
        value={form.latitude}
        onChange={(e) => setForm({ ...form, latitude: e.target.value })}
      />
      <input
        placeholder="Долгота"
        value={form.longitude}
        onChange={(e) => setForm({ ...form, longitude: e.target.value })}
      />

      <div className={styles.typeButtons}>
        <button
          type="button"
          className={form.type === 'lost' ? styles.active : ''}
          style={{ fontWeight: form.type === 'lost' ? 'bold' : 'normal' }}
          onClick={() => setForm({ ...form, type: 'lost' })}
        >
          Потерял питомца
        </button>
        <button
          type="button"
          className={form.type === 'found' ? styles.active : ''}
          style={{ fontWeight: form.type === 'found' ? 'bold' : 'normal' }}
          onClick={() => setForm({ ...form, type: 'found' })}
        >
          Нашёл питомца
        </button>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Отправка...' : 'Создать пост'}
      </button>
    </form>
  );
};
