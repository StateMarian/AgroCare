import { useState } from "react";
import CategoriesTab from "../../components/plant-catalog/CategoriesTab"
import "./PlantCatalogPage.css"

type PlantCatalogTab = | "categories"
                       | "species"
                       | "varieties"
                       | "growth-stages";

function PlantCatalogPage(){
    const [activeTab, setActiveTab] = useState<PlantCatalogTab>("categories");

    return(

        <section className="plant-catalog-page">

            <div className="plant-catalog-header">
                <div>
                    <h1>Plant catalog</h1>

                    <p>
                        Manage plant categories, species,
                        varieties and growth stages.
                    </p>
                </div>
            </div>

            <div className="plant-catalog-tabs">

                <button
                    type = "button"
                    className={
                        activeTab === "categories" ? "catalog-tab active" : "catalog-tab"
                    }
                    onClick = {() => setActiveTab("categories")}
                    >
                        Categories
                </button>

                <button 
                    type = "button"
                    className={
                        activeTab === "species" ? "catalog-tab active" : " catalog-tab"
                    }
                    onClick={() => setActiveTab("species")}
                >
                    Species
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "varieties" ? "catalog-tab active" : "catalog-tab"
                    }
                    onClick={() => setActiveTab("varieties")}
                >
                    Varieties
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "growth-stages" ? "catalog-tab active" : "catalog-tab"
                    }
                    onClick={() => setActiveTab("growth-stages")}
                >
                    Growth stages
                </button>

            </div>

            <div className="plant-catalog-content">
                {
                    activeTab === "categories" && (
                        <CategoriesTab/>
                )}

                {
                    activeTab === "species" && (
                        <p>Species management will be added soon!</p>
                )}

                {
                    activeTab === "varieties" && (
                        <p>Varieties management will be added soon!</p>
                )}

                {
                    activeTab === "growth-stages" && (
                        <p>Growth stages management will be added soon!</p>
                )}

            </div>

        </section>


    );

}

export default PlantCatalogPage;