import React, { useRef, useState } from 'react';
import { Video } from '../type';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import {
  BsFilePlayFill,
  BsFillPauseCircleFill,
  BsFillPauseFill,
  BsPlay,
} from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { set } from 'husky';

export const VideoCardComponent: React.FC<{ post: Video }> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMutated, setIsVideoMutated] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className={'flex flex-col border-b-2 border-gray-200 pb-6'}>
      <div>
        <div className={'flex gap-3 p-2 cursor-pointer font-semibold rounded'}>
          <div className={'md:w-16 md:h-16 w-10 h-10'}>
            <Link href={'/'}>
              <>
                <Image
                  width={62}
                  height={62}
                  className={'rounded-full'}
                  src={post.postedBy.image}
                  alt={'profile photo'}
                  layout={'responsive'}
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={'/'}>
              <div className={'flex items-center gap-2'}>
                <p
                  className={
                    'flex gap-2 items-center md:text-md font-bold text-primary'
                  }
                >
                  {post.postedBy.userName}{' '}
                  <GoVerified className={'text-[#F51997]'} />
                </p>
                <p className={'capitalize font-medium text-gray-500 md:block'}>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* video part */}
      <div className={'lg:ml-20 flex gap-4 relative'}>
        <div
          className={'rounded-3xl'}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              className={
                'w-[200px] h-[300px] md:h-[400px] lg:w-[800px] lg:h-[500px] rounded-3xl cursor-pointer bg-gray-100'
              }
              src={post.video.asset.url}
            />
          </Link>
          {isHover && (
            <div
              className={
                'absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 bg-pink-300 flex gap-10  lg:w-[600px] lg:justify-around w-[100px] md:w-[50px] p-3'
              }
            >
              {playing ? (
                <button onClick={handleVideoPress}>
                  <BsFillPauseFill
                    className={'text-black text-2xl lg:text-4xl'}
                  />
                </button>
              ) : (
                <button onClick={handleVideoPress}>
                  <BsFilePlayFill
                    className={'text-black text-2xl lg:text-4xl'}
                  />
                </button>
              )}
              {isVideoMutated ? (
                <button onClick={() => setIsVideoMutated(false)}>
                  <HiVolumeOff className={'text-black text-2xl lg:text-4xl'} />
                </button>
              ) : (
                <button onClick={() => setIsVideoMutated(true)}>
                  <HiVolumeUp className={'text-black text-2xl lg:text-4xl'} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
