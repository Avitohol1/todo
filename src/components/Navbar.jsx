import "../styles/Navbar.scss"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/conf"
import { signOut } from "firebase/auth"

const Navbar = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => navigate("/welcome"))
            .catch(err => console.log(err))
    }

  return (
    <nav className="nav">
        <a href="#" className="logo">LOGO</a>
        {auth.currentUser && <>
            <ul className="nav-actions">
            <li>
                <button className="action-btn">+ add task</button>
            </li>
            <li>
                <button className="btn">clear all</button>
            </li>
        </ul>
        <ul className="user-actions">
            <li>
                <a href="#" onClick={handleSignOut} className="nav-logout">logout</a>
            </li>
        </ul>
        </>}
        
    </nav>
  )
}

export default Navbar