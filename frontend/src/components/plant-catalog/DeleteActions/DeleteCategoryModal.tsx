import Modal from "../../common/Modal";
import type { PlantCategoryResponse  } from "../../../types/PlantCategory";
import "./DeleteCategoryModal.css"

type DeleteCategoryModalProps = {
    category: PlantCategoryResponse;
    deleting: boolean;
    error: string;
    onClose: () => void;
    onConfirm: (idCategory:number) => Promise<void>;
};

function DeleteCategoryModal({
    category,
    deleting,
    error,
    onClose, 
    onConfirm,
}: DeleteCategoryModalProps){
    async function handleDelete() {
        await onConfirm(category.idCategory);
    }


    return(
        <Modal
            title="Delete category"
            onClose={onClose}
        >
            <div className="delete-category-content">
                <p>Are you sure you want to delete:
                <strong> {category.name}</strong>
                </p>

                <p className="delete-category-warning">
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
    );
}

export default DeleteCategoryModal;