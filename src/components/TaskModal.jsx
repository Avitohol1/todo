const TaskModal = ({todo, handleChange, handleSubmit, setIsAdding}) => {
    const {name, description} = todo
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <input 
            type="text"
            name="name"
            placeholder="task name"
            value={name}
            onChange={handleChange}
        />
        <input 
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={handleChange}
        />
        <button onClick={() => setIsAdding(false)} className="btn">cancel</button>
        <button 
            className="btn" 
            disabled={!name}
            onClick={() => handleSubmit(todo)}>add
        </button>
    </form>
  )
}

export default TaskModal