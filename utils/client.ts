import sanityClient from '@sanity/client';

/**
 * @define create the sanity project configuration, and also add http://localhost:300 on CORS config
 */
export const client = sanityClient({
  projectId: 'gjfcdk89', // get it from sanity online page
  dataset: 'production',
  apiVersion: '2022-07-23',
  useCdn: false, // fetch new videos each time we reload the page
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // click to api/token to create one in sanity online page
});
