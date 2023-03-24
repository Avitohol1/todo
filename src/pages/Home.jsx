import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo,
  removeTodo,
  beginEditTodo,
  editTodo,
  endEditTodo,
  completeTodo,
  changeTab,
  clearAll,
} from "../slices/todoSlice"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/conf'
import { useNavigate } from 'react-router-dom'
import TaskModal from '../components/TaskModal'

const Home = () => {
    const initialTodoState = {
        id: "",
        name: "",
        description: "",
        isEditing: false,
        isComplete: false,
        dueDate: null
      }
    
      const {todos, completed, activeTab} = useSelector(store => store.todo)
      const dispatch = useDispatch()
      const [todo, setTodo] = useState(initialTodoState)
      const [isAdding , setIsAdding] = useState(false)
      const navigate = useNavigate()
    
      useEffect(() => {
        console.log(completed)
      }, [completed])

    
      const clear = () => {
        console.log(import.meta.env.VITE_FIREBASE_API_KEY)
        dispatch(clearAll())
      }
    
      const remove = ({id, isComplete}) => {
        dispatch(removeTodo({id, isComplete}))
      }
    
      const beginEdit = (id) => {
        dispatch(beginEditTodo(id))
      }
    
      const edit = (e, id) => {
        const {name, value} = e.target
        dispatch(editTodo({id, name, value}))
      }
    
      const endEdit = (id) => {
        dispatch(endEditTodo(id))
      }
    
      const complete = (todo) => {
        const completedTodo = {
          ...todo,
          isComplete: true
        }
        dispatch(completeTodo(completedTodo))
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
    
      const handleSubmit = (todo) => {
        dispatch(addTodo(todo))
        setTodo(initialTodoState)
      }
    
      const handleTabChange = (e) => {
        const tab = e.target.innerText
        dispatch(changeTab(tab))
      }

      const handleSignOut = () => {
        signOut(auth)
          .then(() => navigate("/welcome"))
          .catch(err => console.log(err))
      }
    
      let content = null
    
      if(activeTab === "todo") {
        content = <div>
        {todos && todos.map(todo => {
          const {id, name, description, isEditing, isComplete} = todo
          if(isEditing) {
            return <form key={id} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text"
              name="name"
              placeholder="task name"
              value={name}
              onChange={(e) => edit(e, id)}
            />
            <input 
              type="text"
              name="description"
              placeholder="description"
              value={description}
              onChange={(e) => edit(e, id)}
            />
            <button onClick={() => endEdit(id)}>cancel</button>
            <button 
              className="add-btn" 
              disabled={!todo.name}
              onClick={() => endEdit(id)}>edit
            </button>
          </form>
          }
          return <article key={id}>
            <h2>{name}</h2>
            {description && <span>{description}</span>}
            <button onClick={() => beginEdit(id)}>edit</button>
            <button onClick={() => complete(todo)}>complete</button>
            <button onClick={() => remove({id, isComplete})}>remove</button>
          </article>
        })}
      </div>
      }
    
      if(activeTab === "completed") {
        content = <div>
        {completed && completed.map(todo => {
          const {id, name, description, isComplete} = todo
          return <article key={id}>
            <h2>{name}</h2>
            {description && <span>{description}</span>}
            <button onClick={() => remove({id, isComplete})}>remove</button>
          </article>
        })}
      </div>
      }
    
      return (
        <main>
          {/* add */}
          {!isAdding && <div>
            <button onClick={() => setIsAdding(true)}>+</button>
            <span>add task</span>
            <button onClick={clear} className="btn">clear</button>
          </div>}
    
          {isAdding && 
            <TaskModal 
              todo={todo} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit}
            />}
    
          {/* tabs */}
          <div>
            <button onClick={handleTabChange} className="btn">todo</button>
            <button onClick={handleTabChange} className="btn">completed</button>
          </div>
    
            {content}
            <button onClick={handleSignOut} className="btn">sign out</button>
        </main>
    
      )
}

export default Home