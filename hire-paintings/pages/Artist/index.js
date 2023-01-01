import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import NavBar from "../../Components/NavBar";
import Table from "../../Components/Table.js";

function fetch_artist() {
  const [artists, setArtists] = useState([]);
  const titles = ["create","update","delete","filter"]

  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios({
        method: "get",
        url: "/Artist",
      });
      setArtists(res.data);
    };

    fetchAll();
  });

  return (
    <div>
      <NavBar titles={titles}/>

      <Table TableName={"ARTISTS"} no_of_columns = {5} table_data = {artists}/>
    </div>
  );
}

export default fetch_artist;
