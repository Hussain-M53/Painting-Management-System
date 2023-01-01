import React from "react";
import NavBar from "../../Components/NavBar";
import Report_Table from "../../Components/Report_Table";

function Return_Report() {
    const titles = ["add", "update", "delete"];
  return (
    <div>
      <NavBar titles={titles} route={"/Owner"} />
      <Report_Table TableName={"Return-Report"} url={"Owner/returns/"}/>
    </div>
  );
}

export default Return_Report;
