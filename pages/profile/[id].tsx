import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { VideoCardComponent } from '../../components/VideoCard';
import NoWorkResultComponent from '../../components/NoWorkResult';
import { IUser, Video } from '../../type';
import { NEXT_PUBLIC_BASE_URL } from '../index';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const ProfilePage: NextPage<IProps> = ({ data }) => {
  const { user, userLikedVideos, userVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videoList, setVideoList] = useState<Video[]>([]);

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const likes = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className={'w-full'}>
      <div className={'flex gap-6 md:gap-10 mb-4 bg-white w-full'}>
        <div className={'w-8 h-8'}>
          <Image
            src={user.image}
            width={34}
            height={34}
            className={'rounded-full'}
            alt={'user profile'}
            layout={'responsive'}
          />
        </div>
        <div>
          <p
            className={
              'flex justify-center items-center md:text-2xl tracking-wider gap-1 items-center text-md font-bold text-primary lowercase'
            }
          >
            {user.userName.replace(' ', '')}
            <GoVerified className={'text-pink-600'} />
          </p>
          <p className={'capitalize text-gray-400 text-sm'}>{user.userName}</p>
        </div>
      </div>

      <div>
        <div
          className={
            'flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'
          }
        >
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${likes}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>

        <div className={'flex gap-6 flex-wrap md:justify-start'}>
          {videoList.length > 0 ? (
            videoList.map((video: Video, ids: number) => (
              <VideoCardComponent post={video} key={ids} />
            ))
          ) : (
            <NoWorkResultComponent
              text={`No ${showUserVideos ? '' : 'Liked'} Video yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default ProfilePage;
