import React from 'react';
import style from './PopUp.module.css';

const PopUp = (props: {
  text: string;
  labelYes: string;
  actionYes: () => void;
  yesColor?: string;
  labelNo: string;
  actionNo: () => void;
  noColor?: string;
  visible: boolean;
}) => {
  if (props.visible)
    return (
      <div className={style.cont}>
        <div className={style.popUp}>
          <h1>{props.text}</h1>
          <button className={props.noColor ? props.noColor : 'bg-slate-500'} onClick={props.actionNo}>
            {props.labelNo}
          </button>
          <button className={props.yesColor ? props.yesColor: 'bg-blue-600'} onClick={props.actionYes}>
            {props.labelYes}
          </button>
        </div>
      </div>
    );
};

export default PopUp;
