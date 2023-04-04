import { handleChange } from "../slices/userSlice"
import { useDispatch, useSelector } from "react-redux"

const FormInput = ({ name, labelText, value, type, handleInputChange }) => {
    const { formError } = useSelector((store) => store.user)
    const errClass = formError
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
                    errClass === "all" || errClass === name || errClass === `${name}s`
                        ? "error"
                        : ""
                }
                value={value}
            />
        </div>
    )
}

export default FormInput
