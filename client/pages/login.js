import signStyles from '../styles/Sign.module.css';

const login = () => {
  return (
    <div>
      <form>
        <input type="text" name="username"/>
        <input type="password" name="password"/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default login
