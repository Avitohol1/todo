import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { register, handleIsRegistering, handleError } from "../slices/userSlice"
import "../styles/LoginForm.scss"
import FormInput from "./FormInput"

const Register = () => {
    const { email, confirmEmail, password, confirmPassword, formError } = useSelector(
        (store) => store.user
    )
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
        dispatch(register())
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form register-form">
                <FormInput name="email" labelText="email" value={email} type="email" />
                <FormInput
                    name="confirmEmail"
                    labelText="confirm email"
                    value={confirmEmail}
                    type="email"
                />
                <FormInput
                    name="password"
                    labelText="password"
                    value={password}
                    type="password"
                />
                <FormInput
                    name="confirmPassword"
                    labelText="confirm password"
                    value={confirmPassword}
                    type="password"
                />

                {formError.msg && <span className="form-error">{formError.msg}</span>}
                <button type="submit" className="action-btn">
                    register
                </button>
                <a onClick={() => dispatch(handleIsRegistering())} className="info">
                    already have an account?
                </a>
            </form>
        </div>
    )
}

export default Register
