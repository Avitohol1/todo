import { beginEditTodo, handleLoading } from "../slices/todoSlice"
import { useDispatch } from "react-redux"
import { HiCheck, HiTrash, HiOutlinePencilAlt } from "react-icons/hi"
import "../styles/Todo.scss"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase/conf"

const Todo = ({ todo }) => {
    const { id, name, description, isComplete } = todo
    const dispatch = useDispatch()

    const complete = async (todo) => {
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        const completedTodo = { ...todo, isComplete: true }
        dispatch(handleLoading(true))
        try {
            await updateDoc(docRef, { ...completedTodo })
        } catch (err) {
            console.log(err)
            dispatch(handleLoading(false))
        }
        dispatch(handleLoading(false))
    }

    const deleteTodo = async (id) => {
        const docRef = doc(db, "users", auth.currentUser.uid, "todos", id)
        await deleteDoc(docRef)
    }

    return (
        <article className="todo">
            <div className="info">
                <h2 className="title">{name}</h2>
                <p className="date">18 Apr, 2023</p>
                {description && <p className="description">{description}</p>}
            </div>
            <div className="todo-actions">
                {!isComplete && (
                    <span className="complete" onClick={() => complete(todo)}>
                        <HiCheck size={24} />
                    </span>
                )}
                {!isComplete && (
                    <span className="edit" onClick={() => dispatch(beginEditTodo(todo))}>
                        <HiOutlinePencilAlt size={24} />
                    </span>
                )}
                <span className="delete" onClick={() => deleteTodo(id)}>
                    <HiTrash size={24} />
                </span>
            </div>
        </article>
    )
}

export default Todo
