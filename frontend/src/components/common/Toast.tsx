import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import "./Toast.css"

type ToastProps = {
    message: string;
    onClose: () => void;
    duration?: number;
}

function Toast ({message, onClose, duration = 3000}: ToastProps){
    useEffect(() =>{
        const timeoutId = window.setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            window.clearTimeout(timeoutId);
        }
    });

    return(
        <div
            className="toast toast-succes"
            role="status"
            aria-live="polite"
        >
            <CheckCircle
                className="toast-icon"
                aria-hidden="true"
            />

            <span>{message}</span>
        </div>
    );
}

export default Toast;