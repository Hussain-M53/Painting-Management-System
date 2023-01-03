import axios from "../axios.js";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useRouter } from "next/router.js";
import FilterTable from "../../Components/FilterTable.js";

function customer_id() {
  const [artists, setArtists] = useState([]);
  const titles = ["Artist-Report", "add", "update", "delete"];
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAll = async () => {
      await axios
        .get(`/Artist/${id}`)
        .then((res) => {
          setArtists(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    fetchAll();
  },[]);

  return (
    <div>
      {" "}
      <NavBar titles={titles} route={"/Artist"} />
      <FilterTable Path={"Artist"}TableName={"ARTISTS"} table_data={artists} />
    </div>
  );
}

export default customer_id;
