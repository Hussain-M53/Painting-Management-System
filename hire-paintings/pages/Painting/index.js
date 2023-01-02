import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import NavBar from "../../Components/NavBar";
import Table from "../../Components/Table.js";

function fetch_painting() {
  const [paintings, setPaintings] = useState([]);
  const titles = ["add","update","delete"]

  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios({
        method: "get",
        url: "/Painting",
      });
      setPaintings(res.data);
    };

    fetchAll();
  });

  return (
    <div>
      <NavBar titles={titles} route = {"/Painting"}/>
      <Table TableName={"PAINTINGS"} table_data = {paintings}/>
    </div>
  );
}

export default fetch_painting;
