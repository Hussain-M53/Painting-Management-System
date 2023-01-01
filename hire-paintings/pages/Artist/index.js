import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import NavBar from "../../Components/NavBar";
import Table from "../../Components/Table.js";

function fetch_artist() {
  const [artists, setArtists] = useState([]);
  const titles = ["Artist-Report","add","update","delete"]

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
      <NavBar titles={titles} route = {"/Artist"}/>
      <Table TableName={"ARTISTS"} table_data = {artists}/>
    </div>
  );
}

export default fetch_artist;
