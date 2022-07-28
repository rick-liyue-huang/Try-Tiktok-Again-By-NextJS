import React from 'react';
import { BiCommentX } from 'react-icons/bi';
import { MdOutlineVideocamOff } from 'react-icons/md';

export const NoWorkResultComponent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className={'flex flex-col justify-center items-center h-full w-full'}>
      <p className={'text-8xl'}>
        {text === 'no comments yet' ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className={'text-2xl text-center'}>{text}</p>
    </div>
  );
};

export default NoWorkResultComponent;
