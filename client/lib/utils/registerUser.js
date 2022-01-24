exports.register = async (formData) => {
  try {
    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

