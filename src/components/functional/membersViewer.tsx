import React from 'react';
import { Member } from '@/lib/api/team';
import style from './membersViewer.module.css';
import VCard from '../structural/VCard';
import BinaryBG from '@/components/visual/BinaryBG';

const MembersViewer = (props: { members: Member[]; title: string }) => {
  if (props.members[0].cathegory === 'Mentor') {
    return (
      <div className={'flex flex-col gap-[1rem] bg-[#47171a]'}>
        {props.members.map((mem) => (
          <div className={style.mentor}>
            <div className={'w-[60%]'}>
              <h4 className={'title'}>Mentor</h4>
              <h1>{mem.name}</h1>
              <p>{mem.desc}</p>
            </div>
            <img src={mem.photoURL} referrerPolicy='no-referrer' />
          </div>
        ))}
      </div>
    );
  } else
    return (
      <div>
        <h2 className='subtitle'>{props.title}</h2>
        <div className={style.members}>
          {props.members.map((mem) => (
            <VCard
              image={mem.photoURL}
              title={mem.name}
              subtitle={mem.role}
              key={mem.id}
            />
          ))}
        </div>
      </div>
    );
};

export default MembersViewer;
