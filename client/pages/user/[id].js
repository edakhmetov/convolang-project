import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../lib/context/AuthContext';
import apiService from '../../lib/api/apiService';
import PostList from '../../domains/posts/PostList';
import UserInfo from '../../domains/user/UserInfo';
import styles from '../../styles/UserInfo.module.css';

const userPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      const isFollowed = () => {
        userInfo.followers.filter((u) => u.userId === user.id).length > 0 
        ? setIsFollowing(true) 
        : setIsFollowing(false);
  };
      isFollowed();
    }
  }, [userInfo]);

  if (userInfo) {
    userInfo.posts = userInfo.posts.map((p) => {
      p.owner = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        id: userInfo.id,
      };
      return p;
    });
  }

  const getUser = async () => {
    const foundUser = await apiService.getUserInfo(id);
    if (foundUser) setUserInfo(foundUser);
  };

  const follow = async (id) => {
    const data = await apiService.followUser(id);
    setIsFollowing(true);
    await getUser();
  };

  const unfollow = async (id) => {
    const data = await apiService.unfollowUser(id);
    setIsFollowing(false);
    await getUser();
  };

  return (
    <>
      {userInfo && (
        <div>
          <UserInfo user={userInfo} />
          {isFollowing ? (
            <div className={styles.buttonWrapper}>
              <button 
              className={styles.followButton} 
              onClick={() => unfollow(userInfo.id)}
              >
                Unfollow
                </button>
                </div>
            ) : ( 
            <div className={styles.buttonWrapper}>
              <button
               className={styles.followButton} 
               onClick={() => follow(userInfo.id)}
               >
                 Follow
               </button>
               </div>
            )}
          <PostList passedPosts={userInfo.posts} />
        </div>
      )}
    </>
  );
};

export default userPage;
