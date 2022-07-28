import axios from 'axios';
import jwt_decode from 'jwt-decode';

/**
 * @define create the user with the invalid email or get the user by email
 * will be used in 'onSuccess' property of GoogleLogin
 */
export const createOrGetUser = async (response: any) => {
  // console.log(response.credential); // this is jwt

  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  );
  // console.log(decoded);
  const { name, picture, sub } = decoded;

  // match with the User Document in Sanity
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  await axios.post(`http://localhost:3000/api/auth`, user);
};
