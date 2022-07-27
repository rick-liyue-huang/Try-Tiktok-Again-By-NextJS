import React from 'react';
import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 mt-5 ${mt && 'mt-5'}`}>
    {items.map((item) => (
      <p
        className={'text-gray-400 text-sm hover:underline cursor-pointer'}
        key={item}
      >
        {item}
      </p>
    ))}
  </div>
);

export const FooterComponent: React.FC = () => {
  return (
    <div className={'mt-6 hidden xl:block'}>
      {<List mt={false} items={footerList1} />}
      {<List mt={true} items={footerList2} />}
      {<List mt={true} items={footerList3} />}
      <p className={'text-gray-400 text-sm mt-5'}>&copy; 2022 TikTok</p>
    </div>
  );
};
