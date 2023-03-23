import { useEffect } from "react"
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
        console.log(errClass)
        dispatch(register())
    }

    console.log(formError.errElementIds)

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
              className={(errClass === "all" || errClass === "email" || errClass === "emails") ? "error" : ""}
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
              className={(errClass === "all" || errClass === "email" || errClass === "emails") ? "error" : ""}
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
              className={(errClass === "all" || errClass === "password" || errClass === "passwords") ? "error" : ""}
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
              className={(errClass === "all" || errClass === "password" || errClass === "passwords") ? "error" : ""}
              value={confirmPassword}
            />
          </div>

        {formError.msg && <span className="form-error">{formError.msg}</span>}
        <button type="submit" className="action-btn">register</button>
        <a onClick={() => dispatch(handleIsRegistering())} className="info">already have an account?</a>
      </form>
    </div>
  )
}

export default Register