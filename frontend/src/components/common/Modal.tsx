import type { ReactNode, MouseEvent } from "react"
import {X} from "lucide-react"
import "./Modal.css"
type ModalProps = {
    title: string,
    children: ReactNode,
    onClose: () => void;
}

function Modal({title, children, onClose}: ModalProps){
    function handleBackDropClick(event: MouseEvent<HTMLDivElement>){
        if(event.target === event.currentTarget){
            onClose();
        }
    }

    return(
        <div className="modal-backdrop" onClick={handleBackDropClick}>
            <div 
                className="modal-container"
                role="dialog"
                aria-modal = "true"
                aria-labelledby="modal-title"
            >
                <div className="modal-header">
                    <h2 id="modal-title">{title}</h2>

                    <button
                        type="button"
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        <X aria-hidden="true"/>
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;