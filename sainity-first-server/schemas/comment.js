/**
 * @define create Comment Document in sanity similar as mongoDB
 */
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy', // ref to postedBy.js document
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
  ],
};
