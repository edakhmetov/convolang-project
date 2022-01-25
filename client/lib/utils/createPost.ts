export default async function createPost(formData: { content: string }) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
