import { useState, useEffect, useContext } from 'react';
import apiService from '../lib/api/apiService';
import { AuthContext } from "../lib/context/authContext"



const discover = () => {

  const { user } = useContext(AuthContext);
  const [nativeSpeakers, setNativeSpeakers] = useState([]);
  const [learningSpeakers, setLearningSpeakers] = useState([]);


  useEffect(() => {
    (async () => {
      const native = await apiService.getNativeSpeakers();
      const learning = await apiService.getLearningSpeakers();
      // console.log(data);
      setNativeSpeakers(native);
      setLearningSpeakers(learning);
    })()
  }, [])

  console.log(user);

  const isFollowed = (id) => {
    return user.followings.filter(u => u.followerId === id).length > 0 ? true : false;
  }

  const follow = async (id) => {
    const data = await apiService.followUser(id);
    console.log(data);
  }

  return (
    <div>
      {user && <h1>People that know {user.learningLanguages}</h1>}
      {user && nativeSpeakers.map(u => (
        <div key={u.id}>
          <h1>{u.firstName} {u.lastName}</h1>
          <button onClick={() => follow(u.id)}>{isFollowed(u.id) ? 'Unfollow' : 'Follow'}</button>
        </div>
      ))}
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
