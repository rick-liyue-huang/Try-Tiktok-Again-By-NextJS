import React, { useState, useEffect, useRef, FormEvent } from 'react';
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
import { useAuthStore } from '../../store/authStore';
import { LikeButtonComponent } from '../../components/LikeButton';
import { CommentsComponent } from '../../components/Comments';
import { NEXT_PUBLIC_BASE_URL } from '../index';

export interface IPropsType {
  postDetails: Video;
}

const DetailPage: NextPage<IPropsType> = ({ postDetails }) => {
  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const handleVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const handleAddComment = async (e: any) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(
        `${NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`,
        {
          userId: userProfile._id,
          comment,
        }
      );

      setPost({ ...post, comments: data.comments });
      setComment('');
      setIsPostingComment(false);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${NEXT_PUBLIC_BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
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

      <div className={'relative w-[1000px] md:w-[900px] lg:w-[700px]'}>
        <div className={'lg:mt-20 mt-10'}>
          <div
            className={'flex gap-3 p-2 cursor-pointer font-semibold rounded'}
          >
            <div className={'md:w-20 md:h-20 w-16 h-16 ml-4'}>
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
                <div className={'flex flex-col gap-2 mt-3'}>
                  <p
                    className={
                      'flex gap-2 items-center md:text-md font-bold text-primary'
                    }
                  >
                    {post.postedBy.userName}{' '}
                    <GoVerified className={'text-[#F51997]'} />
                  </p>
                  <p
                    className={'capitalize font-medium text-gray-500 md:block'}
                  >
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className={'px-10 text-lg text-gray-600'}>{post.caption}</p>
          <div className={'mt-10 px-10'}>
            {userProfile && (
              <LikeButtonComponent
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <CommentsComponent
            comment={comment}
            setComment={setComment}
            // @ts-ignore
            comments={post.comments}
            handleAddComment={handleAddComment}
            isPostingComment={isPostingComment}
          />
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
  const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default DetailPage;
