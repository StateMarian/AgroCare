import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./SidebarLayout.css";
import { Bug, ChartNoAxesCombined,ClipboardList, Flower2, LayoutDashboard,Leaf,Package, Sprout, Trees, Users, type LucideIcon } from "lucide-react";



type MenuItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

const commonLinks: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
];

const adminLinks: MenuItem[] = [
  {
    label: "Users",
    path: "/dashboard/users",
    icon: Users
  },

  {
    label: "Orchard overview",
    path: "/dashboard/orchard-overview",
    icon: Trees,
  },

  {
    label: "Plant catalog",
    path: "/dashboard/catalog",
    icon: Sprout,
  },

  {
    label: "Products",
    path: "/dashboard/products",
    icon: Package,
  },

  {
    label: "Problems",
    path: "/dashboard/problems",
    icon: Bug,
  },

  {
    label: "Treatment recommandations",
    path: "/dashboard/treatment-recommandations",
    icon: ClipboardList,
  },
];

const userLinks: MenuItem[] = [
  {
    label: "My orchards",
    path: "/dashboard/orchards",
    icon: Trees
  },

  {
    label: "Plots",
    path: "/dashboard/plots",
    icon: Sprout,
  },

  {
    label: "Treatments",
    path: "/dashboard/treatments",
    icon: ClipboardList,
  },

  {
    label: "Plant problems",
    path: "/dashboard/plant-problems",
    icon: Bug,
  },

  {
    label: "Reports",
    path: "/dashboard/reports",
    icon: ChartNoAxesCombined,
  },
];

function SidebarLayout() {
  const { user } = useAuth();

  let roleLinks: MenuItem[] = [];

  if (user?.role === "Admin") {
    roleLinks = adminLinks;
  }

  if (user?.role === "User") {
    roleLinks = userLinks;
  }

  const links = [...commonLinks, ...roleLinks];
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-brand">
        <div className="sidebar-brand-title">
          <Leaf className="sidebar-brand-icon" aria-hidden="true" />

          <span>AgroCare</span>
        </div>
      </NavLink>
      <span className="sidebar-brand-subtitle">
        Farm management
      </span>

       <nav className="sidebar-nav" aria-label="Main navigation">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <Icon
                className="sidebar-link-icon"
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default SidebarLayout;
