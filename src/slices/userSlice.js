import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { registerThunk } from "./userThunks/registerThunk"
import { loginThunk } from "./userThunks/loginThunk"

const initialState = {
    isLoading: false,
    isRegistering: true,
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    formError: {
        msg: "",
        errElementIds: "",
    },
}

export const register = createAsyncThunk("user/register", registerThunk)
export const login = createAsyncThunk("user/login", loginThunk)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleChange: (state, action) => {
            const { name, value } = action.payload
            return {
                ...state,
                formError: "",
                [name]: value,
            }
        },
        handleIsRegistering: (state) => {
            return {
                ...state,
                isRegistering: !state.isRegistering,
            }
        },
        handleError: (state, action) => {
            const { msg, errElementIds } = action.payload
            console.log(msg)
            return {
                ...state,
                formError: {
                    msg,
                    errElementIds,
                },
            }
        },
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
                console.log("rejected")
            })
    },
})

export default userSlice.reducer
export const { handleChange, handleIsRegistering, handleError } = userSlice.actions
