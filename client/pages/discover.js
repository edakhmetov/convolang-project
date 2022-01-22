import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../lib/context/authContext';
import apiService from '../lib/api/apiService';
import DiscoverList from '../components/DiscoverList';
import styles from '../styles/Discover.module.css';
import useNativeSpeakers from '../lib/hooks/useNativeSpeakers';


const discover = () => {

  const { user } = useContext(AuthContext);
  const [nativeSpeakers, setNativeSpeakers] = useState([]);
  // const [learningSpeakers, setLearningSpeakers] = useState([]);

  useEffect(() => {
    (async () => {
      const native = await apiService.getNativeSpeakers();
      // const learning = await apiService.getLearningSpeakers();
      // console.log(native);
      setNativeSpeakers(native);
      // setLearningSpeakers(learning);
    })()
  }, []);




  return (
    <div className={styles.listContainer}>
      {user && <h1 className={styles.header}>People that know {user.learningLanguages}</h1>}
      {user && <DiscoverList user={user} users={nativeSpeakers} />}
      {/* {user && <h1>People that know {user.nativeLanguages}</h1>}
      {user && learningSpeakers.map(u => (
        <div key={u.id}>
          <h1>{u.firstName} {u.lastName}</h1>
        </div>
      ))} */}
    </div>
  )
}

export default discover
