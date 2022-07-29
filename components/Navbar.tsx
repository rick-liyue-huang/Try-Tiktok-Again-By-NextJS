import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { GoogleLogin, GoogleLogout } from 'react-google-login'; // replace by '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { MdOutlineLogout } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/singlelogo.webp';
import { createOrGetUser } from '../utils';
import { useAuthStore } from '../store/authStore';

export const NavbarComponent: React.FC = () => {
  // apply the Zustand here
  const { userProfile, addUser, removeUser } = useAuthStore();

  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
      setSearchValue('');
    }
  };

  // @ts-ignore
  return (
    <div
      className={
        'w-full flex justify-between items-center border-b-2 border-gray-200 py-2'
      }
    >
      <Link href={'/'}>
        <div className={'w-[100px] h-[100px] md:w-[130px]'}>
          <Image
            className={'cursor-pointer'}
            src={Logo}
            alt={'Tiktok'}
            layout={'responsive'}
          />
        </div>
      </Link>

      <div className={'relative hidden md:block'}>
        <form
          action=""
          className={'absolute md:static top-10 left-20 bg-white'}
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={'search account or video'}
            className={
              'bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-400 w-[300px] md:w-[360px] rounded-xl'
            }
          />
          <button
            onClick={handleSearch}
            className={
              'absolute md:right-4 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-500'
            }
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className={'flex gap-5 md:gap-10'}>
            <Link href={'/upload'}>
              <button
                className={
                  'border-2 px-2 md:px-4 text-md font-semibold flex items-center'
                }
              >
                <IoMdAdd className={'text-xl'} />{' '}
                <span className={'hidden md:block'}>Upload</span>
              </button>
            </Link>
            {/*@ts-ignore*/}
            {userProfile.image && (
              <Link href={'/'}>
                <>
                  <Image
                    width={40}
                    height={40}
                    className={'rounded-full cursor-pointer'}
                    // @ts-ignore
                    src={userProfile.image}
                    alt={'profile photo'}
                  />
                </>
              </Link>
            )}
            <button
              type={'button'}
              className={'px-2'}
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <MdOutlineLogout color={'#F51997'} fontSize={30} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  );
};
