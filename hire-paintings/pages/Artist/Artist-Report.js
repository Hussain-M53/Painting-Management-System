import React from "react";
import NavBar from "../../Components/NavBar";
import Report_Table from "../../Components/Report_Table";

function Artist_Report() {
    const titles = ["add", "update", "delete"];
  
    return (
    <div>
      <NavBar titles={titles} route={"/Artist"} />
      <Report_Table TableName={"Artist-Report"} url={"Artist/paintings/get/"}/>
    </div>
  );
}

export default Artist_Report;
