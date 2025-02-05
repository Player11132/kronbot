'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import BinaryBG from './BinaryBG';

const Footer = () => {
  const pathname = usePathname();
  console.log(pathname);
  if (pathname.includes('admin')) return ' ';
  else
    return (
      <div className='footer'>
        <BinaryBG width='100%' height='9rem' count={10000} />
        <div className='socials'>
          <Link href='https://www.instagram.com/kronbot?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
            <i className='fa-brands fa-instagram'></i>
          </Link>
          <Link href='https://www.tiktok.com/@kronbot_ftc?is_from_webapp=1&sender_device=pc'>
            <i className='fa-brands fa-tiktok'></i>
          </Link>
          <Link href='https://www.youtube.com/@kronbot9088'>
            <i className='fa-brands fa-youtube'></i>
          </Link>
          <Link href='https://github.com/kronbot'>
            <i className='fa-brands fa-github'></i>
          </Link>
        </div>
        <div className='mt-[0.4rem] mb-[0.4rem]'>
          Email: <a href='mailto: kronbot@gmail.com'>kronbot@gmail.com</a>
        </div>
        <div className='flex flex-row flex-nowrap text-gray-500'>
          Made with ❤️ and care by:{' '}
          <a href='https://www.instagram.com/telmihai_'>
            <button> @Telea Mihai</button>
          </a>
        </div>
      </div>
    );
};

export default Footer;
