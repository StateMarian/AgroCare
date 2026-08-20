import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Modal from "../../common/Modal";
import type { PlantGrowthResponse, PlantGrowthRequest, PlantGrowthErrors } from "../../../types/plantCatalog/plantGrowth";
import "./EditModal.css";

type EditGrowthStageModalProps = {
  stage: PlantGrowthResponse;
  submitting: boolean;
  error: string;
  onClose: () => void;
  onSave: (idStage: number, request: PlantGrowthRequest) => Promise<void>;
};

function EditGrowthStageModal({
  stage,
  submitting,
  error,
  onClose,
  onSave,
}: EditGrowthStageModalProps) {
  const [form, setForm] = useState<PlantGrowthRequest>({
    name: stage.name,
    description: stage.description,
  });
  const [formErrors, setFormErrors] = useState<PlantGrowthErrors>({
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
    const validationErrors: PlantGrowthErrors = {
      name: "",
      description: "",
    };

    if (!form.name.trim()) {
      validationErrors.name = "Growth stage name is required!";
    } else if (form.name.trim().length > 50) {
      validationErrors.name =
        "Growth stage name must not exceed 50 characters!";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description of a growth stage is required!";
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

    await onSave(stage.idStage, form);
  }

  return (
    <Modal title="Edit growth stage" onClose={onClose}>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="edit-growtStage-name">Growth stage name</label>

          <input
            className="edit"
            id="edit-growtStage-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />

          {formErrors.name && <p className="form-message error">{formErrors.name}</p>}
        </div>
         

        <div className="form-field">
          <label htmlFor="edit-growtStage-description">Description</label>

          <textarea
            className="edit"
            id="edit-growtStage-description"
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
            disabled={submitting}
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

export default EditGrowthStageModal;
