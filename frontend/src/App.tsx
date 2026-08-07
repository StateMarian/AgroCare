import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPassword";
import DashBoardPage from "./pages/DashBoard/DashBoardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import DashBoardLayout from "./layouts/DashBoardLayout";
import UsersPage from "./pages/UsersPage/UsersPage";
import PlantCatalogPage from "./pages/PlantCatalog/PlantCatalogPage";


function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashBoardLayout />}>
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/catalog" element={<PlantCatalogPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
