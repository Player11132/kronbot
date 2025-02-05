import React from 'react'
import styles from './Waves.module.css'

interface Props{
  children: React.ReactNode;
}

const Waves: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
  

        <svg
          className={styles.waves}
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={styles.parallax}>
            <use xlinkHref="#gentle-wave" x="43" y="-1" fill="#330916" />
            <use xlinkHref="#gentle-wave" x="80" y="6" fill="#5E1715" />
            <use xlinkHref="#gentle-wave" x="40" y="7" fill="#320E0F" />
            <use xlinkHref="#gentle-wave" x="50" y="3" fill="#100101" />
            <use xlinkHref="#gentle-wave" x="60" y="5" fill="#290510" />
          </g>
        </svg>
      </div>
      </div>
  )
}

export default Waves