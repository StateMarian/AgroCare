import type { PlantVarietyResponse } from "../../../types/plantCatalog/PlantVariety"
import Modal from "../../common/Modal";

type StatusVarietyModal = {
    variety: PlantVarietyResponse,
    submitting: boolean,
    error: string,
    onClose: () => void
    onConfirm: (idVariety: number, active: boolean) => Promise<void>;
}

function DeactivateActivateModal({
    variety,
    submitting,
    error, 
    onClose,
    onConfirm
}: StatusVarietyModal){
    
    const newStatus = !variety.active;

    async function handleConfirm(){
        await onConfirm(variety.idVariety, newStatus);
    }

    return(
        <Modal title = {variety.active ? "Deactivate variety" : "Activate variety"}
            onClose={onClose}
        >
            <p>
                Are you sure you want to{" "} {variety.active ? "deactivate:" : " activate:"}
                {" "}<strong>{variety.name}</strong>
            </p>

            {error && (
                <p className="form-message error">{error}</p>
            )}

            <div className="modal-actions">
                <button
                    type="button"
                    className="modal-button cancel-button"
                    onClick={onClose}
                    disabled={submitting}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="modal-button save-button"
                    onClick={handleConfirm}
                    disabled={submitting} 
                >
                    {submitting ? "Saving..." : variety.active ? "Deactivate" : "Activate"}
                </button>
            </div>
        </Modal>
    )
}

export default DeactivateActivateModal;