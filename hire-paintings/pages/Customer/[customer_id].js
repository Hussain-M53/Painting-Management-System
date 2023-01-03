import axios from "../axios.js";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useRouter } from "next/router.js";
import FilterTable from "../../Components/FilterTable.js";

function customer_id() {
  const [customers, setCustomers] = useState([]);
  const titles = ["Customer-Rentals", "add", "update", "delete"];
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAll = async () => {
      await axios
        .get(`/Customer/${id}`)
        .then((res) => {
          setCustomers(res.data);
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
      <NavBar titles={titles} route={"/Customer"} />
      <FilterTable Path={"Customer"} TableName={"CUSTOMERS"} table_data={customers} />
    </div>
  );
}

export default customer_id;
