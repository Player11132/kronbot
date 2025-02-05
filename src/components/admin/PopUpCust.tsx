import React from 'react';
import style from './PopUp.module.css';

const PopUpCust = (props: { children: React.ReactNode; visible: boolean }) => {
  if (props.visible)
    return (
      <div className={style.cont}>
        <div className={style.popUp}>{props.children}</div>
      </div>
    );
};

export default PopUpCust;
