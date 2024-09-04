import { ImProfile, ImCalendar } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  {
    text: "profile",
    path: ".",
    icon: <ImProfile />,
  },
  {
    text: "leaves",
    path: "leaves",
    icon: <ImCalendar />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
    isAdminOnly: true,
  },
];

export default links;
