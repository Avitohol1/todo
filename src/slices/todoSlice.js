import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    completed: [],
    editingTodo: {},
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
            const data = action.payload
            const completedTodos = [...data.filter(todo => todo.isComplete)]
            const todos = [...data.filter(todo => !todo.isComplete)]
            state.completed = completedTodos
            state.todos = todos
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
            state.editingTodo = {
                ...action.payload
            }
        },
        editTodo: (state, action) => {
            const editedTodo = action.payload
            state.todos.map(todo => {
                if(todo.id === editedTodo.id) {
                    return {
                        ...editedTodo
                    }
                }
            })
            state.editingTodo = {}
            // const {id, name, value} = action.payload
            // state.todos.map(todo => {
            //     if(todo.id === id) {
            //         todo[name] = value
            //     }
            // })
        },
        endEditTodo: (state, action) => {
            state.isEditing = false
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
    changeTab,
    clearAll,
    handleIsAdding,
    handleLoading,
    close,
    setTodos
} = todoSlice.actions