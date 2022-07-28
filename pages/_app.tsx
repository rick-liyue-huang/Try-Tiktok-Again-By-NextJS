import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { NavbarComponent } from '../components/Navbar';
import { SidebarComponent } from '../components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }: AppProps) {
  // confirm the ssr or not from root
  const [isSSR, setIsSSR] = useState<boolean>(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  // is ssr will return null
  if (isSSR) {
    return null;
  }

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      {/* can also use layout */}
      <div className={'xl:w-[1200px] m-auto overflow-hidden h-[100vh]'}>
        <NavbarComponent />
        <div className={'flex gap-6 md:gap-20'}>
          <div className={'h-[92vh] overflow-hidden xl:hover:overflow-auto'}>
            <SidebarComponent />
          </div>
          <div
            className={
              'mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'
            }
          >
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
