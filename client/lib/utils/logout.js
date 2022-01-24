export default logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/logout`, {
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
};
