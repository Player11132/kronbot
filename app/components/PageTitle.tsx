import React from "react";
import styles from "./PageTitle.module.css";

interface props {
  n: number;
  content: string;
  vertical: boolean;
}

const PageTitle = ({ n, content, vertical }: props) => {
  if (vertical)
    return (
      <div className="fade">
        {Array.from({ length: n }, (_, index) => (
          <h1
            key={index}
            className={styles.Vtitle}
            style={{
              opacity: 1 - (index / (n - 1)) * 0.8,
            }}
          >
            {content}
          </h1>
        ))}
      </div>
    );
  else
    return (
      <div className={styles.container}>
        {Array.from({ length: n }, (_, index) => (
          <h1
            key={index}
            className={styles.Htitle}
            style={{
              opacity: 1 - (index / (n - 1)) * 0.8,
            }}
          >
            {content}
          </h1>
        ))}
      </div>
    );
};

export default PageTitle;
