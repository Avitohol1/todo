import { beginEditTodo, completeTodo, removeTodo } from "../slices/todoSlice"
import { useDispatch } from "react-redux"
import { HiCheck, HiTrash, HiOutlinePencilAlt } from "react-icons/hi"
import "../styles/Task.scss"
import { deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../firebase/conf"

const Task = ({todo}) => {
  const {id, name, description, isComplete} = todo
  const dispatch = useDispatch()

  const complete = (todo) => { 
    const completedTodo = {
      ...todo,
      isComplete: true
    }
    dispatch(completeTodo(completedTodo))
  }

  const deleteTodo = async (id) => {
    const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
    await deleteDoc(docRef)
  }


  return (
    <article className="task">
      <div className="info">
        <h2 className="title">{name}</h2>
        <p className="date">18 Apr, 2023</p>
        {description && <p className="description">{description}</p>}
      </div>
      <div className="task-actions">
        {!isComplete && <span className="complete" onClick={() => complete(todo)}>
          <HiCheck size={24} />
        </span>}
        {!isComplete && <span  className="edit" onClick={() => dispatch(beginEditTodo(todo))}>
          <HiOutlinePencilAlt size={24} />
        </span>}
        <span className="delete" onClick={() => deleteTodo(id)}>
          <HiTrash size={24} />
        </span>
      </div>
    </article>
  )
}

export default Task