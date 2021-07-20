import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import UserService from "../../../services/UserService";
const UserList = () => {
  const [users, setUsers] = useState();
  let tempUsers = [];
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    await UserService.getAllUsers()
      .then((res) => {
        //console.log(res.data.data);
        tempUsers = res.data.data.map((obj, index) => ({
          ...obj,
          ["id"]: index + 1,
        }));
        //console.log(tempUsers);
        setUsers(tempUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "mobile",
      headerName: "Mobile",
    },
  ];
  return (
    <>
      <h1>User List</h1>
      <DataGrid rows={users} columns={columns} />
    </>
  );
};

export default UserList;
