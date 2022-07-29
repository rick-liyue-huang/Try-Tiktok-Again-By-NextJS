import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { useAuthStore } from '../store/authStore';
import NoWorkResultComponent from './NoWorkResult';
import { IUser } from '../type';

interface ICommentProp {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}
interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  comments: ICommentProp[];
  handleAddComment: (e: FormEvent) => void;
  isPostingComment: boolean;
}

export const CommentsComponent: React.FC<IProps> = ({
  comment,
  setComment,
  isPostingComment,
  handleAddComment,
  comments,
}) => {
  // const comments = [];
  const { userProfile, allUsers } = useAuthStore();
  // const isPostingComment = false;

  return (
    <div
      className={
        'border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'
      }
    >
      <div className={'overflow-scroll lg:h-[475px]'}>
        {comments?.length ? (
          <div>
            {comments.map((comment, ids) => (
              <div key={ids}>
                {allUsers.map(
                  (user: IUser) =>
                    user._id ===
                      (comment.postedBy._id || comment.postedBy._ref) && (
                      <div className={'p-2 items-center'} key={user._id}>
                        <Link href={`/profile/${user._id}`}>
                          <div
                            className={'flex items-start gap-3 cursor-pointer'}
                          >
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
                        <div>
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoWorkResultComponent text={'no comments yet'} />
        )}
      </div>
      {userProfile && (
        <div className={'absolute bottom-0 left-0 pb-6 px-2 md:px-10'}>
          <form onSubmit={handleAddComment} className={'flex gap-4'}>
            <input
              className={
                'bg-primary px-6 py-4 text-md font-medium border-2 w-[256px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
              }
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={'add comments...'}
            />
            <button
              className={'text-md text-gray-400'}
              onClick={handleAddComment}
            >
              {isPostingComment ? 'comments' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
