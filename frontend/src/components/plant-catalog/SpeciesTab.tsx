import { useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import "./SpeciesTab.css";
import type {
  PlantSpeciesRequest,
  PlantSpeciesResponse,
  PlantSpeciesErrors,
} from "../../types/plantCatalog/PlantSpecies";
import type { PlantCategoryResponse } from "../../types/plantCatalog/PlantCategory";
import { plantCategoryService } from "../../services/plantCatalogServices/plantCategoriesService";
import { plantSpeciesService } from "../../services/plantCatalogServices/plantSpeciesServices";
import { handleAxiosErrors } from "../../helpers/axiosError";
import Toast from "../common/Toast";
import EditSpeciesModal from "./EditActions/EditSpeciesModal";
import DeleteSpeciesModal from "./DeleteActions/DeleteSpeciesModal";

const initialForm: PlantSpeciesRequest = {
  commonName: "",
  scientificName: "",
  description: "",
  category: "",
};

const initialErrors: PlantSpeciesErrors = {
  commonName: "",
  scientificName: "",
  description: "",
  category: "",
};

function SpeciesTab() {

  //Form
  const [form, setForm] = useState<PlantSpeciesRequest>(initialForm);
  const [formErrors, setFormErrors] = useState<PlantSpeciesErrors>(initialErrors);

  //Data
  const [categories, setCategories] = useState<PlantCategoryResponse[]>([]);
  const [species, setSpecies] = useState<PlantSpeciesResponse[]>([]);

  //Modals
  const [editingSpecies, setEditingSpecies] =
    useState<PlantSpeciesResponse | null>(null);
  const [deleteSpecies, setDeleteSpecies] =
    useState<PlantSpeciesResponse | null>(null);

  //Errors
  const [createError, setCreateError] = useState("");
  const [loadSelectError, setLoadSelectError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [updateError, setUpdateError] = useState("");

  //Succes message
  const [deleteMessage, setDeleteMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  //Loading
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  

  const [loadError, setLoadError] = useState("");

  const loadSpecies = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const speciesList = await plantSpeciesService.getAllSpecies();

      setSpecies(speciesList);
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setLoadError,
        message: "Could not load the species!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecies();
  }, []);

  async function loadCategories() {
    try {
      setLoadSelectError("");
      const categoryList = await plantCategoryService.getAllCategories();

      setCategories(categoryList);
    } catch (err) {
      setLoadSelectError("Cannot load the categories!")
    }
  }

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

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  useEffect(() => {
    loadCategories();
  }, []);

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
      validationErrors.category = "Please select a category!";
    }

    setFormErrors(validationErrors);

    return (
      validationErrors.commonName === "" &&
      validationErrors.scientificName === "" &&
      validationErrors.description === "" &&
      validationErrors.category === ""
    );
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCreateError("");

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const createdSpecies = await plantSpeciesService.createSpecies(form);
      setSuccesMessage("");
      setSpecies((currentSpecies) => [createdSpecies, ...currentSpecies]);

      setForm(initialForm);
      setSuccesMessage("Species created succesfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setCreateError,
        message: "Could not create the species!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (
    idSpecies: number,
    species: PlantSpeciesRequest,
  ) => {
    try {
      setSubmitting(true);
      setUpdateMessage("");
      setUpdateError("");

      const updatedSpecies = await plantSpeciesService.updateSpecies(
        idSpecies,
        species,
      );

      setSpecies((currentSpecies) =>
        currentSpecies.map((species) =>
          species.idSpecies === updatedSpecies.idSpecies
            ? updatedSpecies
            : species,
        ),
      );

      setEditingSpecies(null);
      setUpdateMessage("Species updated successfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setUpdateError,
        message: "Could not update the species!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (idSpecies: number) => {
    try {
      setDeleting(false);
      setDeleteError("");
      setDeleteMessage("");

      await plantSpeciesService.deleteSpecies(idSpecies);

      setSpecies((currentSpecies) =>
        currentSpecies.filter((species) => species.idSpecies !== idSpecies),
      );

      setDeleteSpecies(null);
      setDeleteMessage("Species deleted successfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setDeleteError,
        message: "Could not delete the species!",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="species-tab">
      <section className="species-form-card">
        <h2>Add Species</h2>

        <form onSubmit={handleSubmit}>
          <div className="species-field">
            <label htmlFor="species-name">Species name</label>
            <input
              id="species-name"
              name="commonName"
              type="text"
              value={form.commonName}
              onChange={handleChange}
              placeholder="Apple"
            />

            {formErrors.commonName && (
              <p className="form-message error">{formErrors.commonName}</p>
            )}

            <label htmlFor="scientific-name">Scientific name</label>

            <input
              id="scientific-name"
              name="scientificName"
              type="text"
              value={form.scientificName}
              onChange={handleChange}
              placeholder="Malus domestica"
            />

            {formErrors.scientificName && (
              <p className="form-message error">{formErrors.scientificName}</p>
            )}

            <label htmlFor="species-description"></label>
            <textarea
              id="species-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description"
              rows={5}
            />

            {formErrors.description && (
              <p className="form-message error">{formErrors.description}</p>
            )}

            <label htmlFor="species-category">Category</label>
            <select
              id="species-category"
              name="category"
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
          </div>

          {formErrors.category && (
            <p className="form-message error">{formErrors.category}</p>
          )}

          {loadSelectError && (
            <p className="form-message error">{loadSelectError}</p>
          )}

          {createError && <p className="form-message error">{createError}</p>}

          {succesMessage && (
            <Toast
              message={succesMessage}
              onClose={() => setSuccesMessage("")}
            />
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Add species"}
          </button>
        </form>
      </section>

      <section className="species-list-card">
        <div className="list-header">
          <h2>Existing species</h2>

          <p>{species.length} species</p>
        </div>

        {updateMessage && (
          <Toast message={updateMessage} onClose={() => setUpdateMessage("")} />
        )}

        {deleteMessage && (
          <Toast message={deleteMessage} onClose={() => setDeleteMessage("")} />
        )}

        {loading && <p>Loading categories...</p>}

        {loadError && <p className="form-message error">{loadError}</p>}

        {!loading && species.length > 0 && (
          <div className="species-list">
            {species.map((species) => (
              <article key={species.idSpecies} className="species-item">
                <div className="species-details">
                  <h2>Species name: {species.commonName}</h2>

                  <p><strong>Scientific name: </strong> {species.commonName}</p>

                  <p>
                    <strong>Description: </strong>{species.description || "No description"}
                  </p>

                  <p>
                    <strong>Category:</strong> {species.category}
                  </p>
                </div>

                <div className="species-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateError("");
                      setEditingSpecies(species);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeleteError("");
                      setDeleteSpecies(species);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      {editingSpecies && (
        <EditSpeciesModal
          species={editingSpecies}
          submitting={submitting}
          error={updateError}
          onClose={() => {
            setUpdateError("");
            setEditingSpecies(null);
          }}
          onSave={handleUpdate}
        />
      )}

      {deleteSpecies && (
        <DeleteSpeciesModal
          species={deleteSpecies}
          deleting={deleting}
          error={deleteError}
          onClose={() => {
            setDeleteError("");
            setDeleteSpecies(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default SpeciesTab;
