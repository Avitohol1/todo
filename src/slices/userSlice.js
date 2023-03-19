import { createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase/conf"

const initialState = {
    isLoading: false,
    isRegistering: true,
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleChange: (state, action) => {
            const {name, value} = action.payload
            return {
                ...state,
                [name]: value
            }
        },
        register: (state, action) => {
            const {email, confirmEmail, password, confirmPassword} = state
            if(email && password) {
                if(email === confirmEmail && password === confirmPassword) {
                    createUserWithEmailAndPassword(auth, email, password)
                        .catch(err => console.log(err))
                }
            }
            console.log(email)
            console.log(password)
        },
        login: (state, action) => {
            const {email, password} = state
            if(email && password) {
                signInWithEmailAndPassword(auth, email, password)
                    .catch(err => console.log(err))
            }
        },
        handleIsRegistering: (state) => {
            return {
                ...state,
                isRegistering: !state.isRegistering
            }
        }
    }
})

export default userSlice.reducer
export const {
    handleChange,
    register,
    login,
    handleIsRegistering
} = userSlice.actions