import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import apiService from '../../lib/api/apiService';
import PostList from '../../components/PostList';
import UserInfo from '../../components/UserInfo';

const userPage = () => {

  const router = useRouter();
  const { id } = router.query;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (id) {
      getUser();
    };
  }, [id]);

  if (userInfo) {
    userInfo.posts = userInfo.posts.map(p => {
      p.owner = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        id: userInfo.id
      }
      return p
    });
  }

  const getUser = async () => {
    const foundUser = await apiService.getUserInfo(id);
    if (foundUser) setUserInfo(foundUser);
  }

  return (
    <>
      {userInfo &&
        <div>
          <UserInfo user={userInfo} />
          <PostList passedPosts={userInfo.posts} />
        </div>
      }
    </>
  )
}

export default userPage
