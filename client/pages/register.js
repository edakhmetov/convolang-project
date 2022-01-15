import signStyle from '../styles/Sign.module.css';

const register = () => {
  return (
    <div>
      <form>
        <input type="text" name="firstName"/>
        <input type="text" name="lastName"/>
        <input type="text" name="username"/>
        <input type="text" name="password"/>
        <input type="text" name="nativeLanguages"/>
        <input type="text" name="learningLanguages"/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default register
