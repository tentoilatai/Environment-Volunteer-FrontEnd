import { Project } from "../ListProject";
const fakeData = [
  {
    Id: "1",
    UserId: "U001",
    Title: "Dự án Xây dựng",
    Logo: "../../../../Assets/Image/fake data/vecteezy_abstract-circle-logo-icon_12986755.png",
    Description: "Dự án xây dựng khu đô thị mới.",
    Address: "123 Đường ABC, TP. HCM",
    limitedNumber: 10,
    Status: "Đang thực hiện",
  },
  {
    Id: "2",
    UserId: "U002",
    Title: "Ứng dụng Quản lý",
    Logo: "../../../../Assets/Image/fake data/vecteezy_abstract-circle-logo-icon_12986755.png",
    Description: "Ứng dụng quản lý công việc nhóm.",
    Address: "456 Đường XYZ, Hà Nội",
    limitedNumber: 20,
    Status: "Hoàn thành",
  },
  {
    Id: "3",
    UserId: "U003",
    CampaignID:"CP023323",
    Title: "Dự án Nông nghiệp",
    Logo: "../../../../Assets/Image/fake data/vecteezy_logo-computer-science-education-and-software-training_30776792.png",
    Description: "Mô hình trồng trọt thông minh.",
    Duration:"4 week",
    StartDate:"",
    Address: "789 Đường LMN, Đà Nẵng",
    limitedNumber: 15,
    Status: "Đang thực hiện",
  },
];

const tableHeaders = [
  { label: "ID", value: "Id" },
  { label: "User ID", value: "UserId" },
  { label: "CampaignID", value: "CampaignID" },
  { label: "Title", value: "Title" },
  { label: "Description", value: "Description" },
  { label: "Duration", value: "Duration" },
  { label: "StartDate", value: "StartDate" },
  { label: "EndDate", value: "EndDate" },
  { label: "Address", value: "Address" },
  { label: "LimitedMember", value: "LimitedMember" },
  { label: "Status", value: "Status" },
];

export { fakeData, tableHeaders };
