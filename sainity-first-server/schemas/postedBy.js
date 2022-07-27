/**
 * @define create the reference document in sanity,
 */
export default {
  name: 'postedBy',
  title: 'Posted By',
  type: 'reference', // refer to user.js
  to: [{ type: 'user' }],
};
