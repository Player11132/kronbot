import React from 'react';
import Style from './DiagonalBG.module.css';

interface props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const DiagonalBG = ({ children, style }: props) => {
  return (
    <div className={Style.cont} style={style?style:{}} {...{ children }}>
      {children}
    </div>
  );
};

export default DiagonalBG;
