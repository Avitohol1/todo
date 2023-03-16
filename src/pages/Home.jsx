import { useEffect, useState } from 'react'
import "../App.css"
import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo,
  removeTodo,
  beginEditTodo,
  editTodo,
  endEditTodo,
  completeTodo,
  changeTab,
  clearAll
} from "../slices/todoSlice"

const Home = () => {
    const initialTodoState = {
        id: "",
        name: "",
        description: "",
        isEditing: false,
        isComplete: false
      }
    
      const {todos, completed, activeTab} = useSelector(store => store.todo)
      const dispatch = useDispatch()
      const [todo, setTodo] = useState(initialTodoState)
      const [isAdding , setIsAdding] = useState(false)

      // ~~~~~~~~~~~~~~~~~~~~~~~~ AUTH


      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    
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
        <div>
          {/* add */}
          {!isAdding && <div>
            <button onClick={() => setIsAdding(true)}>+</button>
            <span>add task</span>
            <button onClick={clear}>clear</button>
          </div>}
    
          {isAdding && <form onSubmit={(e) => e.preventDefault()}>
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
            <button onClick={() => setIsAdding(false)}>cancel</button>
            <button 
              className="add-btn" 
              disabled={!todo.name}
              onClick={() => handleSubmit(todo)}>add
            </button>
          </form>}
    
          {/* tabs */}
          <div>
            <button onClick={handleTabChange}>todo</button>
            <button onClick={handleTabChange}>completed</button>
          </div>
    
            {content}
        </div>
    
      )
}

export default Home