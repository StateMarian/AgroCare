import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Modal from "../../common/Modal";
import type {
  PlantCategoryRequest,
  PlantCategoryResponse,
  PlantCategoryErrors,
} from "../../../types/plantCatalog/PlantCategory";
import "./EditModal.css";

type EditCategoryModalProps = {
  category: PlantCategoryResponse;
  submitting: boolean;
  error: string;
  onClose: () => void;
  onSave: (idCategory: number, request: PlantCategoryRequest) => Promise<void>;
};

function EditCategoryModal({
  category,
  submitting,
  error,
  onClose,
  onSave,
}: EditCategoryModalProps) {
  const [form, setForm] = useState<PlantCategoryRequest>({
    name: category.name,
    description: category.description,
  });
  const [formErrors, setFormErrors] = useState<PlantCategoryErrors>({
    name: "",
    description: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setFormErrors((currentFormErrors) => ({
      ...currentFormErrors,
      [name]: "",
    }));
  }

  function validateForm(): boolean {
    const validationErrors: PlantCategoryErrors = {
      name: "",
      description: "",
    };

    if (!form.name.trim()) {
      validationErrors.name = "Category name is required!";
    } else if (form.name.trim().length < 5) {
      validationErrors.name =
        "Category name must contain at least 5 characters!";
    } else if (form.name.trim().length > 50) {
      validationErrors.name =
        "Category name can't have more than 50 characters!";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description of a category is required!";
    } else if (form.description.trim().length > 200) {
      validationErrors.description =
        "Description cannot exceed 200 characters!";
    }

    setFormErrors(validationErrors);

    return validationErrors.name === "" && validationErrors.description === "";
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!validateForm()){
        return;
    }

    await onSave(category.idCategory, form);
  }

  return (
    <Modal title="Edit category" onClose={onClose}>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="edit-category-name">Category name</label>

          <input
            className="edit"
            id="edit-category-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />

          {formErrors.name && <p className="form-message error">{formErrors.name}</p>}
        </div>
         

        <div className="form-field">
          <label htmlFor="edit-category-description">Description</label>

          <textarea
            className="edit"
            id="edit-category-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
          />
          
          {formErrors.description && <p className="form-message error">{formErrors.description}</p>} 
        </div>
        {error && <p className="form-message error">{error}</p>}

        <div className="modal-actions">
          <button
            type="button"
            className="modal-button cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="modal-button save-button"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditCategoryModal;
