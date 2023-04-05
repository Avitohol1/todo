import { handleChange } from "../slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import "../styles/LoginForm.scss"

const FormInput = ({ name, labelText, value, type, handleInputChange }) => {
    const { formError } = useSelector((store) => store.user)
    const { errElementIds } = formError
    const dispatch = useDispatch()

    const onChange = (e) => {
        const { name, value } = e.target
        dispatch(handleChange({ name, value }))
    }

    return (
        <div className="form-control">
            <label htmlFor={name}>{labelText}</label>
            <input
                type={type}
                name={name}
                id={name}
                onChange={handleInputChange ? handleInputChange : onChange}
                className={
                    (errElementIds === "all" ||
                        errElementIds === name ||
                        errElementIds === `${name}s`) &&
                    !value
                        ? "error"
                        : ""
                }
                value={value}
            />
        </div>
    )
}

export default FormInput
