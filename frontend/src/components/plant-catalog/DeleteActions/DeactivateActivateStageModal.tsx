import Modal from "../../common/Modal";
import type { PlantGrowthResponse } from "../../../types/plantCatalog/plantGrowth";

type StatusGrowthStageModalProps = {
    stage: PlantGrowthResponse,
    submitting: boolean,
    error: string,
    onClose: () => void
    onConfirm: (idStage: number, active: boolean) => Promise<void>;
}

function DeactivateActivateStageModal({
    stage,
    submitting,
    error, 
    onClose,
    onConfirm
}: StatusGrowthStageModalProps){
    
    const newStatus = !stage.active;

    async function handleConfirm(){
        await onConfirm(stage.idStage, newStatus);
    }

    return(
        <Modal title = {stage.active ? "Deactivate growth stage" : "Activate growth stage"}
            onClose={onClose}
        >
            <p>
                Are you sure you want to{" "} {stage.active ? "deactivate:" : " activate:"}
                {" "}<strong>{stage.name}</strong>
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
                    {submitting ? "Saving..." : stage.active ? "Deactivate" : "Activate"}
                </button>
            </div>
        </Modal>
    )
}

export default DeactivateActivateStageModal;