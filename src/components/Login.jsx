import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    handleChange,
    handleIsRegistering,
    handleError,
    login
} from "../slices/userSlice"
import "../styles/LoginForm.scss"

const Login = () => {

    const {email, password, formError} = useSelector(store => store.user)
    const dispatch = useDispatch()

    const errClass = formError.errElementIds

    useEffect(() => {
      const errTimeout = setTimeout(() => {
        dispatch(handleError({
          msg: "",
          errElementIds: ""
        }))
      }, 5000)
      errTimeout
      return () => clearTimeout(errTimeout)
    }, [formError])

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
          <div className="form-control">
            <label htmlFor="loginEmail">email</label>
            <input 
              type="email"
              name="email"
              id="loginEmail"
              onChange={onChange}
              className={(errClass === "all" || errClass === "email" || errClass === "emails") ? "error" : ""}
              value={email}
            />
          </div>

          <div className="form-control">
            <label htmlFor="loginPassword">password</label>
            <input 
              type="password"
              name="password"
              id="loginPassword"
              onChange={onChange}
              className={(errClass === "all" || errClass === "password" || errClass === "passwords") ? "error" : ""}
              value={password}
            />
          </div>

        {formError.msg && <span className="form-error">{formError.msg}</span>}
        <button type="submit" className="action-btn">login</button>
        <a onClick={() => dispatch(handleIsRegistering())} className="info">don't have an account yet?</a>
      </form>
    </div>
  )
}

export default Login