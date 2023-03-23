import { useDispatch, useSelector } from "react-redux"
import {
    handleChange,
    register,
    handleIsRegistering,
    handleError
} from "../slices/userSlice"
import "../styles/LoginForm.scss"


const Register = () => {
    const {
      email, 
      confirmEmail, 
      password, 
      confirmPassword, 
      formError
    } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const onChange = (e) => {
        const {name, value} = e.target
        dispatch(handleChange({name, value}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !confirmEmail || !password || !confirmPassword) {
          dispatch(handleError("please fill out all fields"))
          return
        }
        if((email !== confirmEmail)) {
          dispatch(handleError("emails don't match"))
          return
        }
        if((password !== confirmPassword)) {
          dispatch(handleError("passwords don't match"))
          return
        }
        dispatch(register())
    }

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit} className="form register-form">

          <div className="form-control">
            <label htmlFor="email">email</label>
            <input 
              type="email"
              name="email"
              id="email"
              onChange={onChange}
              value={email}
            />
          </div>

          <div className="form-control">
            <label htmlFor="confirmEmail">confirm email</label>
            <input 
              type="email"
              name="confirmEmail"
              id="confirmEmail"
              onChange={onChange}
              value={confirmEmail}
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">password</label>
            <input 
              type="password"
              name="password"
              id="password"
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="form-control">
            <label htmlFor="confirmPassword">confirm password</label>
            <input 
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={onChange}
              value={confirmPassword}
            />
          </div>

        {formError && <span className="form-error">{formError}</span>}
        <button type="submit" className="action-btn">register</button>
        <a onClick={() => dispatch(handleIsRegistering())} className="info">already have an account?</a>
      </form>
    </div>
  )
}

export default Register