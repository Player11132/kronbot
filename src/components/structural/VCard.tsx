import React from 'react';
import styles from './VCard.module.css';

interface props {
  title: string;
  subtitle: string;
  image: string;
  small?: boolean;
}

const VCard = (prop: props) => {
  return (
    <div className={prop.small ? styles.small : styles.card}>
      <img src={prop.image} referrerPolicy='no-referrer' />
      <h1 className={styles.title}>{prop.title}</h1>
      <h2 className={styles.subtitle}>{prop.subtitle}</h2>
    </div>
  );
};

export default VCard;
