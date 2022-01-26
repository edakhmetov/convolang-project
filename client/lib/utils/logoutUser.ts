export default async function logout() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ token: accessToken }),
    });
    await res.json();
  } catch (e) {
    console.error(e);
  }
}
