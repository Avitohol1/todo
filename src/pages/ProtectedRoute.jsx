import { Navigate } from "react-router-dom"
import { auth } from "../firebase/conf"

const ProtectedRoute = ({children}) => {
    if(!auth.currentUser) {
        return <Navigate to="/welcome" />
    }

    return children
}

export default ProtectedRoute