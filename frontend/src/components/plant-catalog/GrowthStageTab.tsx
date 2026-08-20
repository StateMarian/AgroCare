import type {
  PlantGrowthRequest,
  PlantGrowthResponse,
  PlantGrowthErrors,
} from "../../types/plantCatalog/plantGrowth";
import { plantGrowthService } from "../../services/plantCatalogServices/plantGrowthService";
import { useState, useEffect } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { handleAxiosErrors } from "../../helpers/axiosError";
import Toast from "../common/Toast";
import "./GrowthStageTab.css";
import EditGrowthStageModal from "./EditActions/EditGrowthStageModal";
import DeactivateActivateStageModal from "./DeleteActions/DeactivateActivateStageModal";

const initialForm: PlantGrowthRequest = {
  name: "",
  description: "",
};

const initialErrors: PlantGrowthErrors = {
  name: "",
  description: "",
};

function GrowthTab() {
  //Form
  const [form, setForm] = useState<PlantGrowthRequest>(initialForm);
  const [formErrors, setFormErrors] =
    useState<PlantGrowthErrors>(initialErrors);

  //Data
  const [growthStages, setGrowthStages] = useState<PlantGrowthResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [editingStage, setEditingStage] = useState<PlantGrowthResponse | null>(
    null,
  );
  const [activeStatus, setActiveStatus] = useState<PlantGrowthResponse | null>(
    null,
  );

  //Errors
  const [createError, setCreateError] = useState("");
  const [loadStagesErrors, setLoadStagesErrors] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateStatusError, setUpdateStatusError] = useState("")

  //SuccesMessages
  const [succesCreateMessage, setSuccesCreateMessage] = useState("");
  const [updateSucces, setUpdateSucces] = useState("");
  const [updateStatusSucces, setUpdateStatusSucces] = useState("")

  //Loading
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadStages = async () => {
    try {
      setLoadStagesErrors("");
      setLoading(true);

      const stages = await plantGrowthService.getAllStages();

      setGrowthStages(stages);
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setLoadStagesErrors,
        message: "Cannot load the growth stages!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStages();
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  function validateForm(): boolean {
    const validationErrors: PlantGrowthErrors = {
      name: "",
      description: "",
    };

    if (!form.name.trim()) {
      validationErrors.name = "Name of the stage is required";
    } else if (form.name.trim().length > 50) {
      validationErrors.name = "Name of the stage cannot exceed 50 characters!";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description of the stage is required!";
    } else if (form.description.trim().length > 200) {
      validationErrors.description =
        "Description cannot exceed 200 characters!";
    }

    setFormErrors(validationErrors);

    return validationErrors.name === "" && validationErrors.description === "";
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateError("");

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const createStage = await plantGrowthService.createStages(form);
      setSuccesCreateMessage("");

      setGrowthStages((currentStage) => [createStage, ...currentStage]);
      setForm(initialForm);
      setSuccesCreateMessage("The growth stage was created successfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setCreateError,
        message: "Cannot create a growth stage!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStage = async (
    idStage: number,
    request: PlantGrowthRequest,
  ) => {
    try {
      setSubmitting(true);
      setUpdateError("");
      setUpdateSucces("");

      const updatedGrowthStage = await plantGrowthService.updateStages(
        idStage,
        request,
      );

      setGrowthStages((currentStages) =>
        currentStages.map((stage) =>
          stage.idStage === updatedGrowthStage.idStage ? updatedGrowthStage : stage,
        ),
      );

      setEditingStage(null);
      setUpdateSucces("Growth stage updated successfully");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setUpdateError,
        message: "Could not update the growth stage!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirm = async (idStage: number, status: boolean) => {
      try {
        setSubmitting(true);
        setUpdateStatusError("");
        setUpdateStatusSucces("");
  
        const updatedStatus = await plantGrowthService.updateStatus(
          idStage,
          status,
        );
  
        setGrowthStages((currentStage) =>
          currentStage.map((stage) =>
            stage.idStage === updatedStatus.idStage
              ? updatedStatus
              : stage,
          ),
        );
  
        setActiveStatus(null);
  
        setUpdateStatusSucces(
          status
            ? "Growth stage activated successfully"
            : "Growth stage deactivated successfully",
        );
      } catch (requestError: unknown) {
        handleAxiosErrors({
          requestError,
          setError: setUpdateStatusError,
          message: "Could not update the growth stage status!",
        });
      } finally {
        setSubmitting(false);
      }
    };

  const filteredStages = growthStages.filter(
    (stage) => statusFilter === "" || String(stage.active) === statusFilter,
  );

  return (
    <div className="growth-tab">
      <section className="growth-form-card">
        <h2>Add growth stages</h2>
        <form onSubmit={handleSubmit}>
          <div className="stages-field">
            <label htmlFor="stages-name">Name</label>

            <input
              id="stages-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Blooming"
            />

            {formErrors.name && (
              <p className="form-message error">{formErrors.name}</p>
            )}

            <label htmlFor="stages-description">Description</label>

            <textarea
              id="stages-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description"
              rows={5}
            />

            {formErrors.description && (
              <p className="form-message error">{formErrors.description}</p>
            )}

            {createError && <p className="form-message error">{createError}</p>}

            {succesCreateMessage && (
              <Toast
                message={succesCreateMessage}
                onClose={() => setSuccesCreateMessage("")}
              />
            )}
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Add growth stage"}
          </button>
        </form>
      </section>

      <section className="growth-list-card">
        <div className="growth-list-header">
          <h2>Existing growth stages</h2>

          <p>{filteredStages.length} growth stages</p>
        </div>

        <div className="status-growth-field">
          <label className="filter-stages" htmlFor="filter-select">
            Status
          </label>

          <select
            id="filter-select"
            onChange={(event) => setStatusFilter(event.target.value)}
            value={statusFilter}
          >
            <option value={""}>All statuses</option>
            <option value={"true"}>Active</option>
            <option value={"false"}>Inactive</option>
          </select>
        </div>

        {updateSucces && (
            <Toast
                message={updateSucces}
                onClose={()=> setUpdateSucces("")}
            />
        )}

        {updateStatusSucces && (
            <Toast
                message={updateStatusSucces}
                onClose={()=> setUpdateStatusSucces("")}
            />
        )}

        {loading && <p>Loading growth stages...</p>}

        {loadStagesErrors && (
          <p className="form-message error">{loadStagesErrors}</p>
        )}

        {!loading && filteredStages.length > 0 && (
          <div className="growth-list">
            {filteredStages.map((stage) => (
              <article key={stage.idStage} className="stages-item">
                <div className="stages-details">
                  <h2>Growth stages name: {stage.name}</h2>

                  <p>
                    <strong className="status-desc">Status:</strong>{" "}
                    <span
                      className={
                        stage.active ? "status active" : "status inactive"
                      }
                    >
                      {stage.active ? "Active" : "Inactive"}
                    </span>
                  </p>

                  <p>
                    <strong>Description: </strong>
                    {stage.description}
                  </p>
                </div>

                <div className="stages-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateError("");
                      setEditingStage(stage);
                    }}
                  >
                    Edit
                  </button>

                  <button 
                    type="button"
                    onClick={()=>{
                        setUpdateStatusError("")
                        setActiveStatus(stage)
                    }}
                  >
                    {stage.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      {editingStage && (
        <EditGrowthStageModal 
            stage={editingStage} 
            submitting={submitting} 
            error={updateError}
            onClose={()=> {
                setUpdateError("");
                setEditingStage(null);
            }}
            onSave={handleUpdateStage}
        />
      )}

      {activeStatus && (
        <DeactivateActivateStageModal
            stage={activeStatus}
            submitting={submitting}
            error={updateStatusError}
            onClose={()=>{
                setUpdateStatusError("")
                setActiveStatus(null)
            }}
            onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default GrowthTab;
