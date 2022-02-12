import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../lib/context/AuthContext';
import apiService from '../lib/api/apiService';
import DiscoverList from '../domains/discover/DiscoverList';
import styles from '../styles/Discover.module.css';
import useFetch from '../lib/hooks/useFetch';

const discover = () => {
  const { user } = useContext(AuthContext);
  const [nativeSpeakers, setNativeSpeakers] = useState([]);

  useEffect(() => {
    (async () => {
      const native = await apiService.getNativeSpeakers();
      setNativeSpeakers(native);
    })();
  }, []);

  return (
    <div className={styles.listContainer}>
      {user && (
        <h1 className={styles.header}>
          People that know {user.learningLanguages}
        </h1>
      )}
      <DiscoverList users={nativeSpeakers} />
    </div>
  );
};

export default discover;
