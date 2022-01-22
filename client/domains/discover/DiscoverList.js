import apiService from '../../lib/api/apiService';
import Link from 'next/link';
import styles from '../../styles/Discover.module.css';

const DiscoverList = ({ user, users }) => {
  const isFollowed = (id) => {
    return user.followings.filter((u) => u.followerId === id).length > 0
      ? true
      : false;
  };

  const follow = async (id) => {
    const data = await apiService.followUser(id);
    // setFollowing(true);
    // console.log(data);
  };

  // console.log(users);

  const unfollow = async (id) => {
    const data = await apiService.unfollowUser(id);
    // setFollowing(false);
    // console.log(data);
  };

  return users.map((u) => (
    <Link key={u.id} href={`/user/${u.id}`}>
      <div className={styles.userContainer}>
        <div>
          <p className={styles.name}>{u.firstName}</p>
          <p className={styles.name}>{u.lastName}</p>
        </div>
        <div className={styles.language}>
          native language <p>{u.nativeLanguages}</p>
        </div>
        <hr className={styles.lineBreak} />
        <div className={styles.language}>
          learning language <p>{u.learningLanguages}</p>
        </div>
        {/* {isFollowed(u.id)
            ? <button onClick={() => unfollow(u.id)}>Unfollow</button>
            : <button onClick={() => follow(u.id)}>Follow</button>} */}
      </div>
    </Link>
  ));
};

export default DiscoverList;
