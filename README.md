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
