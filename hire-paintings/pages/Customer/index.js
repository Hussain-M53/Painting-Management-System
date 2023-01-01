import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import NavBar from "../../Components/NavBar";
import Table from "../../Components/Table.js";

function fetch_customer() {
  const [customers, setCustomers] = useState([]);
  const titles = ["Customer-Rentals","add","update","delete"]
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios({
        method: "get",
        url: "/Customer",
      });
      setCustomers(res.data);
    };

    fetchAll();
  },[]);

  return (
    <div>
      <NavBar titles={titles} route = {"/Customer"} />
      <Table TableName={"CUSTOMERS"} table_data = {customers}/>
    </div>
  );
}

export default fetch_customer;
