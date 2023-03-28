import { doc, updateDoc } from "firebase/firestore"
import { useSelector, useDispatch } from "react-redux"
import { auth, db } from "../firebase/conf"
import { editTodo, endEditTodo, handleLoading } from "../slices/todoSlice"
import Modal from "./Modal"
import "../styles/TaskModal.scss"

const EditTaskModal = ({ id }) => {
    const {todos} = useSelector(store => store.todo)
    const todo = todos.find(todo => todo.id === id)
    const dispatch = useDispatch()
    
    const handleSubmit = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        dispatch(handleLoading(true))
        try {
            await updateDoc(docRef, {...todo})
            dispatch(endEditTodo(id))
        }
        catch(err) {
            console.log(err)
            dispatch(handleLoading(false))
        }
        dispatch(handleLoading(false))
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        dispatch(editTodo({id, name, value}))
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
                    value={todo.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-control">
            <label htmlFor="description">description</label>
                <input 
                    type="text"
                    name="description"
                    id="description"
                    value={todo.description}
                    onChange={handleChange}
                />
            </div>      

            <div className="taskModal-btns">
                <button className="btn" onClick={handleSubmit}>cancel</button>
                <button 
                    className="btn" 
                    onClick={handleSubmit}>edit
                </button>
            </div>
        </form>
    </Modal>

  )
}

export default EditTaskModal