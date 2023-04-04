import { useDispatch } from "react-redux"
import { changeTab } from "../slices/todoSlice"

const Tab = ({ text }) => {
    const dispatch = useDispatch()

    const handleTabChange = () => {
        const tab = text.toLowerCase()
        dispatch(changeTab(tab))
    }

    return (
        <>
            <button onClick={handleTabChange} className="btn">
                {text}
            </button>
        </>
    )
}

export default Tab
