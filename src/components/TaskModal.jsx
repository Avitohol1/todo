import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uid } from "uid"
import { auth, db } from "../firebase/conf"
import { close, handleIsAdding } from "../slices/todoSlice"
import "../styles/TaskModal.scss"
import Modal from "./Modal"

const TaskModal = () => {
    const initialTodoState = {
        id: "",
        name: "",
        description: "",
        isEditing: false,
        isComplete: false,
        dueDate: ""
    }

    const [todo, setTodo] = useState(initialTodoState)
    const {isAdding} = useSelector(store => store.todo)
    const dispatch = useDispatch()

    const addTodo = async () => {
        const id = uid()
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        await setDoc(docRef, {...todo, id})
    }

    if(!isAdding) {
      return <div>
      <button onClick={() => dispatch(handleIsAdding())}>+</button>
      <span>add task</span>
    </div>
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setTodo(todo => {
            return {
              ...todo,
              [name]: value
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
                <button onClick={() => dispatch(close())} className="btn">cancel</button>
                <button 
                    className="action-btn" 
                    disabled={!todo.name}
                    onClick={handleSubmit}>add
                </button>
            </div> 
        </form>
    </Modal>
  )
}

export default TaskModal