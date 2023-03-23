import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase/conf"

const initialState = {
    isLoading: false,
    isRegistering: true,
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    formError: {
        msg: "",
        errElementIds: ""
    }
}

export const register = createAsyncThunk("user/register", (_, thunkAPI) => {
    const {email, confirmEmail, password, confirmPassword} = thunkAPI.getState().user
    if(!email || !confirmEmail || !password || !confirmPassword) {
        thunkAPI.dispatch(handleError({
            msg: "please fill out all fields.",
            errElementIds: "all"
        }))
        return
    }
    if((email !== confirmEmail)) {
        thunkAPI.dispatch(handleError({
            msg: "emails don't match",
            errElementIds: "emails"
        }))
        return
    }
    if((password !== confirmPassword)) {
        thunkAPI.dispatch(handleError({
            msg: "passwords don't match",
            errElementIds: "passwords"
        }))
        return
    }
    createUserWithEmailAndPassword(auth, email, password).catch(err => {
        console.log(err.code)
        switch(err.code) {
            case "auth/email-already-in-use":
                thunkAPI.dispatch(handleError({
                    msg: "email is already in use.",
                    errElementIds: "email"
                }))
                break
            case "auth/invalid-email":
                thunkAPI.dispatch(handleError({
                    msg: "invalid email used.",
                    errElementIds: "email"
                }))
                break
            case "auth/invalid-password":
                thunkAPI.dispatch(handleError({
                    msg: "invalid password.",
                    errElementIds: "password"
                }))
                break
            case "auth/weak-password":
                thunkAPI.dispatch(handleError({
                    msg: "password must be at least 6 characters long.",
                    errElementIds: "password"
                }))
                break
            case "auth/internal-error":
                thunkAPI.dispatch(handleError({
                    msg: "internal server error. please try again later.",
                    errElementIds: ""
                }))
                break
            default:
                thunkAPI.dispatch(handleError({
                    msg: "there was an error.",
                    errElementIds: ""
                }))
        }
    })
})

export const login = createAsyncThunk("user/login", (_, thunkAPI) => {
    const {email, password} = thunkAPI.getState().user
    if(!email || !password) {
        thunkAPI.dispatch(handleError({
            msg: "please fill out all fields.",
            errElementIds: "all"
        }))
    }
    signInWithEmailAndPassword(auth, email, password).catch(err => {
        console.log(err.code)
        switch(err.code) {
            case "auth/user-not-found":
                thunkAPI.dispatch(handleError({
                    msg: "user was not found.",
                    errElementIds: ""
                }))
                break
            case "auth/wrong-password":
                thunkAPI.dispatch(handleError({
                    msg: "wrong password.",
                    errElementIds: "password"
                }))
                break
            default:
                thunkAPI.dispatch(handleError({
                    msg: "there was an error.",
                    errElementIds: ""
                }))
        }
    })
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleChange: (state, action) => {
            const {name, value} = action.payload
            return {
                ...state,
                formError: "",
                [name]: value
            }
        },
        handleIsRegistering: (state) => {
            return {
                ...state,
                isRegistering: !state.isRegistering
            }
        },
        handleError: (state, action) => {
            const {msg, errElementIds} = action.payload
            console.log(msg)
            return {
                ...state,
                formError: {
                    msg,
                    errElementIds
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export default userSlice.reducer
export const {
    handleChange,
    handleIsRegistering,
    handleError
} = userSlice.actions