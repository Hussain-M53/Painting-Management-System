import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import NavBar from "../../Components/NavBar";
import Table from "../../Components/Table.js";

function fetch_owner() {
  const [owners, setOwners] = useState([]);
  const titles = ["Return-Report","add","update","delete"]

  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios({
        method: "get",
        url: "/Owner",
      });
      setOwners(res.data);
    };

    fetchAll();
  });

  return (
    <div>
      <NavBar titles={titles} route = {"/Owner"}/>
      <Table TableName={"OWNERS"} table_data = {owners}/>
    </div>
  );
}

export default fetch_owner;
