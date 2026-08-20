import { useEffect, useState } from "react";
import type {
  PlantVarietyErrors,
  PlantVarietyRequest,
  PlantVarietyResponse,
} from "../../../types/plantCatalog/PlantVariety";
import { plantSpeciesService } from "../../../services/plantCatalogServices/plantSpeciesServices";
import type { PlantSpeciesResponse } from "../../../types/plantCatalog/PlantSpecies";
import { handleAxiosErrors } from "../../../helpers/axiosError";
import type { ChangeEvent, SubmitEvent } from "react";
import Modal from "../../common/Modal";

type EditVarietyModal = {
  variety: PlantVarietyResponse;
  submitting: boolean;
  error: string;
  onClose: () => void;
  onSave: (idVariety: number, variety: PlantVarietyRequest) => Promise<void>;
};

function EditVarietyModal({
  variety,
  submitting,
  error,
  onClose,
  onSave,
}: EditVarietyModal) {
  const [form, setForm] = useState<PlantVarietyRequest>({
    name: variety.name,
    description: variety.description,
    species: variety.species,
  });

  const [formErrors, setFormErrors] = useState<PlantVarietyErrors>({
    name: "",
    description: "",
    species: "",
  });

  const [species, setSpecies] = useState<PlantSpeciesResponse[]>([]);
  const [loadSelectError, setLoadSelectError] = useState("");

  async function loadSpecies() {
    try {
      setLoadSelectError("");

      const speciesList = await plantSpeciesService.getAllSpecies();

      setSpecies(speciesList);
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setLoadSelectError,
        message: "Could not load the Species!",
      });
    }
  }

  useEffect(() => {
    loadSpecies();
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

    setFormErrors((currentError) => ({
      ...currentError,
      [name]: "",
    }));
  }

  function validateForm(): boolean {
    const validationErrors: PlantVarietyErrors = {
      name: "",
      description: "",
      species: "",
    };

    if (!form.name.trim()) {
      validationErrors.name = "Name of the variety is required!";
    } else if (form.name.length > 100) {
      validationErrors.name =
        "Name of the variety cannot exceed 200 characters!";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description of the variety is required!";
    } else if (form.name.length > 200) {
      validationErrors.description =
        "Description cannot exceed 200 characters!";
    }

    if (!form.species.trim()) {
      validationErrors.species = "Please select a species!";
    }

    setFormErrors(validationErrors);

    return (
      validationErrors.name === "" && validationErrors.description === "",
      validationErrors.species === ""
    );
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSave(variety.idVariety, form);
  }

  return (
    <Modal title="Edit varieties" onClose={onClose}>
      <form className="edit-category-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="id-name">Variety name</label>

          <input
            className="edit"
            id="id-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />

          {formErrors.name && (
            <p className="form-message error">{formErrors.name}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="id-description">Description</label>

          <textarea
            className="edit"
            id="id-description"
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
          <label htmlFor="id-species">Species</label>

          <select
            id="id-species"
            name="species"
            className="edit-select"
            value={form.species}
            onChange={handleChange}
          >
            <option value="">Select a species</option>

            {species.map((species) => (
              <option key={species.idSpecies} value={species.commonName}>
                {species.commonName}
              </option>
            ))}
          </select>
          {loadSelectError && (
            <p className="form-message error">{loadSelectError}</p>
          )}

          {formErrors.species && (
            <p className="form-message error">{formErrors.species}</p>
          )}
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

export default EditVarietyModal;
