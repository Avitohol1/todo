import { useDispatch, useSelector } from "react-redux"
import {
    handleChange,
    handleIsRegistering,
    login
} from "../slices/userSlice"
import "../styles/LoginForm.scss"

const Login = () => {

    const {email, password} = useSelector(store => store.user)
    const dispatch = useDispatch()

    const onChange = (e) => {
        const {name, value} = e.target
        dispatch(handleChange({name, value}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login())
    }

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit} className="form login-form">
        <input 
          type="email"
          name="email"
          placeholder="email"
          onChange={onChange}
          value={email}
        />

        <input 
          type="password"
          name="password"
          placeholder="password"
          onChange={onChange}
          value={password}
        />
        <button type="submit" className="action-btn">login</button>
        <button type="button" onClick={() => dispatch(handleIsRegistering())} className="btn">Register</button>
      </form>
    </div>
  )
}

export default Login