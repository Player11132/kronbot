import React from "react";
import styles from "./VCard.module.css";

interface props {
  title: string;
  description?: string;
  image: string;
  date?: string;
  author?: string;
}

const VCard = (prop: props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <img src={prop.image} />
        <h1 className={styles.title}>{prop.title}</h1>
        <h2>{prop.author}</h2>
        <p>{prop.description}</p>
        <h3>{prop.date}</h3>
      </div>
    </div>
  );
};

export default VCard;