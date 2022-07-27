import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { DiscoverComponent } from './Doscover';
import { SuggestedAccountsComponent } from './SuggestedAccounts';
import { FooterComponent } from './Footer';

export const SidebarComponent: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const userProfile = false;

  const normalLink = `flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded`;
  return (
    <div>
      <div
        className={'block xl:hidden m-2 ml-4 mt-3 text-xl'}
        // best practice
        onClick={() => setShowSidebar((prevState) => !prevState)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div
          className={
            'xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'
          }
        >
          <div className={'xl:border-b-2 border-gary-200 xl:pb-4'}>
            <Link href={'/'}>
              <div className={normalLink}>
                <p className={'text-2xl'}>
                  <AiFillHome />
                </p>
                <span className={'text-xl hidden xl:block'}>For Yout</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className={'px-2 py-4 hidden xl:block'}>
              <p className={'text-gray-300'}>Login to follow videos</p>
              <div className={'pr-4'}>
                <GoogleLogin
                  clientId={''}
                  render={(renderProps) => (
                    <button
                      className={
                        'bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] px-6 py-3 font-semibold rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer'
                      }
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Login
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
          )}
          <DiscoverComponent />
          <SuggestedAccountsComponent />
          <FooterComponent />
        </div>
      )}
    </div>
  );
};
