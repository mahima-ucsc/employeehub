import { ImProfile, ImCalendar } from "react-icons/im";
import { MdCalendarToday, MdNotes, MdPeople } from "react-icons/md";

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
    isAdminOnly: true,
  },
  {
    text: "My leaves",
    path: "myleaves",
    icon: <MdCalendarToday />,
  },
  {
    text: "Notice Board",
    path: "notices",
    icon: <MdNotes />,
  },
];

export default links;
