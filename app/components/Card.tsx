import React from "react";
import styles from "./Card.module.css";

interface props {
  title: string;
  description?: string;
  image: string;
  date?: string;
  author?: string;
  disableHover?: boolean;
}

const Card = ({title, description, image, date, author, disableHover}: props) => {
  const cardClass = disableHover ? styles.card: `${styles.card} ${styles.hoverEf}`;
  
  return (
    <div className={cardClass}>
      <div className={styles.cardContent}>
        <img src={image} />
        <h1 className={styles.title}>{title}</h1>
        <h2>{author}</h2>
        <p>{description}</p>
        <h3>{date}</h3>
      </div>
    </div>
  );
};

export default Card;