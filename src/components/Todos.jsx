import { useSelector } from "react-redux"
import EditTodoModal from "./EditTodoModal"
import Todo from "./Todo"

const Todos = () => {
    const { todos, completed, activeTab, isEditing } = useSelector((store) => store.todo)
    console.log(activeTab)
    if (activeTab === "todo") {
        return (
            <div>
                {isEditing && <EditTodoModal />}
                {todos &&
                    todos.map((todo) => {
                        return <Todo key={todo.id} todo={todo} />
                    })}
            </div>
        )
    }
    if (activeTab === "completed") {
        return (
            <div>
                {completed &&
                    completed.map((todo) => {
                        return <Todo key={todo.id} todo={todo} />
                    })}
            </div>
        )
    }

    return <div></div>
}

export default Todos
