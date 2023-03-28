import { Fragment } from "react"
import  ReactDOM  from "react-dom" 
import { useDispatch } from "react-redux"
import { close } from "../slices/todoSlice"
import "../styles/Modal.scss"

const Backdrop = ({children}) => {
    const dispatch = useDispatch()
    return <div className="backdrop" onClick={() => dispatch(close())}></div>
}

const ModalOverlay = ({children}) => {
    return <div className="task-modal">
        {children}
    </div>
}

const portalElement = document.getElementById("overlays")

const Modal = ({children}) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </Fragment>
}

export default Modal