import React from 'react';
import style from './EditPopUp.module.css';
import { Member, removeMember, editMember } from '@/lib/api/team';
import { VerifyImageLink } from '@/lib/api/events';

const EditPopUp = ({
  member,
  close
}: {
  member: Member;
  close: () => void;
}) => {
  return (
    <div className={style.cont}>
      <div className={style.popUp}>
        <div className='area'>
          <input
            type='text'
            defaultValue={member.name}
            onChange={(e) => {
              member.name = e.target.value;
            }}
          ></input>
          <br></br>
          <select
            defaultValue={member.cathegory}
            onChange={(e) => {
              member.cathegory = e.target.value as
                | 'Mentor'
                | 'Volunteer'
                | 'Member';
            }}
          >
            <option value='Volunteer'>Volunteer</option>
            <option value='Member'>Member</option>
            <option value='Mentor'>Mentor</option>
          </select>
          <br />
          <select
            defaultValue={member.role}
            onChange={(e) => {
              member.role = e.target.value as
                | 'Mechanic'
                | 'Programmer'
                | '3D Modeler'
                | 'Public Relations';
            }}
          >
            <option value='Mechanic'>Mechanic</option>
            <option value='Programmer'>Programmer</option>
            <option value='3D Modeler'>3D Modeler</option>
            <option value='Public Relations'>Public Relations</option>
          </select>
          <br />
          <input
            type='text'
            defaultValue={member.photoURL}
            onChange={(e) => {
              member.photoURL = e.target.value;
            }}
            onSubmit={(e) => {
              e.preventDefault();
              member.photoURL = VerifyImageLink(member.photoURL);
            }}
          ></input>
          <br></br>
          <img src={member?.photoURL} referrerPolicy='no-referrer' />
          <textarea
            className={'text-black w-[30rem] m-[1rem] h-[30rem]'}
            defaultValue={member.desc}
            onChange={(e) => {
              member.desc = e.target.value;
            }}
          ></textarea>
        </div>
        <button
          className='bg-red-600'
          onClick={() => {
            removeMember(member.id);
            close();
          }}
        >
          Delete
        </button>
        <button
          className='bg-blue-600'
          onClick={() => {
            member.photoURL = VerifyImageLink(member.photoURL);
            editMember(member);
            close();
          }}
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
};

export default EditPopUp;
