import React from 'react';
import './styles.css';
import Link from 'next/link';

const social = () => {
  return (
    <main className='pb-[2rem]'>
      <div className='dividerLine mt-[10rem]' />
      <div className='pagetitle'>
        <h1 className='inline ' style={{ opacity: 0.4 }}>
          SOCIAL
        </h1>
        <h1 className=' inline '>SOCIAL</h1>
        <h1 className='inline ' style={{ opacity: 0.4 }}>
          SOCIAL
        </h1>
      </div>
      <div className='dividerLine mb-[2rem]' />

      <div className='socialZone fade'>
        <iframe
          src='https://www.youtube.com/embed/videoseries?si=BUF2hpBPu9dLiJ7u&amp;list=PLOqutUXroFGw2xRV0iDNehn5MfyNZTyvq'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
        <div className='content'>
          <h1 className='title'>KronTalk!</h1>
          <p>
            Do you want to find out more about robotics? Krontalk is a platform
            where we share insights into the exciting world of robotics, STEM,
            and innovation. From behind-the-scenes stories of our team's
            projects to interviews with members from each department, KronTalk
            is your go-to source for finding out more about this subject.
            Explore our passion for technology, stay updated on our journey, and
            join us in inspiring the next generation of innovators.
          </p>
        </div>
      </div>

      <div className='socialZone fade'>
        <div className='content'>
          <h1 className='title'>Instagram</h1>
          <p>
            Curious about what we’ve been up to? Follow us on Instagram to stay
            updated on everything happening with our team! From exciting events
            and competitions to daily work sessions and behind-the-scenes
            moments, we share it all.
          </p>
        </div>
        <Link href='https://www.instagram.com/kronbot?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
          <i className='fa-brands fa-instagram'></i>
        </Link>
      </div>

      <div className='socialZone fade'>
        <Link href='https://www.tiktok.com/@kronbot_ftc?is_from_webapp=1&sender_device=pc'>
          <i className='fa-brands fa-tiktok'></i>
        </Link>
        <div className='content'>
          <h1 className='title'>TikTok</h1>
          <p>
            Check out our TikTok to see our robotics journey in action! From fun
            and engaging content to sneak peeks into our latest projects, we’re
            bringing innovation and creativity to you in short clips. Be part of
            our adventure and get inspired by all the exciting happenings in our
            world of robotics!
          </p>
        </div>
      </div>

      {/* <div className='socialZone fade'>
        <div className='content'>
          <h1 className='title'>Youtube</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor,
            blanditiis maiores accusamus at iusto mollitia modi. Qui, quo dicta?
            Dolores laborum distinctio error sint hic, quisquam illo quae
            aliquid at.
          </p>
        </div>
        <Link href='https://www.youtube.com/@kronbot9088'>
          <img src='youtube.svg'></img>
        </Link>
      </div> */}
      <div className='bgZone'>
        <div className='socialZone fade'>
          <div className='content'>
            <h1 className='title'>Github</h1>
            <p>
              Explore our open-source projects on GitHub! Our repositories
              showcase the progress we’ve made, the challenges we’ve overcome,
              and the innovative solutions we’ve developed during our robotics
              journey. Dive into our code, contribute, or get inspired by the
              work we’re doing to push the boundaries of technology and STEM.
            </p>
          </div>
          <Link href='https://github.com/kronbot'>
            <i className='fa-brands fa-github'></i>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default social;
