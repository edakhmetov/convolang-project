import User from '../../lib/types/User';
import styles from '../../styles/UserInfo.module.css';

type UserInfoProps = {
  user: User;
};

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.name} ${styles.child}`}>
        {user.firstName} {user.lastName}
      </h1>
      <h3 className={`${styles.name} ${styles.child}`}>
        Followers: {user.followers.length}
      </h3>
      <h3 className={`${styles.name} ${styles.child}`}>
        Followings: {user.followings.length}
      </h3>
      <h3 className={`${styles.name} ${styles.child}`}>
        Posts: {user.posts.length}
      </h3>
    </div>
  );
};

export default UserInfo;
