import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { auth, db } from "../firebase/conf"
import { handleLoading, setTodos } from "../slices/todoSlice"
import { collection, onSnapshot } from "firebase/firestore"
import Todos from "../components/Todos"
import Tab from "../components/Tab"
import TodoModal from "../components/TodoModal"

const Home = () => {
    const { isLoading, isAdding } = useSelector((store) => store.todo)
    const dispatch = useDispatch()

    const dbRef = collection(db, "users", auth.currentUser.uid, "todos")

    useEffect(() => {
        dispatch(handleLoading(true))
        onSnapshot(dbRef, (snapshot) => {
            const dbTodos = snapshot.docs.map((doc) => doc.data())
            dispatch(setTodos(dbTodos))
        })
        dispatch(handleLoading(false))
    }, [])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <main>
            {/* add */}
            {isAdding && <TodoModal />}
            {/* tabs */}
            <div>
                <Tab text="todo" />
                <Tab text="completed" />
            </div>
            <Todos />
        </main>
    )
}

export default Home
