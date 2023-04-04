import { useSelector } from "react-redux"
import EditTodoModal from "./EditTodoModal"
import Todo from "./Todo"
import "../styles/Tabs.scss"

const Todos = () => {
    const { todos, completed, activeTab, isEditing } = useSelector((store) => store.todo)
    console.log(activeTab)
    if (activeTab === "todo") {
        if (todos.length !== 0) {
            return (
                <div>
                    {isEditing && <EditTodoModal />}
                    {todos &&
                        todos.map((todo) => {
                            return <Todo key={todo.id} todo={todo} />
                        })}
                </div>
            )
        } else {
            return <h1 style={{ margin: "3em auto" }}>No todos left!</h1>
        }
    }
    if (activeTab === "completed") {
        if (completed.length !== 0) {
            return (
                <div>
                    {completed &&
                        completed.map((todo) => {
                            return <Todo key={todo.id} todo={todo} />
                        })}
                </div>
            )
        } else {
            return <h1 style={{ margin: "3em auto" }}>empty</h1>
        }
    }

    return <div></div>
}

export default Todos
