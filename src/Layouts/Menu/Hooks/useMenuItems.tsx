import PersonsIcon from "../../../Assets/Image/person.png";
import ListIcon from "../../../Assets/Image/project.svg";
import ManageDepart from "../../../Assets/Image/my project.svg";

interface subItems {
  title: string;
  path: string;
  role?: string;
  icon?: JSX.Element;
}

export interface MenuItem {
  title: string;
  icon: JSX.Element;
  subItems: subItems[];
  role: string;
}

// Hàm tạo subItems dựa trên userRole
const createSubItems = (userRole: string): subItems[] => {
  return [
    { title: "Quản lý dự án", path: "/list-account", role: "admin" },
    {
      title: "Phòng ban",
      path: userRole === "admin" ? "/list-department" : "/list-department",
      role: userRole === "admin" ? "admin" : "user",
    },
  ];
};

export const useMenuItems = (userRole: string): MenuItem[] => [
  {
    title: "Dự án của tôi ",
    icon: <img src={ManageDepart} alt="Persons" />,
    subItems: createSubItems(userRole),
    role:  userRole === "admin" ? "admin" : "",
  },
  {
    title: "Dự án của tôi ",
    icon: <img src={ManageDepart} alt="Persons" />,
    subItems: createSubItems(userRole),
    role:  userRole === "admin" ? "admin" : "",
  },
  {
    title: "Quản lý dự án",
    icon: <img src={PersonsIcon} alt="List" />,
    subItems: [
      { title: "Danh sách dự án", path: "/list-project" },
      { title: "Dự án chờ duyệt", path: "/list-project" },
      { title: "Dự án đã tham gia", path: "/list-JoinedProject" },
      { title: "Dự án của tôi", path: "/list-Myproject" },
 
    ],
    role: userRole === "admin" ? "admin" : "",
  },
  {
    title: "Quản lý dự án",
    icon: <img src={ListIcon} alt="Salary" />,
    subItems: [{ title: "Danh sách bảng lương", path: "/list" }],
    role:  userRole === "admin" ? "admin" : "user",
  },
];

// Hàm lọc Options theo role
export const filterMenuItemsByRole = (       
  menuItems: MenuItem[],
  userRole: string,
): MenuItem[] => {
  return menuItems.reduce<MenuItem[]>((acc, item) => {
    // Kiểm tra role của mục cha
    if (userRole === "user" && item.role === "admin") {
      return acc; // Nếu là user và item là admin, bỏ qua mục này
    }

    // Lọc subItems
    const filteredSubItems =
      item.subItems?.filter((subItem) => {
        return userRole !== "user" || subItem.role !== "admin";
      }) || [];

    // Nếu mục cha có subItems đã lọc hoặc mục cha là không phải admin
    if (filteredSubItems.length > 0 || userRole !== "user") {
      acc.push({ ...item, subItems: filteredSubItems });
    }

    return acc;
  }, []);
};
