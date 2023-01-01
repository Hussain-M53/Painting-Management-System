import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import NavBar from "../../Components/NavBar";
import Table from "../../Components/Table.js";

function fetch_painting() {
  const [paintings, setPaintings] = useState([]);
  const titles = ["create","update","delete","filter"]

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
      <NavBar titles={titles} />
      <Table TableName={"PAINTINGS"} no_of_columns = {9} table_data = {paintings}/>
    </div>
  );
}

export default fetch_painting;
