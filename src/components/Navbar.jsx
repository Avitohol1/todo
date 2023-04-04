import "../styles/Navbar.scss"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { auth } from "../firebase/conf"
import { signOut } from "firebase/auth"
import { handleIsAdding } from "../slices/todoSlice"

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => navigate("/welcome"))
            .catch((err) => console.log(err))
    }

    return (
        <nav className="nav">
            <a href="#" className="logo">
                LOGO
            </a>
            {auth.currentUser && (
                <>
                    <ul className="nav-actions">
                        <li>
                            <button
                                className="action-btn"
                                onClick={() => dispatch(handleIsAdding())}
                            >
                                + add task
                            </button>
                        </li>
                    </ul>
                    <ul className="user-actions">
                        <li>
                            <a href="#" onClick={handleSignOut} className="nav-logout">
                                logout
                            </a>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    )
}

export default Navbar
