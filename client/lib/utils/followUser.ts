export default async function followUser(id: number) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`http://localhost:3001/follow/${id}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('error follow', e);
    return e;
  }
}
