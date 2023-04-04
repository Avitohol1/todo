import { useSelector } from "react-redux"
import Task from "./Task"
import EditTaskModal from "./EditTaskModal"

const Todos = () => {
    const { todos, completed, activeTab, isEditing } = useSelector((store) => store.todo)
    console.log(activeTab)
    if (activeTab === "todo") {
        return (
            <div>
                {isEditing && <EditTaskModal />}
                {todos &&
                    todos.map((todo) => {
                        return <Task key={todo.id} todo={todo} />
                    })}
            </div>
        )
    }
    if (activeTab === "completed") {
        return (
            <div>
                {completed &&
                    completed.map((todo) => {
                        return <Task key={todo.id} todo={todo} />
                    })}
            </div>
        )
    }

    return <div></div>
}

export default Todos
