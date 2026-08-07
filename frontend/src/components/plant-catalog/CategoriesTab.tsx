import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { plantCategoryService } from "../../services/plantCatalogService";
import EditCategoryModal from "../../components/plant-catalog/EditActions/EditCategoryModal";
import "./CategoriesTab.css";
import Toast from "../../components/common/Toast";
import { handleAxiosErrors } from "../../helpers/axiosError";

import type {
  PlantCategoryRequest,
  PlantCategoryResponse,
  PlantCategoryErrors,
} from "../../types/PlantCategory";
import DeleteCategoryModal from "./DeleteActions/DeleteCategoryModal";

const initialForm: PlantCategoryRequest = {
  name: "",
  description: "",
};

const initialErrors: PlantCategoryErrors = {
  name: "",
  description: "",
};

function CategoriesTab() {
  const [form, setForm] = useState<PlantCategoryRequest>(initialForm);
  const [formErrors, setFormErrors] =
    useState<PlantCategoryErrors>(initialErrors);
  const [categories, setCategories] = useState<PlantCategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [createError, setCreateError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loadError, setLoadError] = useState("");

  const [createdSuccessMessage, setCreatedSuccessMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  
  const [editingCategory, setEditingCategory] =
    useState<PlantCategoryResponse | null>(null);
  const [deletingCategory, setDeletingCategory] =
    useState<PlantCategoryResponse | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const categoryList = await plantCategoryService.getAllCategories();

      setCategories(categoryList);
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setLoadError,
        message: "Could not load the categories!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setFormErrors((currrentErrors) => ({
      ...currrentErrors,
      [name]: "",
    }));
  };

  function validateForm(): boolean {
    const validationErrors: PlantCategoryErrors = {
      name: "",
      description: "",
    };

    if (!form.name.trim()) {
      validationErrors.name = "Category name is required";
    } else if (form.name.trim().length < 5) {
      validationErrors.name =
        "Category name must contain at least 5 characters!";
    } else if (form.name.trim().length > 50) {
      validationErrors.name =
        "Category name can't have more than 50 characters";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description of a category is required!";
    } else if (form.description.trim().length > 200) {
      validationErrors.description = "Description cannot exceed 200 characters";
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
      setCreatedSuccessMessage("");
      const createdCategory = await plantCategoryService.createCategory(form);

      setCategories((currentCategories) => [
        createdCategory,
        ...currentCategories,
      ]);
      setForm(initialForm);
      setCreatedSuccessMessage("Category created successfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setCreateError,
        message: "Could not create the category!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCategory = async (
    idCategory: number,
    request: PlantCategoryRequest,
  ) => {
    try {
      setSubmitting(true);
      setUpdateError("");
      setUpdateMessage("");

      const updatedCategory = await plantCategoryService.updateCategory(
        idCategory,
        request,
      );

      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.idCategory === updatedCategory.idCategory
            ? updatedCategory
            : category,
        ),
      );

      setEditingCategory(null);
      setUpdateMessage("Category updated successfully");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setUpdateError,
        message: "Could not update the category!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (idCategory: number) => {
    try {
      setDeleting(true);
      setDeleteError("");
      setDeleteMessage("");

      await plantCategoryService.deleteCategory(idCategory);

      setCategories((currentCategories) =>
        currentCategories.filter(
          (category) => category.idCategory !== idCategory,
        ),
      );

      setDeletingCategory(null);
      setDeleteMessage("Category deleted successfully!");
    } catch (requestError: unknown) {
      handleAxiosErrors({
        requestError,
        setError: setDeleteError,
        message: "Could not delete the category!",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="categories-tab">
      <section className="category-form-card">
        <h2>Add category</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="category-name">Category name</label>

            <input
              id="category-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Example: Fruit Trees"
            />
          </div>

          {formErrors.name && (
            <p className="form-message error">{formErrors.name}</p>
          )}
          <div className="form-field">
            <label htmlFor="category-description">Description</label>

            <textarea
              id="category-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description"
              rows={5}
            />
          </div>
          {formErrors.description && (
            <p className="form-message error">{formErrors.description}</p>
          )}

          {createError && <p className="form-message error">{createError}</p>}

          {createdSuccessMessage && (
            <Toast
              message={createdSuccessMessage}
              onClose={() => setCreatedSuccessMessage("")}
            />
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Add category"}
          </button>
        </form>
      </section>

      <section className="category-list-card">
        <div className="category-list-header">
          <div>
            <h2>Existing categories</h2>

            <p>{categories.length} categories</p>
          </div>
        </div>

        {updateMessage && (
          <Toast message={updateMessage} onClose={() => setUpdateMessage("")} />
        )}

        {deleteMessage && (
          <Toast message={deleteMessage} onClose={() => setDeleteMessage("")} />
        )}
        {loading && <p>Loading categories...</p>}

        {loadError && <p className="form-message error">{loadError}</p>}

        {!loading && categories.length === 0 && (
          <p>No categories have been added yet.</p>
        )}

        {!loading && categories.length > 0 && (
          <div className="category-list">
            {categories.map((category) => (
              <article key={category.idCategory} className="category-item">
                <div className="category-details">
                  <h3>{category.name}</h3>

                  <p>{category.description || "No description"}</p>
                </div>

                <div className="category-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateError("");
                      setEditingCategory(category);}}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeleteError("");
                      setDeletingCategory(category);}}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          submitting={submitting}
          error={updateError}
          onClose={() => {
            setUpdateError("");
            setEditingCategory(null);}}
          onSave={handleUpdateCategory}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryModal
          category={deletingCategory}
          deleting={deleting}
          error={deleteError}
          onClose={() => {
            setDeleteError("");
            setDeletingCategory(null)}}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default CategoriesTab;
