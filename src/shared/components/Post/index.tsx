import React, { FC } from 'react';

import { PostProps } from '@/types/Post';
import styles from './styles.module.scss';

export const Post: FC<PostProps> = ({ title, description, latitude, longitude }) => {
  return (
    <div className={styles.root}>
      <h3>{title}</h3>
      <span>{description}</span>
    </div>
  );
};
