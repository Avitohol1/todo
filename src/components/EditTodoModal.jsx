import { doc, updateDoc } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"
import { auth, db } from "../firebase/conf"
import { close, editTodo, endEditTodo, handleLoading } from "../slices/todoSlice"
import Modal from "./Modal"
import "../styles/TodoModal.scss"
import { useState } from "react"
import FormInput from "./FormInput"

const EditTodoModal = () => {
    const { editingTodo } = useSelector((store) => store.todo)
    const { id } = editingTodo
    const [localTodo, setLocalTodo] = useState(editingTodo)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (
            localTodo.name === editingTodo.name &&
            localTodo.description === editingTodo.description
        ) {
            dispatch(close())
            return
        }
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        dispatch(handleLoading(true))
        try {
            await updateDoc(docRef, { ...localTodo })
            dispatch(editTodo(localTodo))
        } catch (err) {
            console.log(err)
            dispatch(handleLoading(false))
        }
        setLocalTodo({})
        dispatch(endEditTodo())
        dispatch(handleLoading(false))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setLocalTodo((localTodo) => {
            return {
                ...localTodo,
                [name]: value,
            }
        })
    }

    return (
        <Modal>
            <form className="todo-form" onSubmit={handleSubmit}>
                <FormInput
                    name="name"
                    labelText="name"
                    value={localTodo.name}
                    type="text"
                    handleInputChange={handleChange}
                />
                <FormInput
                    name="description"
                    labelText="description"
                    value={localTodo.description}
                    type="text"
                    handleInputChange={handleChange}
                />

                <div className="todoModal-btns">
                    <button className="btn" onClick={() => dispatch(close())}>
                        cancel
                    </button>
                    <button type="submit" className="action-btn">
                        edit
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default EditTodoModal
