import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { VideoCardComponent } from '../../components/VideoCard';
import NoWorkResultComponent from '../../components/NoWorkResult';
import { IUser, Video } from '../../type';
import { NEXT_PUBLIC_BASE_URL } from '../index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../store/authStore';

const SearchPage = ({ videos }: { videos: Video[] }) => {
  const [isAccount, setIsAccount] = useState(false);
  const router = useRouter();
  const { content }: any = router.query;
  const { allUsers } = useAuthStore();

  const account = isAccount ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccount ? 'border-b-2 border-black' : 'text-gray-400';

  const searchedAccount = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(content.toLowerCase())
  );

  return (
    <div className={'w-full'}>
      <div
        className={
          'flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'
        }
      >
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${account}`}
          onClick={() => setIsAccount(true)}
        >
          Account
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccount(false)}
        >
          Videos
        </p>
      </div>

      {isAccount ? (
        <div className={'md:mt-16 '}>
          {searchedAccount.length > 0 ? (
            searchedAccount.map((user: IUser, ids) => (
              <Link href={`/profile/${user._id}`} key={ids}>
                <div
                  className={
                    'flex items-start gap-3 cursor-pointer border-gray-200 border-b-2 pb-2'
                  }
                >
                  <div className={'w-8 h-8'}>
                    <Image
                      src={user.image}
                      width={34}
                      height={34}
                      className={'rounded-full'}
                      alt={'user profile'}
                    />
                  </div>
                  <div className={'hidden xl:block'}>
                    <p
                      className={
                        'flex gap-1 items-center text-md font-bold text-primary lowercase'
                      }
                    >
                      {user.userName.replace(' ', '')}
                      <GoVerified className={'text-pink-600'} />
                    </p>
                    <p className={'capitalize text-gray-400 text-sm'}>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoWorkResultComponent text={`No account result for ${content}`} />
          )}
        </div>
      ) : (
        <div className={'md:mt-16 flex flex-wrap gap-6 md:justify-start'}>
          {videos.length ? (
            videos.map((video: Video, ids) => (
              <VideoCardComponent post={video} key={ids} />
            ))
          ) : (
            <NoWorkResultComponent text={`No video result for ${content}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { content },
}: {
  params: { content: string };
}) => {
  const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/search/${content}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default SearchPage;
