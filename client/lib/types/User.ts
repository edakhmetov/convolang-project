import Post from './Post';
import Follower from './Follower';

export default interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  followers: Follower[];
  followings: Follower[];
  learningLanguages: string;
  nativeLanguages: string;
  posts: Post[];
}
