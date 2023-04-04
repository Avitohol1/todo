import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleIsRegistering, handleError, login } from "../slices/userSlice"
import "../styles/LoginForm.scss"
import FormInput from "./FormInput"

const Login = () => {
    const { email, password, formError } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const errTimeout = setTimeout(() => {
            dispatch(
                handleError({
                    msg: "",
                    errElementIds: "",
                })
            )
        }, 5000)
        errTimeout
        return () => clearTimeout(errTimeout)
    }, [formError])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login())
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form login-form">
                <FormInput name="email" labelText="email" value={email} type="email" />
                <FormInput
                    name="password"
                    labelText="password"
                    value={password}
                    type="password"
                />
                {formError.msg && <span className="form-error">{formError.msg}</span>}
                <button type="submit" className="action-btn">
                    login
                </button>
                <a onClick={() => dispatch(handleIsRegistering())} className="info">
                    don't have an account yet?
                </a>
            </form>
        </div>
    )
}

export default Login
