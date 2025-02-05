'use client';

import React from 'react';
import Counter from '../visual/Counter';
import Style from './StatCard.module.css';

const StatCard = ({
  number,
  icon,
  label
}: {
  number: number;
  icon: string;
  label: string;
}) => {
  return (
    <div className={Style.card}>
      <i className={icon} />
      <span>
        <h2>{label}</h2>
      </span>
      <span>
        <h1>
          <Counter _number={number} duration={2} />
        </h1>
      </span>
    </div>
  );
};

export default StatCard;
