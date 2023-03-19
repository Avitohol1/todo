import { createSlice } from "@reduxjs/toolkit"
import { db } from "../firebase/conf"
import { nanoid } from "nanoid"

const initialState = {
    todos: [],
    completed: [],
    activeTab: "todo",
    isLoading: false
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                ...action.payload,
                id: nanoid(11)
            }
            console.log(todo)
            state.todos = [...state.todos, todo]
        },
        removeTodo: (state, action) => {
            const {id, isComplete} = action.payload
            if(isComplete) {
                state.completed = state.completed.filter(todo => todo.id !== id)
            }
            else {
                state.todos = state.todos.filter(todo => todo.id !== id)
            }
        },
        beginEditTodo: (state, action) => {
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload) {
                    return {
                        ...todo, 
                        isEditing: true
                    }
                }
                return {...todo}
            })
        },
        editTodo: (state, action) => {
            const {id, name, value} = action.payload
            state.todos.map(todo => {
                if(todo.id === id) {
                    todo[name] = value
                }
            })
        },
        endEditTodo: (state, action) => {
            state.todos.map(todo => {
                if(todo.id === action.payload) {
                    todo.isEditing = false
                }
            })
        },
        completeTodo: (state, action) => {
            const todo = action.payload
            const {id} = todo
            state.todos = state.todos.filter(todo => todo.id !== id)
            state.completed.push(action.payload)
        },
        changeTab: (state, action) => {
            const tab = action.payload
            state.activeTab = tab
        },
        clearAll: (state) => {
            state.todos = []
        }
    },
    extraReducers: (builder) => {
        
    }
})

export default todoSlice.reducer
export const {
    addTodo,
    removeTodo,
    beginEditTodo,
    editTodo,
    endEditTodo,
    completeTodo,
    changeTab,
    clearAll
} = todoSlice.actions