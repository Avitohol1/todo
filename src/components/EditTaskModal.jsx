import { doc, updateDoc } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"
import { auth, db } from "../firebase/conf"
import { close, editTodo, endEditTodo, handleLoading } from "../slices/todoSlice"
import Modal from "./Modal"
import "../styles/TaskModal.scss"
import { useState } from "react"

const EditTaskModal = () => {
    const {editingTodo} = useSelector(store => store.todo)
    const {id} = editingTodo
    const [localTodo, setLocalTodo] = useState(editingTodo)
    const dispatch = useDispatch()
    
    const handleSubmit = async () => {
        if((localTodo.name === editingTodo.name) && (localTodo.description === editingTodo.description)) {
            dispatch(close())
            return
        }
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        dispatch(handleLoading(true))
        try {
            await updateDoc(docRef, {...localTodo})
            dispatch(editTodo(localTodo))
        }
        catch(err) {
            console.log(err)
            dispatch(handleLoading(false))
        }
        setLocalTodo({})
        dispatch(endEditTodo())
        dispatch(handleLoading(false))
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setLocalTodo(localTodo => {
            return {
                ...localTodo, 
                [name]: value
            }
        })
    }

  return (
    <Modal>
        <form className="task-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-control">
            <label htmlFor="name">name</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    value={localTodo.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-control">
            <label htmlFor="description">description</label>
                <input 
                    type="text"
                    name="description"
                    id="description"
                    value={localTodo.description}
                    onChange={handleChange}
                />
            </div>      

            <div className="taskModal-btns">
                <button className="btn" onClick={() => dispatch(close())}>cancel</button>
                <button 
                    className="action-btn" 
                    onClick={handleSubmit}>edit
                </button>
            </div>
        </form>
    </Modal>

  )
}

export default EditTaskModal