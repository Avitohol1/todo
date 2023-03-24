import Register from "../components/Register"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { auth } from "../firebase/conf"
import Login from "../components/Login"

const Welcome = () => {
  const navigate = useNavigate()
  const {isRegistering} = useSelector(store => store.user)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        navigate("/")
      }
    })
  }, [])

  return (
    <main>
      {isRegistering ? <Register /> : <Login />}
    </main>
  )
}

export default Welcome