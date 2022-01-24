export default login = async () => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};
