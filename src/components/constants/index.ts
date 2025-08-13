import { TableHeaders } from "../../../types";
export const  USER_LIST_HEADERS : TableHeaders[] = [
    // {
    //   name: "ID",
    //   key: "id",
    //   sort: false,
    //   visible: true,
    // },
    {
      name: "Id",
      key: "id",
      visible: true,
    },
    {
      name: "First Name",
      key: "firstName",
      visible: true,
    },
    {
      name: "Last Name",
      key: "lastName",
      visible: true
    },
    {
      name: "Email",
      key: "email",
      visible: true,
    },
{
    name: "Country Code",
    key: "countryCode",
    visible: true,
},
{
    name: "Phone Number",
    key: "phoneNumber",
    visible: true,
},
{
    name: "Status",
    key: "status",
    visible: true,
},
{
    name: "Client ID",
    key: "clientId",
    visible: false,
},
{
    name: "Total Count",
    key: "totalcount",
    visible: false,
}
  ];