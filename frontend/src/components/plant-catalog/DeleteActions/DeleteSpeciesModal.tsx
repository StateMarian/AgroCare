import "./DeleteModal.css";
import Modal from "../../common/Modal";
import type { PlantSpeciesResponse } from "../../../types/plantCatalog/PlantSpecies";

type DeleteSpeciesProps = {
  species: PlantSpeciesResponse;
  deleting: boolean;
  error: string;
  onClose: () => void;
  onConfirm: (idSpecies: number) => Promise<void>;
};

function DeleteSpeciesModal({
  species,
  deleting,
  error,
  onClose,
  onConfirm,
}: DeleteSpeciesProps) {
  async function handleDelete() {
    await onConfirm(species.idSpecies);
  }

  return(
    <Modal
        title="Delete species"
        onClose={onClose}
    >
        <div className="delete">
            <p>Are you sure you want to delete: <strong>{species.commonName}</strong></p>

            <p className="delete-warning"> 
                This action cannot be undone.
            </p>
            {error && (
                <p className="form-message error">
                    {error}
                </p>
            )}

            <div className="modal-actions">
                <button 
                    type="button"
                    className="modal-button cancel-button"
                    onClick={onClose}
                    disabled={deleting}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="modal-button delete-confirm-button"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>

        </div>
    </Modal>
  )
}

export default DeleteSpeciesModal;
