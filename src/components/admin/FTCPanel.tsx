'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Card from '../structural/Card';
import {
  getSeasons,
  getDefaultSeason,
  addSeason,
  Season
} from '@/lib/api/season';

import style from './Panel.module.css';

const FTCPanel = () => {
  const [seasons, setSeasons] = useState<Season[]>();
  const [defaultSeason, setDefault] = useState<Season>();
  const router = useRouter();

  async function refresh() {
    setSeasons(await getSeasons(false, false));
    setDefault(await getDefaultSeason());
  }

  async function newSeason() {
    const newSeason = await addSeason();
    router.push(`/admin/FTCedit?id=${newSeason}`);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={style.cont}>
      <h1 className={style.title}>Current Season</h1>
      <div className={style.area}>
        {defaultSeason ? (
          <Link
            href={{
              pathname: '/admin/FTCedit',
              query: { id: defaultSeason.id }
            }}
          >
            {' '}
            <Card
              title={defaultSeason.name}
              image={defaultSeason.logo}
              disableHover={true}
            />{' '}
          </Link>
        ) : (
          <h1>No default season</h1>
        )}
      </div>
      <h1 className={style.title}>Other Seasons</h1>
      <div className={style.area}>
        <div className={style.zone}>
          {seasons?.map((season) => (
            <Link
              href={{
                pathname: '/admin/FTCedit',
                query: { id: season.id }
              }}
              key={season.id}
            >
              <Card
                title={season.name}
                image={season.logo}
                disableHover={true}
              />
            </Link>
          ))}
        </div>
        <div className={style.buttons}>
          <button className='bg-blue-600' onClick={newSeason}>
            Add Season
          </button>
          <button className='bg-[#2b2728]' onClick={refresh}>
            Refesh
          </button>
        </div>
      </div>
    </div>
  );
};

export default FTCPanel;
