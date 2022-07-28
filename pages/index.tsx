import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../type';
import { VideoCardComponent } from '../components/VideoCard';
import NoWorkResultComponent from '../components/NoWorkResult';

export interface IIndexProps {
  videos: Video[];
}

const Home: NextPage<IIndexProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div className={'flex flex-col gap-10 videos h-full'}>
      {videos.length ? (
        videos.map((video) => (
          <VideoCardComponent post={video} key={video._id} />
        ))
      ) : (
        <NoWorkResultComponent text={'No Videos'} />
      )}
    </div>
  );
};

/**
 * @define I will fetch videos by request, so use 'getServerSideProps', and will connect with api/post as server
 */
export const getServerSideProps = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`
  );

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
