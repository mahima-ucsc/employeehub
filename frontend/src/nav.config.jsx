import { ImProfile, ImCalendar } from "react-icons/im";
import { MdPeople } from "react-icons/md";

const links = [
  {
    text: "profile",
    path: ".",
    icon: <ImProfile />,
  },
  {
    text: "employees",
    path: "employees",
    icon: <MdPeople />,
    isAdminOnly: true,
  },
  {
    text: "leaves",
    path: "leaves",
    icon: <ImCalendar />,
  },
];

export default links;
