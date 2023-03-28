import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uid } from "uid"
import { auth, db } from "../firebase/conf"
import { handleIsAdding } from "../slices/todoSlice"


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
    <form>
        <input 
            type="text"
            name="name"
            placeholder="task name"
            value={todo.name}
            onChange={handleChange}
        />
        <input 
            type="text"
            name="description"
            placeholder="description"
            value={todo.description}
            onChange={handleChange}
        />
        <button onClick={() => handleIsAdding()} className="btn">cancel</button>
        <button 
            className="btn" 
            disabled={!todo.name}
            onClick={handleSubmit}>add
        </button>
    </form>
  )
}

export default TaskModal