import links from "../../nav.config";
import { useAuth } from "../hooks";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "./dashboard-layout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar } = useDashboardContext();
  const { user } = useAuth();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon, isAdminOnly } = link;
        const { role } = user;
        if (isAdminOnly && role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
