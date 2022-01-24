exports.login = async (formData) => {
  try {
    const res = await fetch('http://localhost:3001/login', {
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
    console.log(e);
    return e;
  }
};