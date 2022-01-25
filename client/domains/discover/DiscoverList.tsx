import { useContext } from 'react';
import apiService from '../../lib/api/apiService';
import { AuthContext } from '../../lib/context/AuthContext';
import Link from 'next/link';
import styles from '../../styles/Discover.module.css';
import User from '../../lib/types/User';
import Follower from '../../lib/types/Follower';

type DiscoverProps = {
  users: User[];
};

const DiscoverList = ({ users }: DiscoverProps) => {
  const user: User = useContext(AuthContext).user;
  const isFollowed = (id: number) => {
    return user.followings.filter((u: Follower) => u.followerId === id).length >
      0
      ? true
      : false;
  };

  const follow = async (id: number) => {
    await apiService.followUser(id);
    // setFollowing(true);
  };

  const unfollow = async (id: number) => {
    await apiService.unfollowUser(id);
    // setFollowing(false);
  };

  if (!user) return null;

  return (
    <>
      {users.map((user) => (
        <Link key={user.id} href={`/user/${user.id}`}>
          <div className={styles.userContainer}>
            <div>
              <p className={styles.name}>{user.firstName}</p>
              <p className={styles.name}>{user.lastName}</p>
            </div>
            <div className={styles.language}>
              native language <p>{user.nativeLanguages}</p>
            </div>
            <hr className={styles.lineBreak} />
            <div className={styles.language}>
              learning language <p>{user.learningLanguages}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default DiscoverList;
