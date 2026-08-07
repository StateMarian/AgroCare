import { Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import SidebarLayout from "./SidebarLayout";
import "./DashboardLayout.css"

function DashBoardLayout(){
    return(
        <div className="dashboard-layout">
            <SidebarLayout/>
            <div className="dashboard-main">
                <HeaderLayout/>
            
                <main className="dashboard-content">
                    <Outlet/>
                </main>
            </div>
        </div>

    );
}

export default DashBoardLayout;