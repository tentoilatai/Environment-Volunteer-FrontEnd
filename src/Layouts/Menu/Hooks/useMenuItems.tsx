import PersonsIcon from "../../../Assets/Image/person.png";
import ListIcon from "../../../Assets/Image/project.svg";
import ManageDepart from "../../../Assets/Image/my project.svg";
import Arrow from "../../../Assets/Image/ArrowDown.svg";

interface subItems {
  title: string;
  path: string;
  role?: string;
  icon?: JSX.Element;
  
}

export interface MenuItem {
  title: string;
  icon: JSX.Element;
  subItems?: subItems[];
  role: string;
  path?: string;
  arrow: boolean;
}

// // Hàm tạo subItems dựa trên userRole
// const createSubItems = (userRole: string): subItems[] => {
//   return [
//     { title: "Quản lý dự án", path: "/list-account", role: "admin" },
//     {
//       title: "Phòng ban",
//       path: userRole === "admin" ? "/list-department" : "/list-department",
//       role: userRole === "admin" ? "admin" : "user",
//     },
//   ];
// };

export const useMenuItems = (): MenuItem[] => [
  {
    title: "Home",
    icon: <img src={ManageDepart} alt="Persons" />,
    path:"/Home",
    role:"user",
    arrow: false
  },
  {
    title: "Project Management",
    icon: <img src={PersonsIcon} alt="List" />,
    subItems: [
      { title: "My Project", path: "/my-project" },
      { title: "Project Participated", path: "/list-project" },  
    ],
    role: "User",
    arrow: true
  },
  {
    title: "Project result",
    icon: <img src={ListIcon} alt="Salary" />,
    path:"/ProjectResult",
    role:  "User",
    arrow: false
  },
  {
    title: "All project",
    icon: <img src={ListIcon} alt="Salary" />,
    path:"/ProjectResult",
    role:  "User",
    arrow: false
  },
  {
    title: "User Management",
    icon: <img src={PersonsIcon} alt="List" />,
    subItems: [
      { title: "List Account", path: "/list-project" },
    ],
    role: "Admin",
    arrow: true
  },
  {
    title: "Project Management",
    icon: <img src={PersonsIcon} alt="List" />,
    subItems: [
      { title: "List Project", path: "/list-project" },
      { title: "My Project", path: "/list-project" },  
    ],
    role: "Admin",
   arrow: true
  },
  {
    title: "Campaign Management",
    icon: <img src={ListIcon} alt="Salary" />,
    subItems: [{ title: "List Campaign", path: "/list" }],
    role:  "Admin",
    arrow: true
  },
  {
    title: "Statistics management",
    icon: <img src={ListIcon} alt="Salary" />,
    subItems: [{ title: "Statistics", path: "/list" }],
    role:  "Admin",
    arrow: true
  },
];

// Hàm lọc Options theo role
export const filterMenuItemsByRole = (
  menuItems: MenuItem[],
  userRole: string
): MenuItem[] => {
  // Nếu userRole không phải 'admin' hoặc 'user', gán mặc định là 'user'
  const normalizedRole = ["admin", "user"].includes(userRole.toLowerCase()) ? userRole.toLowerCase() : "user";
  return menuItems
    .filter((item) => item.role.toLowerCase() === normalizedRole) // Lọc mục cha
    .map((item) => ({
      ...item,
      subItems: item.subItems
        ? item.subItems.filter(
            (subItem) =>
              !subItem.role || subItem.role.toLowerCase() === userRole.toLowerCase()
          ) // Lọc subItems
        : undefined,
    }));
};
