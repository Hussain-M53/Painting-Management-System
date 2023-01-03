import axios from "../axios.js";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useRouter } from "next/router.js";
import FilterTable from "../../Components/FilterTable.js";

function customer_id() {
  const [paintings, setPaintings] = useState([]);
  const titles = ["add", "update", "delete"];
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAll = async () => {
      await axios
        .get(`/Painting/${id}`)
        .then((res) => {
          setPaintings(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    fetchAll();
  }, []);

  return (
    <div>
      {" "}
      <NavBar titles={titles} route={"/Painting"} />
      <FilterTable
        Path={"Painting"}
        TableName={"PAINTINGS"}
        table_data={paintings}
      />
    </div>
  );
}

export default customer_id;
