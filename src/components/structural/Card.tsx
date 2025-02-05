import React from 'react';
import styles from './Card.module.css';

interface props {
  title: string;
  category?: string;
  image: string;
  date?: string | null;
  disableHover?: boolean;
}

const Card = ({ title, category, image, date, disableHover }: props) => {
  const cardClass = disableHover
    ? styles.card
    : `${styles.card} ${styles.hoverEf}`;

  return (
    <div className={cardClass}>
      <div className={styles.cardContent}>
        <img src={image} referrerPolicy='no-referrer' />
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.info}>
          <p>Category: {category}</p>
          <h3>Date: {date}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
