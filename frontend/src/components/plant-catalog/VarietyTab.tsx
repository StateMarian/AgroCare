import type {
  PlantVarietyResponse,
  PlantVarietyRequest,
  PlantVarietyErrors,
} from "../../types/plantCatalog/PlantVariety";
import { plantVarietyService } from "../../services/plantCatalogServices/plantVarietyService";
import { useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { PlantSpeciesResponse } from "../../types/plantCatalog/PlantSpecies";
import { plantSpeciesService } from "../../services/plantCatalogServices/plantSpeciesServices";
import { handleAxiosErrors } from "../../helpers/axiosError";
import Toast from "../common/Toast";
import "./VarietiesTab.css";
import EditVarietyModal from "./EditActions/EditVarietyModal";
import DeactivateActivateModal from "./DeleteActions/DeactivateActivateModal";

const initialForm: PlantVarietyRequest = {
  name: "",
  description: "",
  species: "",
};

const initialErrors: PlantVarietyErrors = {
  name: "",
  description: "",
  species: "",
};

function VarietyTab() {
  //Form
  const [form, setForm] = useState<PlantVarietyRequest>(initialForm);
  const [formErrors, setFormErrors] =
    useState<PlantVarietyErrors>(initialErrors);

  //Data
  const [species, setSpecies] = useState<PlantSpeciesResponse[]>([]);
  const [varieties, setVarieties] = useState<PlantVarietyResponse[]>([]);
  const [filterVarietiesBySpecies, setFilterVarietiesBySpecies] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  //Modal
  const [editingVariety, setEditingVariety] =
    useState<PlantVarietyResponse | null>(null);
  const [statusVariety, setStatusVariety] =
    useState<PlantVarietyResponse | null>(null);

  //Errors
  const [loadSpecieError, setLoadSpeciesError] = useState("");
  const [loadVarietiesError, setLoadVarietiesError] = useState("");
  const [createError, setCreateError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateStatusError, setUpdateStatusError] = useState("");

  //Succes message
  const [updateSucces, setUpdateSucces] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  //Loading
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function loadSpecies() {
    try {
      setLoadSpeciesError("");

      const speciesList = await plantSpeciesService.getAllSpecies();

      setSpecies(speciesList);
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setLoadSpeciesError,
        message: "Cannot load the species!"
      })
    }
  }

  useEffect(() => {
    loadSpecies();
  }, []);

  const loadVarieties = async () => {
    try {
      setLoadVarietiesError("");
      setLoading(true);

      const varieties = await plantVarietyService.getAllVarieties();
      setVarieties(varieties);
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setLoadVarietiesError,
        message: "Cannot load the varieties!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVarieties();
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
    } else if (form.name.trim().length > 100) {
      validationErrors.name =
        "Name of the variety cannot exceed 100 characters!";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description of the variety is required!";
    } else if (form.description.trim().length > 200) {
      validationErrors.description =
        "Description cannot exceed 200 characters!";
    }

    if (!form.species.trim()) {
      validationErrors.species = "Please select a species!";
    }

    setFormErrors(validationErrors);

    return (
      validationErrors.name === "" &&
      validationErrors.description === "" &&
      validationErrors.species === ""
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
      const createVariety = await plantVarietyService.createVariety(form);
      setSuccesMessage("");
      setVarieties((currentVarieties) => [createVariety, ...currentVarieties]);

      setForm(initialForm);
      setSuccesMessage("Variety created succesfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setCreateError,
        message: "Cannot create an variety!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (
    idVariety: number,
    variety: PlantVarietyRequest,
  ) => {
    try {
      setSubmitting(true);
      setUpdateError("");
      setUpdateSucces("");

      const updatedVariety = await plantVarietyService.updateVariety(
        idVariety,
        variety,
      );

      setVarieties((currentVarieties) =>
        currentVarieties.map((variety) =>
          variety.idVariety === updatedVariety.idVariety
            ? updatedVariety
            : variety,
        ),
      );

      setEditingVariety(null);
      setUpdateSucces("Variety updated succesfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setUpdateError,
        message: "Could not update the variety!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirm = async (idVariety: number, status: boolean) => {
    try {
      setSubmitting(true);
      setUpdateStatusError("");
      setUpdateStatus("");

      const updatedStatus = await plantVarietyService.updateStatus(
        idVariety,
        status,
      );

      setVarieties((currentVarieties) =>
        currentVarieties.map((variety) =>
          variety.idVariety === updatedStatus.idVariety
            ? updatedStatus
            : variety,
        ),
      );

      setStatusVariety(null);

      setUpdateStatus(
        status
          ? "Variety activated successfully"
          : "Variety deactivated successfully",
      );
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setUpdateStatusError,
        message: "Could not update the variety status!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredVarieties = varieties.filter((variety) => {

      const matchedSpecies = filterVarietiesBySpecies === "" || variety.species === filterVarietiesBySpecies;

      const matchesStatuses = statusFilter === "" || String(variety.active) === statusFilter;

      return matchedSpecies && matchesStatuses;
      });

  return (
    <div className="variety-tab">
      <section className="variety-form-card">
        <h2>Add varieties</h2>

        <form onSubmit={handleSubmit}>
          <div className="varieties-field">
            <label htmlFor="variety-name">Variety name</label>

            <input
              id="variety-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Golden delicious"
            />

            {formErrors.name && (
              <p className="form-message error">{formErrors.name}</p>
            )}

            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short descritpion"
              rows={5}
            />

            {formErrors.description && (
              <p className="form-message error">{formErrors.description}</p>
            )}

            <label htmlFor="species-label">Species</label>

            <select
              id="species-label"
              name="species"
              onChange={handleChange}
              value={form.species}
            >
              <option value="">Select a species</option>
              {species.map((species) => (
                <option key={species.idSpecies} value={species.commonName}>
                  {species.commonName}
                </option>
              ))}
            </select>

            {formErrors.species && (
              <p className="form-message error">{formErrors.species}</p>
            )}

            {loadSpecieError && (
              <p className="form-message error">{loadSpecieError}</p>
            )}

            {createError && <p className="form-message error">{createError}</p>}

            {succesMessage && (
              <Toast
                message={succesMessage}
                onClose={() => setSuccesMessage("")}
              />
            )}
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Add variety"}
          </button>
        </form>
      </section>

      <section className="variety-list-card">
        <div className="variety-list-header">
          <h2>Existing varieties</h2>

          <p>{filteredVarieties.length} varieties</p>
          <div className="variety-filters">
            <div className="filter-field">
              <label htmlFor="species-filter">Filter by species</label>

              <select
                id="species-filter"
                onChange={(event) =>
                  setFilterVarietiesBySpecies(event.target.value)
                }
                value={filterVarietiesBySpecies}
              >
                <option value="">All species</option>
                {species.map((species) => (
                  <option key={species.idSpecies} value={species.commonName}>
                    {species.commonName}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="status-filter">Status</label>
              <select
                id="status-filter"
                onChange={(event) => 
                  setStatusFilter(event.target.value)
                }
                value={statusFilter}
              >
                <option value="">All statuses</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {updateStatus && (
          <Toast message={updateStatus} onClose={() => setUpdateStatus("")} />
        )}

        {updateSucces && (
          <Toast message={updateSucces} onClose={() => setUpdateSucces("")} />
        )}

        {loading && <p>Loading varieties...</p>}

        {loadVarietiesError && (
          <p className="form-message error">{loadVarietiesError}</p>
        )}

        {!loading && varieties.length > 0 && (
          <div className="varieties-list">
            {filteredVarieties.map((variety) => (
              <article key={variety.idVariety} className="varieties-item">
                <div className="varieties-details">
                  <h2>Variety name: {variety.name}</h2>

                  <p>
                    <strong className="status-desc">Status:</strong>{" "}
                    <span
                      className={
                        variety.active ? "status active" : "status inactive"
                      }
                    >
                      {variety.active ? "Active" : "Inactive"}
                    </span>
                  </p>

                  <p>
                    <strong>Description: </strong>
                    {variety.description}
                  </p>

                  <p>
                    <strong>Species: </strong>
                    {variety.species}
                  </p>
                </div>
                <div className="varieties-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateError("");
                      setEditingVariety(variety);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusVariety(variety)}
                  >
                    {variety.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      {editingVariety && (
        <EditVarietyModal
          variety={editingVariety}
          submitting={submitting}
          error={updateError}
          onClose={() => {
            setUpdateError("");
            setEditingVariety(null);
          }}
          onSave={handleUpdate}
        />
      )}

      {statusVariety && (
        <DeactivateActivateModal
          variety={statusVariety}
          submitting={submitting}
          error={updateStatusError}
          onClose={() => {
            setUpdateStatusError("");
            setStatusVariety(null);
          }}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default VarietyTab;
