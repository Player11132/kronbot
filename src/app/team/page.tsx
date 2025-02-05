import React from 'react';
import { getMembers, Member } from '@/lib/api/team';
import './styles.css';
import MembersViewer from '@/components/functional/membersViewer';
import BinaryBG from '@/components/visual/BinaryBG';
import DiagonalBG from '@/components/visual/DiagonalBG';

export default async function team() {
  let volunteers: Member[] = [];
  let members: Member[] = [];
  let mentors: Member[] = [];
  let memberCount: number = 0;

  const Members = await getMembers();
  Members.forEach((mem) => {
    memberCount++;
    switch (mem.cathegory) {
      case 'Volunteer':
        volunteers.push(mem);
        break;
      case 'Member':
        members.push(mem);
        break;
      case 'Mentor':
        mentors.push(mem);
        break;
    }
  });

  return (
    <main className='cnt'>
      <div
        style={{
          position: 'relative',
          transform: 'skew(10deg, 0)',
          width: '100%',
          background: '#1d1a1b',
          left: '-10rem'
        }}
      >
        <BinaryBG width={'100%'} height={'20rem'} count={10000} />
        <div className='banner'>
          <div className='logo'>
            <img src='/logo.svg' />
            <img src='/kronbot.svg' className='w-[30rem]' />
          </div>
          <div className='w-[0.5rem] h-[90%] bg-[#7c1838] justify-self-center m-[2rem]' />
          <h1>19103</h1>
        </div>
      </div>
      <div className='info'>
        <div className='bgPoint'>
          <div className={'point'}>
            <div
              className={
                'flex flex-col gap-[1rem] justify-start items-start p-[1rem]'
              }
            >
              <h1>ABOUT US</h1>
              <p>
                Kronbot is a team of {memberCount} members from the National
                College of Informatics "Grigore Moisil" Brasov-Romania. We are a
                team of passionate students who are passionate about programming
                and robotics. We strive to innovate and improve our skills every
                day, working together to overcome challenges and achieve great
                things. Our journey is a blend of learning, collaboration, and
                the unending pursuit of excellence, showcasing the spirit of
                teamwork and determination.
              </p>
            </div>
            <img src='https://www.monitorulexpres.ro/wp-content/uploads/2023/12/82337817_111128617088050_885937670243483648_n.jpg' />
          </div>
        </div>
        <div className='bgPoint'>
          <div className='point flipped'>
            <div
              className={
                'flex flex-col gap-[1rem] justify-start items-start p-[1rem]'
              }
            >
              <h1>OUR MISSION</h1>
              <p>
                Our main focus is creating a robot that can compete in the FTC
                competition, while also creating useful robots and projects for
                the community. Our main focus is creating a robot that can
                compete in the FTC competition, while also creating useful
                robots and projects for the community. We aim to encourage
                innovation, foster critical thinking, and promote teamwork among
                students through hands-on experience. By participating in these
                competitions, we not only develop technical skills but also
                learn the importance of perseverance, creativity, and
                collaboration. Our projects are designed to inspire the next
                generation of innovators and contribute to technological
                advancements that benefit society as a whole.
              </p>
            </div>
            <img
              src='https://lh3.googleusercontent.com/d/1sww50L23TK9_yqgECtqnFScIya58i4zL'
              referrerPolicy='no-referrer'
            />
          </div>
        </div>
      </div>
      <div className='w-[100%] skew-x-[-10deg] mt-[2rem] mb-[2rem]'>
        <div className='w-[100%] h-[10rem] justify-self-center'>
          <div className='dividerLine' />
          <h1 className={'title'}>meet the team!</h1>
          <div className='dividerLine' />
        </div>
      </div>
      <MembersViewer members={mentors} title='Mentors' />
      <MembersViewer members={members} title='Members' />
      <MembersViewer members={volunteers} title='Volunteers' />
    </main>
  );
}
