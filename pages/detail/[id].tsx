import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayBtnFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { Video } from '../../type';

export interface IPropsType {
  postDetails: Video;
}

const DetailPage: NextPage<IPropsType> = ({ postDetails }) => {
  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const router = useRouter();

  const handleVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  if (!post) {
    return null;
  }

  return (
    <div
      className={
        'flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'
      }
    >
      <div
        className={
          'relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-gray-300'
        }
      >
        <div className={'absolute top-6 left-2 lg:left-6 flex gap-6 z-50'}>
          <p className={'cursor-pointer'} onClick={() => router.back()}>
            <MdOutlineCancel className={'text-pink-600 text-[35px]'} />
          </p>
        </div>
        <div className={'relative'}>
          <div className={'lg:h-[100vh] h-[60vh]'}>
            <video
              ref={videoRef}
              loop
              onClick={handleVideoClick}
              src={post.video.asset.url}
              className={'h-full cursor-pointer'}
            ></video>
          </div>
          <div className={'absolute top-[45%] left-[45%]'}>
            {!playing && (
              <button>
                <BsFillPlayBtnFill
                  className={'text-pink-600 text-6xl lg:text-8xl'}
                  onClick={handleVideoClick}
                />
              </button>
            )}
          </div>
        </div>
        <div
          className={
            'absolute bottom-5 lg:bottom-10 right-5 lg:r-10 cursor-pointer'
          }
        >
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className={'text-pink-600 text-2xl lg:text-4xl'} />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className={'text-pink-600 text-2xl lg:text-4xl'} />
            </button>
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
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`
  );

  return {
    props: {
      postDetails: data,
    },
  };
};

export default DetailPage;
