import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import Modal from "../../common/Modal";
import type {
  PlantSpeciesRequest,
  PlantSpeciesResponse,
  PlantSpeciesErrors,
} from "../../../types/PlantSpecies";
import "./EditModal.css";
import type { PlantCategoryResponse } from "../../../types/PlantCategory";
import { plantCategoryService } from "../../../services/plantCategoriesService";
import { handleAxiosErrors } from "../../../helpers/axiosError";

type EditSpeciesModalProps = {
  species: PlantSpeciesResponse;
  submitting: boolean;
  error: string;
  onClose: () => void;
  onSave: (idSpecies: number, request: PlantSpeciesRequest) => Promise<void>;
};

function EditSpeciesModal({
  species,
  submitting,
  error,
  onClose,
  onSave,
}: EditSpeciesModalProps) {

  const [form, setForm] = useState<PlantSpeciesRequest>({
    commonName: species.commonName,
    scientificName: species.scientificName,
    description: species.description,
    category: species.category,
  });

  const [formErrors, setFormErrors] = useState<PlantSpeciesErrors>({
    commonName: "",
    scientificName: "",
    description: "",
    category: "",
  });
  const[loadSelectError, setLoadSelectError] = useState("");
  const [categories, setCategories] = useState<PlantCategoryResponse[]>([]);

  async function loadCategories() {
    try {

      setLoadSelectError("");
      const categoryList = await plantCategoryService.getAllCategories();

      setCategories(categoryList);
    } catch (requestError:unknown) {
      handleAxiosErrors({
        requestError,
        setError: setLoadSelectError,
        message: "Could not load the species!",
      });
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    const validationErrors: PlantSpeciesErrors = {
      commonName: "",
      scientificName: "",
      description: "",
      category: "",
    };

    if (!form.commonName.trim()) {
      validationErrors.commonName = "Name of the species is required!";
    } else if (form.commonName.length > 50) {
      validationErrors.commonName =
        "Name of the species cannot exceed 50 characters!";
    }

    if (!form.scientificName.trim()) {
      validationErrors.scientificName = "Scientific name is required.";
    } else if (form.scientificName.length > 100) {
      validationErrors.scientificName =
        "Scientific name of the species cannot exceed 100 characters!";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description is required.";
    } else if (form.description.length > 200) {
      validationErrors.description =
        "Description cannot exceed 200 characters!";
    }

    if (!form.category.trim()) {
      validationErrors.category = "Select a category!";
    }

    setFormErrors(validationErrors);

    return (
      validationErrors.commonName === "" &&
      validationErrors.scientificName === "" &&
      validationErrors.description === "" &&
      validationErrors.category === ""
    );
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSave(species.idSpecies, form);
  }

  return (
    <Modal title="Edit species" onClose={onClose}>
      <form className="edit-category-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="edit-species-name">Species name</label>

          <input
            className="edit"
            id="edit-species-name"
            name="commonName"
            type="text"
            value={form.commonName}
            onChange={handleChange}
          />
        </div>
        {formErrors.commonName && (
          <p className="form-message error">{formErrors.commonName}</p>
        )}

        <div className="form-field">
          <label htmlFor="edit-scientific-name">Scientific name</label>

          <input
            className="edit"
            id="edit-scientific-name"
            name="scientificName"
            type="text"
            value={form.scientificName}
            onChange={handleChange}
          />
        </div>
        {formErrors.scientificName && (
          <p className="form-message error">{formErrors.scientificName}</p>
        )}

        <div className="form-field">
          <label htmlFor="edit-description">Description</label>

          <textarea
            className="edit"
            id="edit-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
          />
          {formErrors.description && (
            <p className="form-message error">{formErrors.description}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="edit-species-category">Category</label>

          <select
            id="edit-species-category"
            name="category"
            className="edit-select"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.idCategory} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {loadSelectError && (
            <p className="form-message error">{loadSelectError}</p>
          )}
          {formErrors.category && (
            <p className="form-message error">{formErrors.category}</p>
          )}
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

export default EditSpeciesModal;
