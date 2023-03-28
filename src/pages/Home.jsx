import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth, db } from "../firebase/conf"
import { onSnapshot} from 'firebase/firestore'
import {
  changeTab,
  handleLoading,
  setTodos,
} from "../slices/todoSlice"
import TaskModal from '../components/TaskModal'
import Task from '../components/Task'
import { collection } from 'firebase/firestore'
import EditTaskModal from '../components/EditTaskModal'

const Home = () => {
   
      const {todos, completed, activeTab, isLoading, isEditing} = useSelector(store => store.todo)
      const dispatch = useDispatch()

      const dbRef = collection(db, "users", auth.currentUser.uid, "todos")

      useEffect(() => {
        dispatch(handleLoading(true))
        onSnapshot(dbRef, (snapshot) => {
            const dbTodos = snapshot.docs.map(doc => doc.data())
            dispatch(setTodos(dbTodos))
        })
        dispatch(handleLoading(false))
      }, [])


      useEffect(() => {
        console.log(completed)
      }, [completed])
    
      const handleTabChange = (e) => {
        const tab = e.target.innerText.toLowerCase()
        dispatch(changeTab(tab))
      }
    
      let content = null

      if(isLoading) {
        return <h1>Loading...</h1>
      }
    
      if(activeTab === "todo") {
        content = <div>
        {todos && todos.map(todo => {
          const {id, name, description, isComplete} = todo
          if(isEditing) {
            return <EditTaskModal id={id}/>
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
          <TaskModal />
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