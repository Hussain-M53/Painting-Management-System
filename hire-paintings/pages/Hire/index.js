import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import NavBar from "../../Components/NavBar";
import Table from "../../Components/Table.js";

function fetch_hired_painting() {
  const [paintings_Rented, setPaintings_Rented] = useState([]);
  const titles = ["create","update","delete","filter"]

  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios({
        method: "get",
        url: "/Paintings-Rented",
      });
      setPaintings_Rented(res.data);
    };

    fetchAll();
  });

  return (
    <div>
      {" "}
      <NavBar titles={titles}/>
      <Table TableName={"PAINTINGS RENTED"} no_of_columns = {5} table_data = {paintings_Rented}/>
    </div>
  );
}

export default fetch_hired_painting;
