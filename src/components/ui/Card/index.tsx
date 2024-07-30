import React from 'react';
import * as styles from './style.css';

export interface CardProps {
  title: string;
  url: string;
  image: { url: string; width?: number; height?: number };
}

const Component: React.FC<CardProps> = (props) => {
  return (
    <a href={props.url} title={props.title} className={styles.wrapper}>
      <img
        src={props.image.url}
        width={props.image.width}
        height={props.image.height}
        alt={props.title}
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{props.title}</h3>
      </div>
    </a>
  );
};

export const Card = React.memo(Component);
