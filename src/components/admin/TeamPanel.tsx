import React, { useEffect, useState } from 'react';
import { getMembers, editMember, addMember, Member } from '@/lib/api/team';
import style from './Panel.module.css';
import VCard from '../structural/VCard';
import EditPopUp from './EditPopUp';

const TeamPanel = () => {
  const [selectedMember, setSelectedMember] = useState<Member>();
  const [volunteers, setVolunteers] = useState<Member[]>();
  const [members, setMembers] = useState<Member[]>();
  const [mentors, setMentors] = useState<Member[]>();
  const [editing, setEditing] = useState<boolean>(false);

  async function refresh() {
    let team = await getMembers();
    let _volunteers: Member[] = [];
    let _members: Member[] = [];
    let _mentors: Member[] = [];

    team.forEach((mem) => {
      switch (mem.cathegory) {
        case 'Volunteer':
          _volunteers.push(mem);
          break;
        case 'Member':
          _members.push(mem);
          break;
        case 'Mentor':
          _mentors.push(mem);
          break;
      }
    });

    setMembers(_members);
    setVolunteers(_volunteers);
    setMentors(_mentors);
  }

  async function newMember(cat: string) {
    await addMember(cat);
    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={style.cont}>
      <h1 className={style.title}>Mentors</h1>
      <div className={style.area}>
        <div className={style.tallZone}>
          {mentors?.map((mem) => (
            <button
              key={mem.id}
              onClick={() => {
                setSelectedMember(mem);
                setEditing(true);
              }}
            >
              <VCard
                image={mem.photoURL}
                title={mem.name}
                subtitle={mem.role}
                small={true}
              />
            </button>
          ))}
        </div>
        <div className={style.buttons}>
          <button
            className='bg-blue-600'
            onClick={() => {
              newMember('Mentor');
            }}
          >
            Add mentor
          </button>
          <button className='bg-[#2b2728]' onClick={refresh}>
            Refesh
          </button>
        </div>
      </div>

      <h1 className={style.title}>Members</h1>
      <div className={style.area}>
        <div className={style.tallZone}>
          {members?.map((mem) => (
            <button
              key={mem.id}
              onClick={() => {
                setSelectedMember(mem);
                setEditing(true);
              }}
            >
              <VCard
                image={mem.photoURL}
                title={mem.name}
                subtitle={mem.role}
                small={true}
              />
            </button>
          ))}
        </div>
        <div className={style.buttons}>
          <button
            className='bg-blue-600'
            onClick={() => {
              newMember('Member');
            }}
          >
            Add member
          </button>
          <button className='bg-[#2b2728]' onClick={refresh}>
            Refesh
          </button>
        </div>
      </div>

      <h1 className={style.title}>Volunteers</h1>
      <div className={style.area}>
        <div className={style.tallZone}>
          {volunteers?.map((mem) => (
            <button
              key={mem.id}
              onClick={() => {
                setSelectedMember(mem);
                setEditing(true);
              }}
            >
              <VCard
                image={mem.photoURL}
                title={mem.name}
                subtitle={mem.role}
                small={true}
              />
            </button>
          ))}
        </div>
        <div className={style.buttons}>
          <button
            className='bg-blue-600'
            onClick={() => {
              newMember('Volunteer');
            }}
          >
            Add Volunteer
          </button>
          <button className='bg-[#2b2728]' onClick={refresh}>
            Refesh
          </button>
        </div>
      </div>
      {editing ? (
        <EditPopUp
          member={selectedMember!}
          close={() => {
            setEditing(false);
            refresh();
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default TeamPanel;
