import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/conf"
import { handleError } from "../userSlice"

export const registerThunk = async (_, thunkAPI) => {
    const { email, confirmEmail, password, confirmPassword } = thunkAPI.getState().user
    if (!email || !confirmEmail || !password || !confirmPassword) {
        thunkAPI.dispatch(
            handleError({
                msg: "please fill out all fields.",
                errElementIds: "all",
            })
        )
        return
    }
    if (email !== confirmEmail) {
        thunkAPI.dispatch(
            handleError({
                msg: "emails don't match",
                errElementIds: "emails",
            })
        )
        return
    }
    if (password !== confirmPassword) {
        thunkAPI.dispatch(
            handleError({
                msg: "passwords don't match",
                errElementIds: "passwords",
            })
        )
        return
    }
    createUserWithEmailAndPassword(auth, email, password).catch((err) => {
        console.log(err.code)
        switch (err.code) {
            case "auth/email-already-in-use":
                thunkAPI.dispatch(
                    handleError({
                        msg: "email is already in use.",
                        errElementIds: "email",
                    })
                )
                break
            case "auth/invalid-email":
                thunkAPI.dispatch(
                    handleError({
                        msg: "invalid email used.",
                        errElementIds: "email",
                    })
                )
                break
            case "auth/invalid-password":
                thunkAPI.dispatch(
                    handleError({
                        msg: "invalid password.",
                        errElementIds: "password",
                    })
                )
                break
            case "auth/weak-password":
                thunkAPI.dispatch(
                    handleError({
                        msg: "password must be at least 6 characters long.",
                        errElementIds: "password",
                    })
                )
                break
            case "auth/internal-error":
                thunkAPI.dispatch(
                    handleError({
                        msg: "internal server error. please try again later.",
                        errElementIds: "",
                    })
                )
                break
            default:
                thunkAPI.dispatch(
                    handleError({
                        msg: "there was an error.",
                        errElementIds: "",
                    })
                )
        }
    })
}
