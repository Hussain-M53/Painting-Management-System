import axios from "../axios.js";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useRouter } from "next/router.js";
import FilterTable from "../../Components/FilterTable.js";

function customer_id() {
  const [owners, setOwners] = useState([]);
  const titles = ["Return-Report", "add", "update", "delete"];
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAll = async () => {
      await axios
        .get(`/Owner/${id}`)
        .then((res) => {
          setOwners(res.data);
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
      <NavBar titles={titles} route={"/Owner"} />
      <FilterTable Path={"Owner"} TableName={"OWNERS"} table_data={owners} />
    </div>
  );
}

export default customer_id;
