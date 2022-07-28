## Try Tiktok Again by NextJS

#### Initiate the project by NextJS

1. Config the project by Next.js, and add husky to pre-commit to GitHub.
2. Create the sanity back platform by running following `yarn add @sanity/cli` and
   `npx sanity init --coupon javascriptmastery2022`, to initiate the sanity project in platform, and create the directory of 'sanity-first-server'.
3. Inside the 'sanity-first-server', I created some schemas similar as 'mongoose' lib.
4. Run `sanity start` to create the sanity studio to preview the cms locally, we also can find the same project in sanity.io, here notice that postedBy is invalid because of its 'reference' type.
5. This project will use 'tailwindcss', so complete the configuration.

#### Start from frontend

1. Confirm the project use SSR or not by add 'isSSR' state in '\_app.tsx'.
2. Using 'react-google-login' library to deal with Google auth.
3. Using the tailwindcss to beautify the whole project.

You should use getServerSideProps only if you need to render a page whose data must be fetched at request time. This could be due to the nature of the data or properties of the request (such as authorization headers or geo location). Pages using getServerSideProps will be server side rendered at request time and only be cached if cache-control headers are configured.

#### Deal with Google OAuth

1. Install the new library for react google oauth api by `yarn add @react-oauth/google jwt-decode`, and then add `<GoogleOAuthProvider client="">` on '\_app.tsx'.
2. Create new project in cloud.Google, and the api key in 'Credentials' and 'Consent screen'.
3. Get the 'NEXT_PUBLIC_GOOGLE_CLIENT_ID' from the Credential after setting Consent screen content, and attach it on 'client' property.
4. Create method 'createOrGetUser' and get the jwt token from 'response.credential', which will be used in getting user info.
5. Inside 'createOrGetUser' method, I use jwt-decode to get decoded information.
6. Modify the decoded to user info matching with Sanity User document type.
7. Post method to sanity by clicking `http://localhost:3000/api/auth`.
8. create the post method in api/auth directory.
9. Keep the user login status by 'Zustand' application.

#### How to upload the video

1. Firstly, create document match with the document type in Sanity.
2. Secondly, create the '/api/post' backend server to upload the post to Sanity.
3. Thirdly, upload the video by the userProfile from 'useAuthStore'.
