import { beginEditTodo, completeTodo, removeTodo } from "../slices/todoSlice"
import { useDispatch } from "react-redux"
import { HiCheck, HiTrash, HiOutlinePencilAlt } from "react-icons/hi"
import { FaEdit } from "react-icons/fa"
import { ImCross } from 'react-icons/im'
import "../styles/Task.scss"

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

  console.log(todo)

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
        {!isComplete && <span  className="edit" onClick={() => dispatch(beginEditTodo(id))}>
          <HiOutlinePencilAlt size={24} />
        </span>}
        <span className="delete" onClick={() => dispatch(removeTodo({id, isComplete}))}>
          <HiTrash size={24} />
        </span>
      </div>
    </article>
  )
}

export default Task