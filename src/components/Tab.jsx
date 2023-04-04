import { useDispatch, useSelector } from "react-redux"
import { changeTab } from "../slices/todoSlice"

const Tab = ({ text }) => {
    const { activeTab } = useSelector((store) => store.todo)
    const dispatch = useDispatch()

    const handleTabChange = () => {
        const tab = text.toLowerCase()
        dispatch(changeTab(tab))
    }

    return (
        <>
            <button
                onClick={handleTabChange}
                className={`btn ${activeTab === text ? "active" : ""}`}
            >
                {text}
            </button>
        </>
    )
}

export default Tab
