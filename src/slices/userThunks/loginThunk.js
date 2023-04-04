import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/conf"
import { handleError } from "../userSlice"

export const loginThunk = (_, thunkAPI) => {
    const { email, password } = thunkAPI.getState().user
    if (!email || !password) {
        thunkAPI.dispatch(
            handleError({
                msg: "please fill out all fields.",
                errElementIds: "all",
            })
        )
    }
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
        console.log(err.code)
        switch (err.code) {
            case "auth/user-not-found":
                thunkAPI.dispatch(
                    handleError({
                        msg: "user was not found.",
                        errElementIds: "",
                    })
                )
                break
            case "auth/wrong-password":
                thunkAPI.dispatch(
                    handleError({
                        msg: "wrong password.",
                        errElementIds: "password",
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
