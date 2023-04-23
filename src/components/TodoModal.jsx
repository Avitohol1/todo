import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { uid } from "uid"
import { auth, db } from "../firebase/conf"
import { close, handleIsAdding } from "../slices/todoSlice"
import "../styles/TodoModal.scss"
import Modal from "./Modal"
import FormInput from "./FormInput"

const TodoModal = () => {
    const initialTodoState = {
        id: "",
        name: "",
        description: "",
        isEditing: false,
        isComplete: false,
        dueDate: new Date(),
    }

    const [todo, setTodo] = useState(initialTodoState)
    const dispatch = useDispatch()

    const addTodo = async () => {
        const id = uid()
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        await setDoc(docRef, { ...todo, id })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setTodo((todo) => {
            return {
                ...todo,
                [name]: value,
            }
        })
    }

    const handleSubmit = () => {
        addTodo()
        dispatch(handleIsAdding(false))
        setTodo(initialTodoState)
    }
    return (
        <Modal>
            <form className="todo-form" onSubmit={(e) => e.preventDefault()}>
                <FormInput
                    name="name"
                    labelText="name"
                    value={todo.name}
                    type="text"
                    handleInputChange={handleChange}
                />
                <FormInput
                    name="description"
                    labelText="description"
                    value={todo.description}
                    type="text"
                    handleInputChange={handleChange}
                />
                <div className="todoModal-btns">
                    <button onClick={() => dispatch(close())} className="btn">
                        cancel
                    </button>
                    <button
                        className="action-btn"
                        disabled={!todo.name}
                        onClick={handleSubmit}
                    >
                        add
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default TodoModal
