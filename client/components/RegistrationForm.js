

const RegistrationForm = () => {
  return (
    <div>
      <form>
        <label htmlFor='firstName'>First Name</label>
        <input type='text' name='firstName'/>
        <label htmlFor='lastName'>Last Name</label>
        <input type='text' name='lastName'/>
        <label htmlFor='username'>username</label>
        <input type='text' name='username'/>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password'/>
        <label htmlFor='nativeLanguages'>Native Languages</label>
        <input type='text' name='nativeLanguages'/>
        <label htmlFor='learningLanguages'>Learning Languages</label>
        <input type='text' name='learningLanguages'/>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default RegistrationForm
