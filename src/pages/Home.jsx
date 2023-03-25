import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { db } from "../firebase/conf"
import { set, ref } from "firebase/database"
import { uid } from "uid"
import {
  addTodo,
  editTodo,
  endEditTodo,
  changeTab,
} from "../slices/todoSlice"
import TaskModal from '../components/TaskModal'
import Task from '../components/Task'

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
    
      useEffect(() => {
        console.log(completed)
      }, [completed])
    
      const edit = (e, id) => {
        const {name, value} = e.target
        dispatch(editTodo({id, name, value}))
      }
    
      const endEdit = (id) => {
        dispatch(endEditTodo(id))
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
        const uuid = uid()
        set(ref(db, `/${uuid}`), {
          todo,
          uuid
        })
        setTodo(initialTodoState)
      }
    
      const handleTabChange = (e) => {
        const tab = e.target.innerText.toLowerCase()
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
          return <Task key={id} todo={todo} />
        })}
      </div>
      }
    
      if(activeTab === "completed") {
        content = <div>
        {completed && completed.map(todo => {
          return <Task key={todo.id} todo={todo} />
        })}
      </div>
      }
    
      return (
        <main>
          {/* add */}
          {!isAdding && <div>
            <button onClick={() => setIsAdding(true)}>+</button>
            <span>add task</span>
          </div>}
    
          {isAdding && 
            <TaskModal 
              todo={todo} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit}
              setIsAdding={setIsAdding}
            />}
    
          {/* tabs */}
          <div>
            <button onClick={handleTabChange} className="btn">todo</button>
            <button onClick={handleTabChange} className="btn">completed</button>
          </div>
    
            {content}
        </main>
    
      )
}

export default Home