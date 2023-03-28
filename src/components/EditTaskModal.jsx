import { doc, updateDoc } from "firebase/firestore"
import { useSelector, useDispatch } from "react-redux"
import { auth, db } from "../firebase/conf"
import { editTodo, endEditTodo, handleLoading } from "../slices/todoSlice"

const EditTaskModal = ({ id }) => {
    const {todos} = useSelector(store => store.todo)
    const todo = todos.find(todo => todo.id === id)
    const dispatch = useDispatch()
    
    const handleSubmit = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        dispatch(handleLoading(true))
        try {
            await updateDoc(docRef, {...todo, isEditing: false})
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
    <form onSubmit={(e) => e.preventDefault()}>
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
        <button className="btn" onClick={handleSubmit}>cancel</button>
        <button 
            className="btn" 
            onClick={handleSubmit}>edit
        </button>
    </form>
  )
}

export default EditTaskModal