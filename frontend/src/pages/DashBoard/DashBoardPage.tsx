import { useAuth } from "../../context/AuthContext";
import "./DashBoard.css"

function DashBoardPage() {
  const { user } = useAuth();

  return (
    <section className="dashboard-page">
      <div className="dashboard-page-heading">
        <div>
          <p className="dashboard-eyebrow">Overview</p>
          <h1>Welcome, {user?.prenume}</h1>

          <p>Here is a quick overview of your AgroCare acvtivity</p>
        </div>
      </div>

      {user?.role === "User" && (
        <div className="dashboard-cards">

          <article className="dashboard-card">
            <span>Orchards</span>
            <strong>0</strong>
            <p>Your registered orchards</p>
          </article>

          <article className="dashboard-card">
            <span>Plots</span>
            <strong>0</strong>
            <p>Plots across your orchards</p>
          </article>

          <article className="dashboard-card">
            <span>Treatments</span>
            <strong>0</strong>
            <p>Recorded treatment applications</p>
          </article>

          <article className="dashboard-card">
           <span>Active problems</span>
           <strong>0</strong>
           <p>Problems requiring attention</p>
          </article>
        </div>
      )}

      {user?.role === "Admin" && (
         <div className="dashboard-cards">

          <article className="dashboard-card">
            <span>Users</span>
            <strong>0</strong>
            <p>Registered platform users</p>
          </article>

          <article className="dashboard-card">
            <span>Orchards</span>
            <strong>0</strong>
            <p>Orchards registered on the platform</p>
          </article>

          <article className="dashboard-card">
            <span>Products</span>
            <strong>0</strong>
            <p>Available treatment products</p>
          </article>

          <article className="dashboard-card">
            <span>Plant problems registered</span>
            <strong>0</strong>
            <p>Problems registered to the platform</p>
          </article>

         </div>
      )}

      <section className="dashboard-panel">
        <div>
          <h2>Recent activity</h2>
          <p>
            Recent acitvity will appear here after the main AgroCare modules are implemented
          </p>
        </div>
      </section>
    </section>
  );
}

export default DashBoardPage;
