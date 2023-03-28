import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    completed: [],
    activeTab: "todo",
    isAdding: false,
    isEditing: false,
    isLoading: false,
    error: ""
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
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
            state.isEditing = true
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
            console.log(action.payload)
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
        handleIsAdding: (state, action) => {
            state.isAdding = !state.isAdding
        },
        close: (state, action) => {
            state.isAdding = false
            state.isEditing = false
        },
        handleLoading: (state, action) => {
            state.isLoading = action.payload
        },
        changeTab: (state, action) => {
            const tab = action.payload
            state.activeTab = tab
        },
        clearAll: (state) => {
            state.todos = []
        }
    }
})

export default todoSlice.reducer
export const {
    removeTodo,
    beginEditTodo,
    editTodo,
    endEditTodo,
    completeTodo,
    changeTab,
    clearAll,
    handleIsAdding,
    handleLoading,
    close,
    setTodos
} = todoSlice.actions