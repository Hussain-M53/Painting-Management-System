import React from "react";
import NavBar from "../../Components/NavBar";
import Report_Table from "../../Components/Report_Table.js";

function Customer_Rentals() {
  const titles = ["add", "update", "delete"];

  return (
    <div>
      <NavBar titles={titles} route={"/Customer"} />
      <Report_Table TableName={"Customer-Rental"} url={"/Paintings-Rented/CustomerHirings/"}/>
    </div>
  );
}

export default Customer_Rentals;
